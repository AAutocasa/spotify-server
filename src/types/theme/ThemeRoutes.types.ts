import { SavedTheme } from ".";

export type SaveThemeRequest = Pick<SavedTheme, 'baseThemeId' | 'timestamp' | 'metadata'>;
export type DeleteThemeRequest = Pick<SavedTheme, 'id'>;

export type ActivateSavedThemeRequest = Pick<SavedTheme, 'id'>;

export type SetActiveThemeRequest = Pick<SavedTheme, 'baseThemeId' | 'timestamp' | 'metadata'>;