import { DeviceClass, DeviceClassDBManager, DeviceClassHeartbeat } from "../types";

export class DeviceClassService {
    readonly prefix = `[DeviceClassService]`;

    constructor(
        private deviceClassDB: DeviceClassDBManager,
        private maxClassDuration: number) { }

    async GetActiveDeviceClasses(): Promise<DeviceClassHeartbeat[]> {
        const classes = await this.deviceClassDB.GetDeviceClasses();
        const now = Date.now();

        const activeClasses = classes.filter(c => now - c.lastUpdateTimestamp >= this.maxClassDuration);

        if (classes.length != activeClasses.length) {
            this.RemoveOlderActiveDeviceClasses();
        }

        return activeClasses;
    }

    UpdateDeviceClassHeartbeat(deviceClass: DeviceClass): void {
        const now = Date.now();

        const heartbeat = Object.assign(deviceClass, { lastUpdateTimestamp:  now})
        this.deviceClassDB.UpdateDeviceClass(heartbeat);
    }

    async RemoveOlderActiveDeviceClasses(): Promise<void> {
        const classes = await this.deviceClassDB.GetDeviceClasses();
        const now = Date.now();

        const oldClasses = classes.filter(c => now - c.lastUpdateTimestamp < this.maxClassDuration)
            
        this.deviceClassDB.RemoveDeviceClasses(oldClasses);
    }
}