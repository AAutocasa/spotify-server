import { DeviceClass, DeviceClassDBManager, DeviceClassHeartbeat } from "../types";
import fse from 'fs-extra';
import path from 'path';

export class FileDeviceClassDBManager implements DeviceClassDBManager {
    readonly prefix = `[FileDeviceClassDBManager]`;

    constructor(private filePath: string) {
        const dirname = path.dirname(filePath);
        if (!fse.existsSync(dirname)){
            fse.mkdirSync(dirname, { recursive: true });
        }

        this.ReadDB();
    }

    private _deviceClassHeartbeats: { [key: string]: DeviceClassHeartbeat } = {};

    private ReadDB() {
        const prefix = this.prefix

        fse.readJson(this.filePath, (err: any, data: any) => {
            if (err) { 
                console.log(`${prefix} ReadDB error: ${err}. Creating file...!`);
                this.PersistDB();
                console.log(`${prefix} Created file!`);
            }
            this._deviceClassHeartbeats = data || {};
        })
    }

    private PersistDB() {
        const prefix = this.prefix

        fse.writeJson(this.filePath, this._deviceClassHeartbeats, (err: any) => {
            if (err) {
                return console.log(`${prefix} PersistDB error: ${err}`);
            }
        })
    }

    private DeviceClassToKey(deviceClass: DeviceClass) {
        return `${deviceClass.roleCode}-${deviceClass.ledCount}`;
    }

    UpdateDeviceClass(deviceClassHeartbeat: DeviceClassHeartbeat): boolean {
        const key = this.DeviceClassToKey(deviceClassHeartbeat);

        const previousClass = this._deviceClassHeartbeats[key];

        this._deviceClassHeartbeats[key] = deviceClassHeartbeat;
        this.PersistDB();

        return !!previousClass;
    }

    RemoveDeviceClasses(deviceClasses: DeviceClass[]): void {
        deviceClasses.forEach(d => delete this._deviceClassHeartbeats[this.DeviceClassToKey(d)]);
        this.PersistDB();
    }

    GetDeviceClasses(): Promise<DeviceClassHeartbeat[]> {
        return new Promise((resolve, reject) => {
            resolve(Object.values(this._deviceClassHeartbeats));
        });
    }
}