export class OnlineCheck {
  private onChangeCallbacks: StatusChangeCallback[] = [];
  private status: boolean | null = null;
  private intervalTimeout: number | null = null;
  private config: Config;

  constructor(config?: Config) {
    config = config || ConfigDefaults;

    this.config = { ...ConfigDefaults, ...config };
  }

  async onChange(callback: StatusChangeCallback) {
    await this.doCheck();
    this.onChangeCallbacks.push(callback);
    callback(this.status as boolean);

    if (!this.intervalTimeout) {
      this.initIntervalChecks();
    }
  }

  async isOnline(): Promise<boolean> {
    try {
      const response = await timeout<Response>(
        this.config.timeout!,
        fetch(`${this.config.url}?d=${Date.now()}`)
      );

      console.log(response);

      if (!response.ok) {
        return false;
      }

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  private async doCheck() {
    const newStatus = await this.isOnline();

    if (newStatus === this.status) {
      return;
    }

    this.status = newStatus;
    this.onChangeCallbacks.forEach(cb => cb(this.status as boolean));
  }

  private initIntervalChecks() {
    this.intervalTimeout = window.setInterval(
      () => this.doCheck(),
      this.config.interval
    );
  }
}

type StatusChangeCallback = (isOnline: boolean) => void;

interface Config {
  interval?: number;
  url?: string;
  timeout?: number;
}

const ConfigDefaults: Config = {
  interval: 10,
  url: 'https://cdn.jsdelivr.net/gh/fullpipe/am-i-online@main/1x1.png',
  timeout: 5000,
};

function timeout<T>(ms: number, promise: Promise<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('TIMEOUT'));
    }, ms);

    promise
      .then((value: T) => {
        clearTimeout(timer);
        resolve(value);
      })
      .catch(reason => {
        clearTimeout(timer);
        reject(reason);
      });
  });
}
