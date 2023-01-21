import { Utils } from "@nativescript/core";
import { android as androidApp } from "@nativescript/core/application";
import { EventEmitter } from "eventemitter3";

export type OnConnectedCallback = () => void;
export type OnDisconnectedCallback = () => void;
export type OnReadReceivedCallback = (data: string) => void;

export class Service {
  // @ts-ignore
  private static readonly SERVICE_SERIAL_CONNECTION = com.aemodular.tbd.SerialConnectionService.class;

  private static readonly ACTION_USB_CONNECTED: string = "com.aemodular.tbd.USB_CONNECTED";
  private static readonly ACTION_USB_DISCONNECTED: string = "com.aemodular.tbd.USB_DISCONNECTED";
  private static readonly ACTION_SERIAL_WRITE: string = "com.aemodular.tbd.SERIAL_WRITE";
  private static readonly ACTION_SERIAL_READ_RECEIVED: string = "com.aemodular.tbd.SERIAL_READ_RECEIVED";

  private static readonly EXTRA_SERIAL_WRITE_DATA: string = "com.aemodular.tbd.SERIAL_WRITE_DATA";
  private static readonly EXTRA_SERIAL_READ_DATA: string = "com.aemodular.tbd.SERIAL_READ_DATA";

  private static readonly EVENT_CONNECTED: string = "onConnected";
  private static readonly EVENT_DISCONNECTED: string = "onDisconnected";
  private static readonly EVENT_READ_RECEIVED: string = "onReadReceived";

  // private static readonly SUPPORTED_VENDOR_ID: number = 0x1a86;
  // private static readonly SUPPORTED_PRODUCT_ID: number = 0x7523;

  private context: android.content.Context;
  private eventEmitter: EventEmitter;

  private running: boolean = false;
  private connected: boolean = false;

  constructor() {
    this.context = Utils.android.getApplicationContext();
    this.eventEmitter = new EventEmitter();
  }

  protected start(): void {
    if (this.running) {
      return
    }

    console.log("service - starting");

    this.registerBroadcastReceivers();
    this.startBackgroundService();

    this.running = true;
  }

  protected stop(): void {
    if (!this.running) {
      return;
    }

    console.log("service - stopping");

    this.stopBackgroundService()
    this.unregisterBroadcastReceivers();

    this.running = false;
  }

  private startBackgroundService(): void {
    console.log("service - starting background-service");

    const intent = new android.content.Intent(androidApp.startActivity, Service.SERVICE_SERIAL_CONNECTION);
    this.context.startService(intent);
  }

  private stopBackgroundService(): void {
    console.log("service - stopping background-service");

    const intent = new android.content.Intent(androidApp.startActivity, Service.SERVICE_SERIAL_CONNECTION);
    this.context.stopService(intent);
  }

  private registerBroadcastReceivers(): void {
    console.log("service - registering broadcast-receivers");

    androidApp.registerBroadcastReceiver(Service.ACTION_USB_CONNECTED, this.onUsbConnectedCallback.bind(this));
    androidApp.registerBroadcastReceiver(Service.ACTION_USB_DISCONNECTED, this.onUsbDisconnectedCallback.bind(this));
    androidApp.registerBroadcastReceiver(Service.ACTION_SERIAL_READ_RECEIVED, this.onSerialReadReceivedCallback.bind(this));
  }

  private unregisterBroadcastReceivers(): void {
    console.log("service - unregistering broadcast-receivers");

    androidApp.unregisterBroadcastReceiver(Service.ACTION_USB_CONNECTED);
    androidApp.unregisterBroadcastReceiver(Service.ACTION_USB_CONNECTED);
    androidApp.unregisterBroadcastReceiver(Service.ACTION_SERIAL_READ_RECEIVED);
  }

  private onUsbConnectedCallback(context: android.content.Context, intent: android.content.Intent): void {
    console.log("service - received broadcast: usb-connected");

    this.connected = true;
    this.eventEmitter.emit(Service.EVENT_CONNECTED);
  }

  private onUsbDisconnectedCallback(context: android.content.Context, intent: android.content.Intent): void {
    console.log("service - received broadcast: usb-disconnected");

    this.connected = false;
    this.eventEmitter.emit(Service.EVENT_DISCONNECTED);
  }

  private onSerialReadReceivedCallback(context: android.content.Context, intent: android.content.Intent): void {
    const data = intent.getStringExtra(Service.EXTRA_SERIAL_READ_DATA);

    console.log("service - read:", data);
    this.eventEmitter.emit(Service.EVENT_READ_RECEIVED, data);
  }

  protected writeString(data: string): void {
    console.log("service - writing:", data);

    if (!this.connected) {
      console.error("service - no connection-worker");
      return;
    }

    const intent = new android.content.Intent(Service.ACTION_SERIAL_WRITE);
    intent.putExtra(Service.EXTRA_SERIAL_WRITE_DATA, data);
    this.context.sendBroadcast(intent);
  }

  public onConnected(callback: OnConnectedCallback): void {
    this.eventEmitter.on(Service.EVENT_CONNECTED, callback);
  }

  public onDisconnected(callback: OnDisconnectedCallback): void {
    this.eventEmitter.on(Service.EVENT_DISCONNECTED, callback);
  }

  public onReadReceived(callback: OnReadReceivedCallback): void {
    this.eventEmitter.on(Service.EVENT_READ_RECEIVED, callback);
  }

  public onceReadReceived(callback: OnReadReceivedCallback): void {
    this.eventEmitter.once(Service.EVENT_READ_RECEIVED, callback);
  }

}
