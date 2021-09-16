import { DeviceClass, DeviceClassHeartbeat } from './';

export interface DeviceClassDBManager {
    UpdateDeviceClass(deviceClassHeartbeat: DeviceClassHeartbeat): void;
    RemoveDeviceClasses(deviceClasses: DeviceClass[]): void;

    GetDeviceClasses(): Promise<DeviceClassHeartbeat[]>;
}