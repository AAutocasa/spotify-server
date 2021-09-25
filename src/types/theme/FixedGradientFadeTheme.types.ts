import { SavedTheme, BaseTheme, ThemeUIElementType, ThemeUIColorPicker } from '.';

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

export const ProcessSongDataUsingFixedGradientTheme = (theme: FixedGradientSavedTheme /* variations: DeviceVariation[], data: SongData */): void /* ProcessedSong */ => {
    return
};