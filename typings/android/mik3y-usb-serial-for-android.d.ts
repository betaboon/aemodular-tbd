/// <reference path="android-declarations.d.ts"/>

declare module com {
	export module hoho {
		export module android {
			export module usbserial {
				export class BuildConfig {
					public static class: java.lang.Class<com.hoho.android.usbserial.BuildConfig>;
					public static DEBUG: boolean;
					public static LIBRARY_PACKAGE_NAME: string;
					public static BUILD_TYPE: string;
					public constructor();
				}
			}
		}
	}
}

declare module com {
	export module hoho {
		export module android {
			export module usbserial {
				export class R {
					public static class: java.lang.Class<com.hoho.android.usbserial.R>;
				}
				export module R {
					export class id {
						public static class: java.lang.Class<com.hoho.android.usbserial.R.id>;
						public static view_tree_lifecycle_owner: number;
					}
				}
			}
		}
	}
}

declare module com {
	export module hoho {
		export module android {
			export module usbserial {
				export module driver {
					export class CdcAcmSerialDriver extends com.hoho.android.usbserial.driver.UsbSerialDriver {
						public static class: java.lang.Class<com.hoho.android.usbserial.driver.CdcAcmSerialDriver>;
						public getDevice(): globalAndroid.hardware.usb.UsbDevice;
						public getPorts(): java.util.List<com.hoho.android.usbserial.driver.UsbSerialPort>;
						public static getSupportedDevices(): java.util.Map<java.lang.Integer,androidNative.Array<number>>;
						public constructor(param0: globalAndroid.hardware.usb.UsbDevice);
					}
					export module CdcAcmSerialDriver {
						export class CdcAcmSerialPort extends com.hoho.android.usbserial.driver.CommonUsbSerialPort {
							public static class: java.lang.Class<com.hoho.android.usbserial.driver.CdcAcmSerialDriver.CdcAcmSerialPort>;
							public getDSR(): boolean;
							public setBreak(param0: boolean): void;
							public close(): void;
							public openInt(param0: globalAndroid.hardware.usb.UsbDeviceConnection): void;
							public getDTR(): boolean;
							public open(param0: globalAndroid.hardware.usb.UsbDeviceConnection): void;
							public isOpen(): boolean;
							public closeInt(): void;
							public getSerial(): string;
							public getWriteEndpoint(): globalAndroid.hardware.usb.UsbEndpoint;
							public read(param0: androidNative.Array<number>, param1: number, param2: boolean): number;
							public purgeHwBuffers(param0: boolean, param1: boolean): void;
							public getCD(): boolean;
							public getDevice(): globalAndroid.hardware.usb.UsbDevice;
							public getPortNumber(): number;
							public write(param0: androidNative.Array<number>, param1: number): void;
							public getDriver(): com.hoho.android.usbserial.driver.UsbSerialDriver;
							public setRTS(param0: boolean): void;
							public getSupportedControlLines(): java.util.EnumSet<com.hoho.android.usbserial.driver.UsbSerialPort.ControlLine>;
							public getCTS(): boolean;
							public getControlLines(): java.util.EnumSet<com.hoho.android.usbserial.driver.UsbSerialPort.ControlLine>;
							public read(param0: androidNative.Array<number>, param1: number): number;
							public getRI(): boolean;
							public constructor(param0: com.hoho.android.usbserial.driver.CdcAcmSerialDriver, param1: globalAndroid.hardware.usb.UsbDevice, param2: number);
							public getRTS(): boolean;
							public constructor(param0: globalAndroid.hardware.usb.UsbDevice, param1: number);
							public setDTR(param0: boolean): void;
							public getReadEndpoint(): globalAndroid.hardware.usb.UsbEndpoint;
							public setParameters(param0: number, param1: number, param2: number, param3: number): void;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module hoho {
		export module android {
			export module usbserial {
				export module driver {
					export class Ch34xSerialDriver extends com.hoho.android.usbserial.driver.UsbSerialDriver {
						public static class: java.lang.Class<com.hoho.android.usbserial.driver.Ch34xSerialDriver>;
						public getDevice(): globalAndroid.hardware.usb.UsbDevice;
						public getPorts(): java.util.List<com.hoho.android.usbserial.driver.UsbSerialPort>;
						public static getSupportedDevices(): java.util.Map<java.lang.Integer,androidNative.Array<number>>;
						public constructor(param0: globalAndroid.hardware.usb.UsbDevice);
					}
					export module Ch34xSerialDriver {
						export class Ch340SerialPort extends com.hoho.android.usbserial.driver.CommonUsbSerialPort {
							public static class: java.lang.Class<com.hoho.android.usbserial.driver.Ch34xSerialDriver.Ch340SerialPort>;
							public getDSR(): boolean;
							public setBreak(param0: boolean): void;
							public close(): void;
							public openInt(param0: globalAndroid.hardware.usb.UsbDeviceConnection): void;
							public getDTR(): boolean;
							public open(param0: globalAndroid.hardware.usb.UsbDeviceConnection): void;
							public isOpen(): boolean;
							public closeInt(): void;
							public constructor(param0: com.hoho.android.usbserial.driver.Ch34xSerialDriver, param1: globalAndroid.hardware.usb.UsbDevice, param2: number);
							public getSerial(): string;
							public getWriteEndpoint(): globalAndroid.hardware.usb.UsbEndpoint;
							public read(param0: androidNative.Array<number>, param1: number, param2: boolean): number;
							public purgeHwBuffers(param0: boolean, param1: boolean): void;
							public getCD(): boolean;
							public getDevice(): globalAndroid.hardware.usb.UsbDevice;
							public getPortNumber(): number;
							public write(param0: androidNative.Array<number>, param1: number): void;
							public getDriver(): com.hoho.android.usbserial.driver.UsbSerialDriver;
							public setRTS(param0: boolean): void;
							public getSupportedControlLines(): java.util.EnumSet<com.hoho.android.usbserial.driver.UsbSerialPort.ControlLine>;
							public getCTS(): boolean;
							public getControlLines(): java.util.EnumSet<com.hoho.android.usbserial.driver.UsbSerialPort.ControlLine>;
							public read(param0: androidNative.Array<number>, param1: number): number;
							public getRI(): boolean;
							public getRTS(): boolean;
							public constructor(param0: globalAndroid.hardware.usb.UsbDevice, param1: number);
							public setDTR(param0: boolean): void;
							public getReadEndpoint(): globalAndroid.hardware.usb.UsbEndpoint;
							public setParameters(param0: number, param1: number, param2: number, param3: number): void;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module hoho {
		export module android {
			export module usbserial {
				export module driver {
					export abstract class CommonUsbSerialPort extends com.hoho.android.usbserial.driver.UsbSerialPort {
						public static class: java.lang.Class<com.hoho.android.usbserial.driver.CommonUsbSerialPort>;
						public static DEBUG: boolean;
						public mDevice: globalAndroid.hardware.usb.UsbDevice;
						public mPortNumber: number;
						public mConnection: globalAndroid.hardware.usb.UsbDeviceConnection;
						public mReadEndpoint: globalAndroid.hardware.usb.UsbEndpoint;
						public mWriteEndpoint: globalAndroid.hardware.usb.UsbEndpoint;
						public mUsbRequest: globalAndroid.hardware.usb.UsbRequest;
						public mWriteBuffer: androidNative.Array<number>;
						public mWriteBufferLock: any;
						public close(): void;
						public closeInt(): void;
						public getWriteEndpoint(): globalAndroid.hardware.usb.UsbEndpoint;
						public getSerial(): string;
						public getPortNumber(): number;
						public getCD(): boolean;
						public read(param0: androidNative.Array<number>, param1: number): number;
						public openInt(param0: globalAndroid.hardware.usb.UsbDeviceConnection): void;
						public isOpen(): boolean;
						public open(param0: globalAndroid.hardware.usb.UsbDeviceConnection): void;
						public getDSR(): boolean;
						public read(param0: androidNative.Array<number>, param1: number, param2: boolean): number;
						public getDTR(): boolean;
						public setDTR(param0: boolean): void;
						public getSupportedControlLines(): java.util.EnumSet<com.hoho.android.usbserial.driver.UsbSerialPort.ControlLine>;
						public setWriteBufferSize(param0: number): void;
						public setBreak(param0: boolean): void;
						public getControlLines(): java.util.EnumSet<com.hoho.android.usbserial.driver.UsbSerialPort.ControlLine>;
						public getRI(): boolean;
						public toString(): string;
						public getRTS(): boolean;
						public setRTS(param0: boolean): void;
						public getDevice(): globalAndroid.hardware.usb.UsbDevice;
						public getReadEndpoint(): globalAndroid.hardware.usb.UsbEndpoint;
						public getCTS(): boolean;
						public getDriver(): com.hoho.android.usbserial.driver.UsbSerialDriver;
						public constructor(param0: globalAndroid.hardware.usb.UsbDevice, param1: number);
						public testConnection(): void;
						public write(param0: androidNative.Array<number>, param1: number): void;
						public purgeHwBuffers(param0: boolean, param1: boolean): void;
						public setParameters(param0: number, param1: number, param2: number, param3: number): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module hoho {
		export module android {
			export module usbserial {
				export module driver {
					export class Cp21xxSerialDriver extends com.hoho.android.usbserial.driver.UsbSerialDriver {
						public static class: java.lang.Class<com.hoho.android.usbserial.driver.Cp21xxSerialDriver>;
						public getDevice(): globalAndroid.hardware.usb.UsbDevice;
						public getPorts(): java.util.List<com.hoho.android.usbserial.driver.UsbSerialPort>;
						public static getSupportedDevices(): java.util.Map<java.lang.Integer,androidNative.Array<number>>;
						public constructor(param0: globalAndroid.hardware.usb.UsbDevice);
					}
					export module Cp21xxSerialDriver {
						export class Cp21xxSerialPort extends com.hoho.android.usbserial.driver.CommonUsbSerialPort {
							public static class: java.lang.Class<com.hoho.android.usbserial.driver.Cp21xxSerialDriver.Cp21xxSerialPort>;
							public getDSR(): boolean;
							public setBreak(param0: boolean): void;
							public close(): void;
							public openInt(param0: globalAndroid.hardware.usb.UsbDeviceConnection): void;
							public getDTR(): boolean;
							public open(param0: globalAndroid.hardware.usb.UsbDeviceConnection): void;
							public isOpen(): boolean;
							public closeInt(): void;
							public getSerial(): string;
							public purgeHwBuffers(param0: boolean, param1: boolean): void;
							public getWriteEndpoint(): globalAndroid.hardware.usb.UsbEndpoint;
							public read(param0: androidNative.Array<number>, param1: number, param2: boolean): number;
							public getCD(): boolean;
							public getDevice(): globalAndroid.hardware.usb.UsbDevice;
							public getPortNumber(): number;
							public write(param0: androidNative.Array<number>, param1: number): void;
							public getDriver(): com.hoho.android.usbserial.driver.UsbSerialDriver;
							public setRTS(param0: boolean): void;
							public constructor(param0: com.hoho.android.usbserial.driver.Cp21xxSerialDriver, param1: globalAndroid.hardware.usb.UsbDevice, param2: number);
							public getSupportedControlLines(): java.util.EnumSet<com.hoho.android.usbserial.driver.UsbSerialPort.ControlLine>;
							public getCTS(): boolean;
							public getControlLines(): java.util.EnumSet<com.hoho.android.usbserial.driver.UsbSerialPort.ControlLine>;
							public read(param0: androidNative.Array<number>, param1: number): number;
							public getRI(): boolean;
							public getRTS(): boolean;
							public constructor(param0: globalAndroid.hardware.usb.UsbDevice, param1: number);
							public setDTR(param0: boolean): void;
							public getReadEndpoint(): globalAndroid.hardware.usb.UsbEndpoint;
							public setParameters(param0: number, param1: number, param2: number, param3: number): void;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module hoho {
		export module android {
			export module usbserial {
				export module driver {
					export class FtdiSerialDriver extends com.hoho.android.usbserial.driver.UsbSerialDriver {
						public static class: java.lang.Class<com.hoho.android.usbserial.driver.FtdiSerialDriver>;
						public getDevice(): globalAndroid.hardware.usb.UsbDevice;
						public getPorts(): java.util.List<com.hoho.android.usbserial.driver.UsbSerialPort>;
						public static getSupportedDevices(): java.util.Map<java.lang.Integer,androidNative.Array<number>>;
						public constructor(param0: globalAndroid.hardware.usb.UsbDevice);
					}
					export module FtdiSerialDriver {
						export class FtdiSerialPort extends com.hoho.android.usbserial.driver.CommonUsbSerialPort {
							public static class: java.lang.Class<com.hoho.android.usbserial.driver.FtdiSerialDriver.FtdiSerialPort>;
							public getDSR(): boolean;
							public setBreak(param0: boolean): void;
							public close(): void;
							public openInt(param0: globalAndroid.hardware.usb.UsbDeviceConnection): void;
							public getDTR(): boolean;
							public open(param0: globalAndroid.hardware.usb.UsbDeviceConnection): void;
							public isOpen(): boolean;
							public closeInt(): void;
							public getSerial(): string;
							public read(param0: androidNative.Array<number>, param1: number, param2: boolean): number;
							public purgeHwBuffers(param0: boolean, param1: boolean): void;
							public getWriteEndpoint(): globalAndroid.hardware.usb.UsbEndpoint;
							public getCD(): boolean;
							public getDevice(): globalAndroid.hardware.usb.UsbDevice;
							public getPortNumber(): number;
							public write(param0: androidNative.Array<number>, param1: number): void;
							public getDriver(): com.hoho.android.usbserial.driver.UsbSerialDriver;
							public setRTS(param0: boolean): void;
							public getSupportedControlLines(): java.util.EnumSet<com.hoho.android.usbserial.driver.UsbSerialPort.ControlLine>;
							public getCTS(): boolean;
							public getControlLines(): java.util.EnumSet<com.hoho.android.usbserial.driver.UsbSerialPort.ControlLine>;
							public read(param0: androidNative.Array<number>, param1: number): number;
							public readFilter(param0: androidNative.Array<number>, param1: number): number;
							public setLatencyTimer(param0: number): void;
							public getRI(): boolean;
							public constructor(param0: com.hoho.android.usbserial.driver.FtdiSerialDriver, param1: globalAndroid.hardware.usb.UsbDevice, param2: number);
							public getRTS(): boolean;
							public constructor(param0: globalAndroid.hardware.usb.UsbDevice, param1: number);
							public setDTR(param0: boolean): void;
							public getReadEndpoint(): globalAndroid.hardware.usb.UsbEndpoint;
							public setParameters(param0: number, param1: number, param2: number, param3: number): void;
							public getLatencyTimer(): number;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module hoho {
		export module android {
			export module usbserial {
				export module driver {
					export class ProbeTable {
						public static class: java.lang.Class<com.hoho.android.usbserial.driver.ProbeTable>;
						public constructor();
						public findDriver(param0: number, param1: number): java.lang.Class<any>;
						public addProduct(param0: number, param1: number, param2: java.lang.Class<any>): com.hoho.android.usbserial.driver.ProbeTable;
					}
				}
			}
		}
	}
}

declare module com {
	export module hoho {
		export module android {
			export module usbserial {
				export module driver {
					export class ProlificSerialDriver extends com.hoho.android.usbserial.driver.UsbSerialDriver {
						public static class: java.lang.Class<com.hoho.android.usbserial.driver.ProlificSerialDriver>;
						public getPorts(): java.util.List<com.hoho.android.usbserial.driver.UsbSerialPort>;
						public getDevice(): globalAndroid.hardware.usb.UsbDevice;
						public static getSupportedDevices(): java.util.Map<java.lang.Integer,androidNative.Array<number>>;
						public constructor(param0: globalAndroid.hardware.usb.UsbDevice);
					}
					export module ProlificSerialDriver {
						export class DeviceType {
							public static class: java.lang.Class<com.hoho.android.usbserial.driver.ProlificSerialDriver.DeviceType>;
							public static DEVICE_TYPE_01: com.hoho.android.usbserial.driver.ProlificSerialDriver.DeviceType;
							public static DEVICE_TYPE_T: com.hoho.android.usbserial.driver.ProlificSerialDriver.DeviceType;
							public static DEVICE_TYPE_HX: com.hoho.android.usbserial.driver.ProlificSerialDriver.DeviceType;
							public static DEVICE_TYPE_HXN: com.hoho.android.usbserial.driver.ProlificSerialDriver.DeviceType;
							public static values(): androidNative.Array<com.hoho.android.usbserial.driver.ProlificSerialDriver.DeviceType>;
							public static valueOf(param0: string): com.hoho.android.usbserial.driver.ProlificSerialDriver.DeviceType;
						}
						export class ProlificSerialPort extends com.hoho.android.usbserial.driver.CommonUsbSerialPort {
							public static class: java.lang.Class<com.hoho.android.usbserial.driver.ProlificSerialDriver.ProlificSerialPort>;
							public mDeviceType: com.hoho.android.usbserial.driver.ProlificSerialDriver.DeviceType;
							public getDSR(): boolean;
							public setBreak(param0: boolean): void;
							public close(): void;
							public openInt(param0: globalAndroid.hardware.usb.UsbDeviceConnection): void;
							public getDTR(): boolean;
							public open(param0: globalAndroid.hardware.usb.UsbDeviceConnection): void;
							public isOpen(): boolean;
							public closeInt(): void;
							public getSerial(): string;
							public purgeHwBuffers(param0: boolean, param1: boolean): void;
							public getWriteEndpoint(): globalAndroid.hardware.usb.UsbEndpoint;
							public read(param0: androidNative.Array<number>, param1: number, param2: boolean): number;
							public getCD(): boolean;
							public getDevice(): globalAndroid.hardware.usb.UsbDevice;
							public getPortNumber(): number;
							public write(param0: androidNative.Array<number>, param1: number): void;
							public getDriver(): com.hoho.android.usbserial.driver.UsbSerialDriver;
							public setRTS(param0: boolean): void;
							public getSupportedControlLines(): java.util.EnumSet<com.hoho.android.usbserial.driver.UsbSerialPort.ControlLine>;
							public getCTS(): boolean;
							public getControlLines(): java.util.EnumSet<com.hoho.android.usbserial.driver.UsbSerialPort.ControlLine>;
							public read(param0: androidNative.Array<number>, param1: number): number;
							public getRI(): boolean;
							public getRTS(): boolean;
							public constructor(param0: globalAndroid.hardware.usb.UsbDevice, param1: number);
							public constructor(param0: com.hoho.android.usbserial.driver.ProlificSerialDriver, param1: globalAndroid.hardware.usb.UsbDevice, param2: number);
							public setDTR(param0: boolean): void;
							public getReadEndpoint(): globalAndroid.hardware.usb.UsbEndpoint;
							public setParameters(param0: number, param1: number, param2: number, param3: number): void;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module hoho {
		export module android {
			export module usbserial {
				export module driver {
					export class SerialTimeoutException {
						public static class: java.lang.Class<com.hoho.android.usbserial.driver.SerialTimeoutException>;
						public constructor(param0: string);
					}
				}
			}
		}
	}
}

declare module com {
	export module hoho {
		export module android {
			export module usbserial {
				export module driver {
					export class UsbId {
						public static class: java.lang.Class<com.hoho.android.usbserial.driver.UsbId>;
						public static VENDOR_FTDI: number;
						public static FTDI_FT232R: number;
						public static FTDI_FT2232H: number;
						public static FTDI_FT4232H: number;
						public static FTDI_FT232H: number;
						public static FTDI_FT231X: number;
						public static VENDOR_ATMEL: number;
						public static ATMEL_LUFA_CDC_DEMO_APP: number;
						public static VENDOR_ARDUINO: number;
						public static ARDUINO_UNO: number;
						public static ARDUINO_MEGA_2560: number;
						public static ARDUINO_SERIAL_ADAPTER: number;
						public static ARDUINO_MEGA_ADK: number;
						public static ARDUINO_MEGA_2560_R3: number;
						public static ARDUINO_UNO_R3: number;
						public static ARDUINO_MEGA_ADK_R3: number;
						public static ARDUINO_SERIAL_ADAPTER_R3: number;
						public static ARDUINO_LEONARDO: number;
						public static ARDUINO_MICRO: number;
						public static VENDOR_VAN_OOIJEN_TECH: number;
						public static VAN_OOIJEN_TECH_TEENSYDUINO_SERIAL: number;
						public static VENDOR_LEAFLABS: number;
						public static LEAFLABS_MAPLE: number;
						public static VENDOR_SILABS: number;
						public static SILABS_CP2102: number;
						public static SILABS_CP2105: number;
						public static SILABS_CP2108: number;
						public static VENDOR_PROLIFIC: number;
						public static PROLIFIC_PL2303: number;
						public static PROLIFIC_PL2303GC: number;
						public static PROLIFIC_PL2303GB: number;
						public static PROLIFIC_PL2303GT: number;
						public static PROLIFIC_PL2303GL: number;
						public static PROLIFIC_PL2303GE: number;
						public static PROLIFIC_PL2303GS: number;
						public static VENDOR_QINHENG: number;
						public static QINHENG_CH340: number;
						public static QINHENG_CH341A: number;
						public static QINHENG_CH9102F: number;
						public static VENDOR_ARM: number;
						public static ARM_MBED: number;
						public static VENDOR_ST: number;
						public static ST_CDC: number;
						public static VENDOR_RASPBERRY_PI: number;
						public static RASPBERRY_PI_PICO_MICROPYTHON: number;
						public static RASPBERRY_PI_PICO_SDK: number;
					}
				}
			}
		}
	}
}

declare module com {
	export module hoho {
		export module android {
			export module usbserial {
				export module driver {
					export class UsbSerialDriver {
						public static class: java.lang.Class<com.hoho.android.usbserial.driver.UsbSerialDriver>;
						/**
						 * Constructs a new instance of the com.hoho.android.usbserial.driver.UsbSerialDriver interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							getDevice(): globalAndroid.hardware.usb.UsbDevice;
							getPorts(): java.util.List<com.hoho.android.usbserial.driver.UsbSerialPort>;
						});
						public constructor();
						public getDevice(): globalAndroid.hardware.usb.UsbDevice;
						public getPorts(): java.util.List<com.hoho.android.usbserial.driver.UsbSerialPort>;
					}
				}
			}
		}
	}
}

declare module com {
	export module hoho {
		export module android {
			export module usbserial {
				export module driver {
					export class UsbSerialPort {
						public static class: java.lang.Class<com.hoho.android.usbserial.driver.UsbSerialPort>;
						/**
						 * Constructs a new instance of the com.hoho.android.usbserial.driver.UsbSerialPort interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							getDriver(): com.hoho.android.usbserial.driver.UsbSerialDriver;
							getDevice(): globalAndroid.hardware.usb.UsbDevice;
							getPortNumber(): number;
							getWriteEndpoint(): globalAndroid.hardware.usb.UsbEndpoint;
							getReadEndpoint(): globalAndroid.hardware.usb.UsbEndpoint;
							getSerial(): string;
							open(param0: globalAndroid.hardware.usb.UsbDeviceConnection): void;
							close(): void;
							read(param0: androidNative.Array<number>, param1: number): number;
							write(param0: androidNative.Array<number>, param1: number): void;
							setParameters(param0: number, param1: number, param2: number, param3: number): void;
							getCD(): boolean;
							getCTS(): boolean;
							getDSR(): boolean;
							getDTR(): boolean;
							setDTR(param0: boolean): void;
							getRI(): boolean;
							getRTS(): boolean;
							setRTS(param0: boolean): void;
							getControlLines(): java.util.EnumSet<com.hoho.android.usbserial.driver.UsbSerialPort.ControlLine>;
							getSupportedControlLines(): java.util.EnumSet<com.hoho.android.usbserial.driver.UsbSerialPort.ControlLine>;
							purgeHwBuffers(param0: boolean, param1: boolean): void;
							setBreak(param0: boolean): void;
							isOpen(): boolean;
						});
						public constructor();
						public static PARITY_ODD: number;
						public static PARITY_EVEN: number;
						public static STOPBITS_1_5: number;
						public static PARITY_SPACE: number;
						public static DATABITS_7: number;
						public static DATABITS_8: number;
						public static DATABITS_5: number;
						public static PARITY_NONE: number;
						public static DATABITS_6: number;
						public static STOPBITS_1: number;
						public static STOPBITS_2: number;
						public static PARITY_MARK: number;
						public setBreak(param0: boolean): void;
						public close(): void;
						public getControlLines(): java.util.EnumSet<com.hoho.android.usbserial.driver.UsbSerialPort.ControlLine>;
						public getRI(): boolean;
						public getWriteEndpoint(): globalAndroid.hardware.usb.UsbEndpoint;
						public getSerial(): string;
						public getRTS(): boolean;
						public setRTS(param0: boolean): void;
						public getDevice(): globalAndroid.hardware.usb.UsbDevice;
						public getReadEndpoint(): globalAndroid.hardware.usb.UsbEndpoint;
						public getPortNumber(): number;
						public getCD(): boolean;
						public getDriver(): com.hoho.android.usbserial.driver.UsbSerialDriver;
						public getCTS(): boolean;
						public read(param0: androidNative.Array<number>, param1: number): number;
						public write(param0: androidNative.Array<number>, param1: number): void;
						public purgeHwBuffers(param0: boolean, param1: boolean): void;
						public isOpen(): boolean;
						public open(param0: globalAndroid.hardware.usb.UsbDeviceConnection): void;
						public getDSR(): boolean;
						public getDTR(): boolean;
						public setDTR(param0: boolean): void;
						public getSupportedControlLines(): java.util.EnumSet<com.hoho.android.usbserial.driver.UsbSerialPort.ControlLine>;
						public setParameters(param0: number, param1: number, param2: number, param3: number): void;
					}
					export module UsbSerialPort {
						export class ControlLine {
							public static class: java.lang.Class<com.hoho.android.usbserial.driver.UsbSerialPort.ControlLine>;
							public static RTS: com.hoho.android.usbserial.driver.UsbSerialPort.ControlLine;
							public static CTS: com.hoho.android.usbserial.driver.UsbSerialPort.ControlLine;
							public static DTR: com.hoho.android.usbserial.driver.UsbSerialPort.ControlLine;
							public static DSR: com.hoho.android.usbserial.driver.UsbSerialPort.ControlLine;
							public static CD: com.hoho.android.usbserial.driver.UsbSerialPort.ControlLine;
							public static RI: com.hoho.android.usbserial.driver.UsbSerialPort.ControlLine;
							public static values(): androidNative.Array<com.hoho.android.usbserial.driver.UsbSerialPort.ControlLine>;
							public static valueOf(param0: string): com.hoho.android.usbserial.driver.UsbSerialPort.ControlLine;
						}
						export class Parity {
							public static class: java.lang.Class<com.hoho.android.usbserial.driver.UsbSerialPort.Parity>;
							/**
							 * Constructs a new instance of the com.hoho.android.usbserial.driver.UsbSerialPort$Parity interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
							});
							public constructor();
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module hoho {
		export module android {
			export module usbserial {
				export module driver {
					export class UsbSerialProber {
						public static class: java.lang.Class<com.hoho.android.usbserial.driver.UsbSerialProber>;
						public static getDefaultProbeTable(): com.hoho.android.usbserial.driver.ProbeTable;
						public constructor(param0: com.hoho.android.usbserial.driver.ProbeTable);
						public static getDefaultProber(): com.hoho.android.usbserial.driver.UsbSerialProber;
						public findAllDrivers(param0: globalAndroid.hardware.usb.UsbManager): java.util.List<com.hoho.android.usbserial.driver.UsbSerialDriver>;
						public probeDevice(param0: globalAndroid.hardware.usb.UsbDevice): com.hoho.android.usbserial.driver.UsbSerialDriver;
					}
				}
			}
		}
	}
}

declare module com {
	export module hoho {
		export module android {
			export module usbserial {
				export module util {
					export class MonotonicClock {
						public static class: java.lang.Class<com.hoho.android.usbserial.util.MonotonicClock>;
						public static millis(): number;
					}
				}
			}
		}
	}
}

declare module com {
	export module hoho {
		export module android {
			export module usbserial {
				export module util {
					export class SerialInputOutputManager {
						public static class: java.lang.Class<com.hoho.android.usbserial.util.SerialInputOutputManager>;
						public static DEBUG: boolean;
						public setListener(param0: com.hoho.android.usbserial.util.SerialInputOutputManager.Listener): void;
						public getState(): com.hoho.android.usbserial.util.SerialInputOutputManager.State;
						public setReadBufferSize(param0: number): void;
						public getReadBufferSize(): number;
						public getWriteBufferSize(): number;
						public stop(): void;
						public getListener(): com.hoho.android.usbserial.util.SerialInputOutputManager.Listener;
						public setThreadPriority(param0: number): void;
						public constructor(param0: com.hoho.android.usbserial.driver.UsbSerialPort);
						public start(): void;
						public run(): void;
						public getWriteTimeout(): number;
						public writeAsync(param0: androidNative.Array<number>): void;
						public getReadTimeout(): number;
						public setWriteTimeout(param0: number): void;
						public constructor(param0: com.hoho.android.usbserial.driver.UsbSerialPort, param1: com.hoho.android.usbserial.util.SerialInputOutputManager.Listener);
						public setWriteBufferSize(param0: number): void;
						public setReadTimeout(param0: number): void;
					}
					export module SerialInputOutputManager {
						export class Listener {
							public static class: java.lang.Class<com.hoho.android.usbserial.util.SerialInputOutputManager.Listener>;
							/**
							 * Constructs a new instance of the com.hoho.android.usbserial.util.SerialInputOutputManager$Listener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								onNewData(param0: androidNative.Array<number>): void;
								onRunError(param0: java.lang.Exception): void;
							});
							public constructor();
							public onNewData(param0: androidNative.Array<number>): void;
							public onRunError(param0: java.lang.Exception): void;
						}
						export class State {
							public static class: java.lang.Class<com.hoho.android.usbserial.util.SerialInputOutputManager.State>;
							public static STOPPED: com.hoho.android.usbserial.util.SerialInputOutputManager.State;
							public static RUNNING: com.hoho.android.usbserial.util.SerialInputOutputManager.State;
							public static STOPPING: com.hoho.android.usbserial.util.SerialInputOutputManager.State;
							public static valueOf(param0: string): com.hoho.android.usbserial.util.SerialInputOutputManager.State;
							public static values(): androidNative.Array<com.hoho.android.usbserial.util.SerialInputOutputManager.State>;
						}
					}
				}
			}
		}
	}
}

//Generics information:

