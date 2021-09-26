import { ExecutableTheme, SavedTheme } from "../types";
import { DeviceClassService } from "./";
import { ThemeService } from './ThemeService.service';

export class MagicService {
    readonly prefix = `[MagicService]`;

    constructor(private defaultTheme: ExecutableTheme,
        private deviceClassSvc: DeviceClassService,
        private themeSvc: ThemeService) {
        // TODO: Start a background thread to send stuff to the MQTT every X seconds

        // Subscribe to the DeviceClassService to get updates on new active themes
        deviceClassSvc.SubscribeToNewDevices(classes => {
            console.log(`${this.prefix} [SubscribeToNewDevices] Device updated with classes: `, classes);
            // Do something with the classes
        })

        // Subscribe to the ThemeService to get updates on new active themes
        themeSvc.SubscribeToNewActiveTheme(activeTheme => {
            console.log(`${this.prefix} [SubscribeToNewActiveTheme] New active theme: `, activeTheme);
            this.SetActiveTheme(activeTheme);
        })
    }

    // TODO: Something to store the processed segments by active device channel
    private _activeTheme?: SavedTheme;

    private get activeTheme() {
        return this._activeTheme || this.defaultTheme;
    }

    SetActiveTheme(executableTheme: ExecutableTheme): void {
        this._activeTheme = executableTheme;

        // TODO: Use song + savedTheme data to process it
    }
}