package com.aemodular.tbd;

import java.io.IOException;
import java.lang.InterruptedException;
import java.lang.Thread;
import java.util.Arrays;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.atomic.AtomicBoolean;

import android.os.Handler;
import android.os.HandlerThread;
import android.os.IBinder;
import android.os.Looper;
import android.os.Message;
import android.os.Process;
import android.os.Build;

import android.app.Service;
import android.app.PendingIntent;

import android.content.Intent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.IntentFilter;

import android.hardware.usb.UsbDevice;
import android.hardware.usb.UsbDeviceConnection;
import android.hardware.usb.UsbManager;

import android.util.Log;

import com.hoho.android.usbserial.driver.UsbSerialDriver;
import com.hoho.android.usbserial.driver.UsbSerialPort;
import com.hoho.android.usbserial.driver.UsbSerialProber;
import com.hoho.android.usbserial.util.SerialInputOutputManager;

public class SerialConnectionService extends Service {

  private static final String ACTION_USB_ATTACHED = "android.hardware.usb.action.USB_DEVICE_ATTACHED";
  private static final String ACTION_USB_DETACHED = "android.hardware.usb.action.USB_DEVICE_DETACHED";

  private static final String ACTION_USB_PERMISSION = "com.aemodular.tbd.USB_PERMISSION";
  private static final String ACTION_USB_PERMISSION_GRANTED = "com.aemodular.tbd.USB_PERMISSION_GRANTED";
  private static final String ACTION_USB_PERMISSION_DENIED = "com.aemodular.tbd.USB_PERMISSION_DENIED";
  private static final String ACTION_USB_CONNECTED = "com.aemodular.tbd.USB_CONNECTED";
  private static final String ACTION_USB_DISCONNECTED = "com.aemodular.tbd.USB_DISCONNECTED";

  private static final String ACTION_SERIAL_WRITE = "com.aemodular.tbd.SERIAL_WRITE";
  private static final String ACTION_SERIAL_READ_RECEIVED = "com.aemodular.tbd.SERIAL_READ_RECEIVED";

  private static final String EXTRA_SERIAL_WRITE_DATA = "com.aemodular.tbd.SERIAL_WRITE_DATA";
  private static final String EXTRA_SERIAL_READ_DATA = "com.aemodular.tbd.SERIAL_READ_DATA";

  private static final int SUPPORTED_VENDOR_ID = 0x1a86;
  private static final int SUPPORTED_PRODUCT_ID = 0x7523;

  private static final int STX = 0x2;
  private static final int ETX = 0x3;

  private static final int WRITE_WAIT_MILLIS = 2000;
  private static final int READ_WAIT_MILLIS = 2000;

  private Context context;
  private UsbManager usbManager;
  private UsbSerialPort usbSerialPort;

  private ReadThread readThread;
  private EmitThread emitThread;

  private BlockingQueue<byte[]> readQueue = new LinkedBlockingQueue<>();

  private int portNum = 0;
  private int baudRate = 115200;

  private boolean connected = false;

  private enum UsbPermissionState {Unknown,Requested,Granted,Denied}
  private UsbPermissionState usbPermissionState = UsbPermissionState.Unknown;

  private final BroadcastReceiver broadcastReceiver = new BroadcastReceiver() {
    @Override
    public void onReceive(Context context, Intent intent) {
      UsbDevice device;
      switch (intent.getAction()) {
        case ACTION_USB_ATTACHED:
          log("device attached");
          device = intent.getParcelableExtra(UsbManager.EXTRA_DEVICE);
          if (!connected && isSupportedDevice(device)) {
            connect(device);
          }
          break;
        case ACTION_USB_DETACHED:
          log("device detached");
          usbPermissionState = UsbPermissionState.Unknown;
          if(connected) {
            disconnect();
          }
          break;
        case ACTION_USB_PERMISSION:
          log("permission");
          boolean granted = intent.getBooleanExtra(UsbManager.EXTRA_PERMISSION_GRANTED, false);
          String action = granted ? ACTION_USB_PERMISSION_GRANTED : ACTION_USB_PERMISSION_DENIED;
          intent.setAction(action);
          sendBroadcast(intent);
          break;
        case ACTION_USB_PERMISSION_GRANTED:
          log("permission granted");
          usbPermissionState = UsbPermissionState.Granted;
          device = intent.getParcelableExtra(UsbManager.EXTRA_DEVICE);
          if (!connected && isSupportedDevice(device)) {
            connect(device);
          }
          break;
        case ACTION_USB_PERMISSION_DENIED:
          log("permission denied");
          usbPermissionState = UsbPermissionState.Denied;
          break;
        case ACTION_SERIAL_WRITE:
          log("writing data");
          String data = intent.getExtras().getString(EXTRA_SERIAL_WRITE_DATA);
          try {
            usbSerialPort.write(new byte[] { STX }, WRITE_WAIT_MILLIS);
            usbSerialPort.write(data.getBytes(), WRITE_WAIT_MILLIS);
            usbSerialPort.write(new byte[] { ETX }, WRITE_WAIT_MILLIS);
          } catch (IOException e) {
            log("failed to send:" + e);
          }
          break;
      }
    }
  };

  // Service
  @Override
  public void onCreate() {
    log("service on create");

    this.context = this;
    this.usbManager = (UsbManager) getSystemService(Context.USB_SERVICE);

    registerBroadcastReceiver();
    autoConnect();
  }

  // Service
  @Override
  public int onStartCommand(Intent intent, int flags, int startId) {
    log("service starting");
    return START_NOT_STICKY;
  }

  // Service
  @Override
  public IBinder onBind(Intent intent) {
    // TODO should i bind to the service ?
    return null;
  }

  // Service
  @Override
  public void onDestroy() {
    log("service on destroy");

    unregisterBroadcastReceiver();
    disconnect();
  }

  private void registerBroadcastReceiver() {
    log("registering receiver");

    IntentFilter filter = new IntentFilter();
    filter.addAction(ACTION_USB_ATTACHED);
    filter.addAction(ACTION_USB_DETACHED);
    filter.addAction(ACTION_USB_PERMISSION);
    filter.addAction(ACTION_USB_PERMISSION_GRANTED);
    filter.addAction(ACTION_USB_PERMISSION_DENIED);
    filter.addAction(ACTION_USB_CONNECTED);
    filter.addAction(ACTION_USB_DISCONNECTED);
    filter.addAction(ACTION_SERIAL_WRITE);

    registerReceiver(this.broadcastReceiver, filter);
  }

  private void unregisterBroadcastReceiver() {
    log("unregistering receiver");

    unregisterReceiver(this.broadcastReceiver);
  }

  private boolean isSupportedDevice(UsbDevice device) {
    if (device.getVendorId() == SUPPORTED_VENDOR_ID && device.getProductId() == SUPPORTED_PRODUCT_ID) {
      return true;
    }
    return false;
  }

  private void requestPermission(UsbDevice device) {
    log("requesting permission");

    this.usbPermissionState = UsbPermissionState.Requested;

    int flags = Build.VERSION.SDK_INT >= Build.VERSION_CODES.M ? PendingIntent.FLAG_MUTABLE : 0;
    Intent intent = new Intent(ACTION_USB_PERMISSION);
    PendingIntent usbPermissionIntent = PendingIntent.getBroadcast(context, 0, intent, flags);

    this.usbManager.requestPermission(device, usbPermissionIntent);
  }

  private void autoConnect() {
    log("auto connecting");

    for(UsbDevice v : this.usbManager.getDeviceList().values())
      if (isSupportedDevice(v)) {
        connect(v);
        break;
      }
  }

  private void connect(UsbDevice usbDevice) {
    log("connecting");

    if(this.connected) {
      log("already connected");
      return;
    }

    UsbSerialDriver usbDriver = UsbSerialProber.getDefaultProber().probeDevice(usbDevice);

    if(usbDriver == null) {
      log("connection failed: no driver for usbDevice");
      return;
    }

    if(usbDriver.getPorts().size() < this.portNum) {
      log("connection failed: not enough ports at usbDevice");
      return;
    }

    UsbDeviceConnection usbConnection = this.usbManager.openDevice(usbDevice);

    if(usbConnection == null) {
      if (this.usbPermissionState == UsbPermissionState.Unknown && !this.usbManager.hasPermission(usbDevice)) {
        requestPermission(usbDevice);
        return;
      } else if (!this.usbManager.hasPermission(usbDevice)) {
        log("connection failed: permission denied");
        return;
      } else {
        log("connection failed: open failed");
        return;
      }
    }

    try {
      this.usbSerialPort = usbDriver.getPorts().get(this.portNum);
      this.usbSerialPort.open(usbConnection);
      this.usbSerialPort.setParameters(this.baudRate, 8, 1, UsbSerialPort.PARITY_NONE);

      log("starting read-thread");
      this.readThread = new ReadThread();
      this.readThread.start();

      log("starting emit-thread");
      this.emitThread = new EmitThread();
      this.emitThread.start();

      log("connected");
      this.connected = true;

      sendBroadcast(new Intent(ACTION_USB_CONNECTED));
    } catch (Exception e) {
      log("connection failed: " + e.getMessage());
      disconnect();
    }
  }

  private void disconnect() {
    log("disconnecting");

    if(!this.connected) {
      log("not connected");
      return;
    }

    this.connected = false;

    sendBroadcast(new Intent(ACTION_USB_DISCONNECTED));

    this.readThread.stopRunning();
    this.emitThread.stopRunning();

    try {
      this.usbSerialPort.close();
    } catch (IOException ignored) {}

    this.usbSerialPort = null;
  }

  private class ReadThread extends Thread {
    private AtomicBoolean keepRunning = new AtomicBoolean(true);

    @Override
    public void run() {
      log("read-thread starting");

      Process.setThreadPriority(Process.THREAD_PRIORITY_URGENT_AUDIO);

      byte[] buffer = new byte[32];

      while (this.keepRunning.get()) {
        try {
          int readSize = usbSerialPort.read(buffer, 2000);
          if (readSize > 0) {
            final byte[] data = Arrays.copyOf(buffer, readSize);;
            readQueue.put(data);
          }
        } catch (IOException e) {
          log("read-thread got ioexception");
        } catch (InterruptedException e) {
          log("read-thread got interrupted");
        }
      }

      log("read-thread stopping");
    }

    public void stopRunning() {
      this.keepRunning.set(false);
    }
  }

  private class EmitThread extends Thread {
    private AtomicBoolean keepRunning = new AtomicBoolean(true);

    @Override
    public void run() {
      log("emit-thread starting");

      String messageBuffer = "";
      boolean sawSTX = false;
      boolean sawETX = false;

      while (this.keepRunning.get()) {
        try {
          byte[] data = readQueue.take();
          // log("emit-thread got chunk");
          for (byte b : data) {
            if (b == STX) {
              sawSTX = true;
              messageBuffer = "";
            } else if (b == ETX) {
              sawETX = true;
              break;
            } else if (sawSTX) {
              messageBuffer += new String(new byte[] { b });
            }
          }

          if (sawETX) {
            sawSTX = sawETX = false;
            Intent intent = new Intent(ACTION_SERIAL_READ_RECEIVED);
            intent.putExtra(EXTRA_SERIAL_READ_DATA, messageBuffer);
            sendBroadcast(intent);
          }
        } catch (InterruptedException e) {
          log("emit-thread got interrupted");
        }
      }

      log("emit-thread stopping");
    }

    public void stopRunning() {
      this.keepRunning.set(false);
    }
  }

  private void log(String str) {
    Log.d("SerialConnectionService", str);
  }

}
