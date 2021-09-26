

export type LEDState = {
    i: number;
    h: number;
    s: number;
    v: number;
};

export type DeviceStateFrame = {
    minimumTimestamp: number;
    full: boolean;
    leds: LEDState;
}

export type ProcessedSongDeviceState = {
    deviceClassKey: string;
    savedThemeId: string;
    frames: DeviceStateFrame[];
}