import { Mutex, Semaphore } from "async-mutex";
import { Service } from "./service";
import { Convert, Plugin } from "./models";

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

  public async getPlugins(): Promise<Plugin[]> {
    const response = await this.executeCommand({
      cmd: "/api/v1/getPlugins",
    });
    return Convert.toPlugin(response)
  }

}
