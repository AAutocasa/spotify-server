import { SavedTheme, BaseTheme, ThemeUIElementType, ThemeUIColorPicker } from '.';

export type FixedGradientSavedThemeMetadata = {
    firstColorHex: string;
    secondColorHex: string;
}

export type FixedGradientSavedTheme = SavedTheme & {
    metadata: FixedGradientSavedThemeMetadata;
}

export const buildFixedGradientBaseTheme: () => BaseTheme = () => {
    return <BaseTheme>{
        id: 'fixed-gradient',
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

export const processSongDataUsingFixedGradientTheme = (theme: FixedGradientSavedTheme /* variations: DeviceVariation[], data: SongData */): number /* ProcessedSong */ => {

    return 2;
    return 1;
};