import { BaseTheme, SavedTheme} from '.';

export interface BaseThemeDBManager {
    GetBaseThemes(): Promise<BaseTheme[]>;
    GetBaseTheme(themeId: string): Promise<BaseTheme | undefined>;
}

export interface SavedThemeDBManager {
    UpdateSavedTheme(theme: SavedTheme): Promise<void>;
    RemoveSavedTheme(themeId: string): Promise<void>;

    GetSavedThemes(): Promise<SavedTheme[]>;
    GetSavedTheme(themeId: string): Promise<SavedTheme | undefined>;
}