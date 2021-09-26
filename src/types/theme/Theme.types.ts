import { DeviceClass } from "..";

// Information regarding a theme 
export enum ThemeUIElementType {
    NUMBER = 0,
    COLOR = 1
}

export type ThemeUIElement = {
    name?: string;
    metadataName: string;
    type: ThemeUIElementType;
};

export type ThemeUINumber = ThemeUIElement;
export type ThemeUIColorPicker = ThemeUIElement;

export type ThemeUIStructure = {
    elements: ThemeUIElement[];
};

export type BaseTheme = {
    id: string;
    name: string; 
    description: string;

    uiStructure?: ThemeUIStructure;
};

export type SavedTheme = {
    id: string;
    baseThemeId: string;
    timestamp: number; // UTC, ms

    metadata?: any;
};

export type ThemeProcessingFunction = (theme: any, deviceClass: DeviceClass) => void;

export type ExecutableTheme = SavedTheme & {
    processingFunction: ThemeProcessingFunction;
};