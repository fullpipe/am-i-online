export declare class OnlineCheck {
    private onChangeCallbacks;
    private status;
    private intervalTimeout;
    private config;
    constructor(config?: Config);
    onChange(callback: StatusChangeCallback): Promise<void>;
    isOnline(): Promise<boolean>;
    private doCheck;
    private initIntervalChecks;
}
declare type StatusChangeCallback = (isOnline: boolean) => void;
interface Config {
    interval?: number;
    url?: string;
    timeout?: number;
}
export {};
