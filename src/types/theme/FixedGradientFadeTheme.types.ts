import { SavedTheme, BaseTheme, ThemeUIElementType, ThemeUIColorPicker, ExecutableTheme } from '.';
import { DeviceClass } from '../.';

export type FixedGradientSavedThemeMetadata = {
    firstColorHex: string;
    secondColorHex: string;
}

export type FixedGradientSavedTheme = SavedTheme & {
    metadata: FixedGradientSavedThemeMetadata;
}

export const FixedGradientBaseThemeID = 'fixed-gradient';
export const BuildFixedGradientBaseTheme: () => BaseTheme = () => {
    return <BaseTheme>{
        id: FixedGradientBaseThemeID,
        name: 'Fixed Gradient',
        description: 'The simplest gradient you will ever know',
        uiStructure: {
            elements: [
                <ThemeUIColorPicker>{
                    name: 'First Color',
                    metadataName: 'firstColorHex',
                    type: ThemeUIElementType.COLOR,
                }, 
                <ThemeUIColorPicker>{
                    name: 'Second Color',
                    metadataName: 'secondColorHex',
                    type: ThemeUIElementType.COLOR,
                }
            ]
        }
    }
};

export const ProcessSongDataUsingFixedGradientTheme = (theme: FixedGradientSavedTheme, deviceClass: DeviceClass): void /* ProcessedSong */ => {
    return
};

export const SampleFixedGradientExecutableTheme: ExecutableTheme = {
    id: 'Sample',
    baseThemeId: 'fixed-gradient',
    timestamp: Date.now(),
    metadata: {
        firstColorHex: '#ffffff',
        secondColorHex: '#000000', 
    },
    processingFunction: ProcessSongDataUsingFixedGradientTheme
}