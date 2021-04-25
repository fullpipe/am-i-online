"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnlineCheck = void 0;
class OnlineCheck {
    constructor(config) {
        this.onChangeCallbacks = [];
        this.status = null;
        this.intervalTimeout = null;
        config = config || ConfigDefaults;
        this.config = { ...ConfigDefaults, ...config };
    }
    async onChange(callback) {
        await this.doCheck();
        this.onChangeCallbacks.push(callback);
        callback(this.status);
        if (!this.intervalTimeout) {
            this.initIntervalChecks();
        }
    }
    async isOnline() {
        try {
            const response = await timeout(this.config.timeout, fetch(`${this.config.url}?d=${Date.now()}`));
            console.log(response);
            if (!response.ok) {
                return false;
            }
            return true;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }
    async doCheck() {
        const newStatus = await this.isOnline();
        if (newStatus === this.status) {
            return;
        }
        this.status = newStatus;
        this.onChangeCallbacks.forEach(cb => cb(this.status));
    }
    initIntervalChecks() {
        this.intervalTimeout = window.setInterval(() => this.doCheck(), this.config.interval);
    }
}
exports.OnlineCheck = OnlineCheck;
const ConfigDefaults = {
    interval: 10,
    url: 'https://cdn.jsdelivr.net/gh/fullpipe/am-i-online@main/1x1.png',
    timeout: 5000,
};
function timeout(ms, promise) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error('TIMEOUT'));
        }, ms);
        promise
            .then((value) => {
            clearTimeout(timer);
            resolve(value);
        })
            .catch(reason => {
            clearTimeout(timer);
            reject(reason);
        });
    });
}
//# sourceMappingURL=index.js.map