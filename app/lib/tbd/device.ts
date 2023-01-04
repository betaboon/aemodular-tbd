import { Mutex, Semaphore } from "async-mutex";
import { Service } from "./service";
import { Convert, IOCaps, Plugin } from "./models";

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

}
