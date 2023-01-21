import { Mutex, Semaphore } from "async-mutex";
import { Service } from "./service";
import { Convert, Favorite, IOCaps, Plugin, PluginParams, Presets } from "./models";

export class Device extends Service {
  private commandMutex: Mutex
  private readSemaphore: Semaphore;

  constructor() {
    super();

    this.commandMutex = new Mutex();
    this.readSemaphore = new Semaphore(1);
  }

  startService(): void {
    this.start();
  }

  stopService(): void {
    this.stop();
  }

  private async executeCommand(command: object): Promise<string> {
    const message = JSON.stringify(command);
    let response = "";

    await this.commandMutex.runExclusive(async () => {
      await this.readSemaphore.acquire();

      this.onceReadReceived((data) => {
        response = data;
        this.readSemaphore.release();
      });

      this.writeString(message);
      await this.readSemaphore.waitForUnlock();
    });

    return response;
  }

  public async getIOCaps(): Promise<IOCaps> {
    const response = await this.executeCommand({
      cmd: "/api/v1/getIOCaps",
    });
    return Convert.toIOCaps(response);
  }

  public async getPlugins(): Promise<Plugin[]> {
    const response = await this.executeCommand({
      cmd: "/api/v1/getPlugins",
    });
    return Convert.toPlugin(response)
  }

  public async getActivePlugin(channel: number): Promise<string> {
    const response = await this.executeCommand({
      cmd: "/api/v1/getActivePlugin/",
      ch: channel,
    })
    const plugin = Convert.toActivePlugin(response);
    return plugin.id;
  }

  public async setActivePlugin(channel: number, id: string): Promise<void> {
    await this.executeCommand({
      cmd: "/api/v1/setActivePlugin/",
      ch: channel,
      id: id,
    })
  }

  public async getPluginParams(channel: number): Promise<PluginParams> {
    const response = await this.executeCommand({
      cmd: `/api/v1/getPluginParams/${channel}`,
      ch: channel,
    });
    return Convert.toPluginParams(response);
  }

  public async setPluginParam(channel: number, id: string, current: number): Promise<void> {
    const response = await this.executeCommand({
      cmd: "/api/v1/setPluginParam/",
      ch: channel,
      id: id,
      current: current,
    })
  }

  public async setPluginParamCV(channel: number, id: string, cv: number): Promise<void> {
    const response = await this.executeCommand({
      cmd: "/api/v1/setPluginParamCV/",
      ch: channel,
      id: id,
      cv: cv,
    });
  }

  public async setPluginParamTRIG(channel: number, id: string, trig: number): Promise<void> {
    const response = await this.executeCommand({
      cmd: "/api/v1/setPluginParamTRIG/",
      ch: channel,
      id: id,
      trig: trig,
    });
  }

  public async getPresets(channel: number): Promise<Presets> {
    const response = await this.executeCommand({
      cmd: "/api/v1/getPresets/",
      ch: channel,
    });
    return Convert.toPresets(response);
  }

  public async loadPreset(channel: number, num: number): Promise<void> {
    const response = await this.executeCommand({
      cmd: "/api/v1/loadPreset/",
      ch: channel,
      number: num,
    });
  }

  public async savePreset(channel: number, num: number, name: string): Promise<void> {
    const response = await this.executeCommand({
      cmd: "/api/v1/savePreset/",
      ch: channel,
      number: num,
      name: name,
    });
  }

  // public async getPresetData(id: string) {
  //   const response = await this.executeCommand({
  //     cmd: "/api/v1/getPresetData/",
  //     id: id,
  //   });
  //   console.log(response);
  // }

  // public async setPresetData(id: string, content: string) {
  //   const response = await this.executeCommand({
  //     cmd: "/api/v1/setPresetData/",
  //     id: id,
  //     data: content,
  //   });
  //   console.log(response);
  // }

  // public async getConfiguration() {
  //   const response = await this.executeCommand({
  //     cmd: "/api/v1/getConfiguration",
  //   });
  //   console.log(response);
  // }

  // public async setConfiguration(configuration: string) {
  //   const response = await this.executeCommand({
  //     cmd: "/api/v1/setConfiguration",
  //     configuration: configuration,
  //   });
  //   console.log(response);
  // }

  // public async reboot(doCalibration: boolean) {
  //   const response = await this.executeCommand({
  //     cmd: "/api/v1/reboot",
  //     calibration: doCalibration ? 1 : 0,
  //   });
  //   console.log(response);
  // }

  // public async getCalibration() {
  //   const response = await this.executeCommand({
  //     cmd: "/api/v1/getCalibration",
  //   });
  //   console.log(response);
  // }

  // public async setCalibration(content: string) {
  //   const response = await this.executeCommand({
  //     cmd: "/api/v1/",
  //     calibration: content,
  //   });
  //   console.log(response);
  // }

  public async getFavorites(): Promise<Favorite[]> {
    const response = await this.executeCommand({
      cmd: "/api/v1/favorites/getAll",
    });
    return Convert.toFavorite(response);
  }

  public async storeFavorite(num: number, favorite: Favorite): Promise<void> {
    const response = await this.executeCommand({
      cmd: "/api/v1/favorites/store/",
      fav: num,
      data: favorite,
    });
  }

  public async recallFavorite(num: number): Promise<void> {
    const response = await this.executeCommand({
      cmd: "/api/v1/favorites/recall/",
      fav: num,
    });
  }

  // public async getSromSize() {
  //   const response = await this.executeCommand({
  //     cmd: "/api/v1/srom/getSize/",
  //   });
  //   console.log(response);
  // }

}
