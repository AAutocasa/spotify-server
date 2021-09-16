import { DeviceClass, DeviceClassHeartbeat } from './';

export interface DeviceClassDBManager {
    UpdateDeviceClass(deviceClassHeartbeat: DeviceClassHeartbeat): boolean;
    RemoveDeviceClasses(deviceClasses: DeviceClass[]): void;

    GetDeviceClasses(): Promise<DeviceClassHeartbeat[]>;
}