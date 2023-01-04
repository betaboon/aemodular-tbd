import { Mutex, Semaphore } from "async-mutex";
import { Service } from "./service";
import { Convert, IOCaps, Plugin, PluginParams } from "./models";

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
    console.log(response);
  }

  public async setPluginParamCV(channel: number, id: string, cv: number): Promise<void> {
    const response = await this.executeCommand({
      cmd: "/api/v1/setPluginParamCV/",
      ch: channel,
      id: id,
      cv: cv,
    });
    console.log(response);
  }

  public async setPluginParamTRIG(channel: number, id: string, trig: number): Promise<void> {
    const response = await this.executeCommand({
      cmd: "/api/v1/setPluginParamTRIG/",
      ch: channel,
      id: id,
      trig: trig,
    });
    console.log(response);
  }

}
