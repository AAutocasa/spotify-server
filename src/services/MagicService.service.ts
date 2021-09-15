import { SavedTheme } from "../types";

export class MagicService {
    readonly prefix = `[MagicService]`;

    // TODO: Something to store the processed segments by active device channel
    private _activeTheme?: SavedTheme;

    private get activeTheme() {
        return this._activeTheme || this.defaultTheme;
    }

    constructor(private defaultTheme: SavedTheme) {
        // TODO: Start a background thread to send stuff to the MQTT every X seconds
    }

    SetActiveTheme(savedTheme: SavedTheme): void {
        this._activeTheme = savedTheme;

        // TODO: Use song + savedTheme data to process it
    }
}