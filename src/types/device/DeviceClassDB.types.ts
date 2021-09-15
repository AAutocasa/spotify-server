import { DeviceClass, DeviceClassHeartbeat } from './';

export interface DeviceClassDBManager {
    UpdateDeviceClass(DeviceClassHeartbeat: DeviceClassHeartbeat): void;
    RemoveDeviceClasses(deviceClasses: DeviceClass[]): void;

    GetDeviceClasses(): Promise<DeviceClassHeartbeat[]>;
}