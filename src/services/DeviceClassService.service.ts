import { DeviceClass, DeviceClassDBManager, DeviceClassHeartbeat } from "../types";

export class DeviceClassService {
    readonly prefix = `[DeviceClassService]`;

    constructor(
        private deviceClassDB: DeviceClassDBManager,
        private maxClassDuration: number) { }

    private _observers: ((classes: DeviceClass[]) => void)[] = [];

    async GetActiveDeviceClasses(): Promise<DeviceClassHeartbeat[]> {
        const classes = await this.deviceClassDB.GetDeviceClasses();
        const now = Date.now();

        const activeClasses = classes.filter(c => now - c.lastUpdateTimestamp >= this.maxClassDuration);

        if (classes.length != activeClasses.length) {
            this.RemoveOlderActiveDeviceClasses();
        }

        return activeClasses;
    }

    async UpdateDeviceClassHeartbeat(deviceClass: DeviceClass): Promise<void> {
        const now = Date.now();

        const heartbeat = Object.assign(deviceClass, { lastUpdateTimestamp:  now})
        const existedBefore = await this.deviceClassDB.UpdateDeviceClass(heartbeat);

        if (!existedBefore) {
            this.NotifyObservers();
        }
    }

    async RemoveOlderActiveDeviceClasses(): Promise<void> {
        const classes = await this.deviceClassDB.GetDeviceClasses();
        const now = Date.now();

        const oldClasses = classes.filter(c => now - c.lastUpdateTimestamp < this.maxClassDuration)
            
        this.deviceClassDB.RemoveDeviceClasses(oldClasses);
    }

    async SubscribeToNewDevices(callback: (classes: DeviceClass[]) => void): Promise<void> {
        this._observers.push(callback);
    }

    private async NotifyObservers(): Promise<void> {
        const classes = await this.deviceClassDB.GetDeviceClasses();
        this._observers.forEach(observer => observer(classes));
    }
}

