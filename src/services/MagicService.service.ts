import { SavedTheme } from "../types";
import { DeviceClassService } from "./";
import { ThemeService } from './ThemeService.service';

export class MagicService {
    readonly prefix = `[MagicService]`;

    constructor(private defaultTheme: SavedTheme,
        private deviceClassSvc: DeviceClassService,
        private themeSvc: ThemeService) {
        // TODO: Start a background thread to send stuff to the MQTT every X seconds

        // Subscribe to the DeviceClassService to get updates on new active themes
        deviceClassSvc.SubscribeToNewDevices(classes => {
            // Do something with the classes
        })

        // Subscribe to the ThemeService to get updates on new active themes
        themeSvc.SubscribeToNewActiveTheme(activeTheme => {
            this.SetActiveTheme(activeTheme);
        })
    }

    // TODO: Something to store the processed segments by active device channel
    private _activeTheme?: SavedTheme;

    private get activeTheme() {
        return this._activeTheme || this.defaultTheme;
    }

    SetActiveTheme(savedTheme: SavedTheme): void {
        this._activeTheme = savedTheme;

        // TODO: Use song + savedTheme data to process it
    }
}