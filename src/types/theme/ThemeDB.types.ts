import { BaseTheme, SavedTheme} from '.';

export interface BaseThemeDBManager {
    GetBaseThemes(): Promise<BaseTheme[]>;
    GetBaseTheme(themeId: string): Promise<BaseTheme | undefined>;
}

export interface SavedThemeDBManager {
    UpdateSavedTheme(theme: SavedTheme): void;
    RemoveSavedTheme(themeId: string): void;

    GetSavedThemes(): Promise<SavedTheme[]>;
}