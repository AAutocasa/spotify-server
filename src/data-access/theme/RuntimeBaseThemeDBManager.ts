import { BaseTheme, BaseThemeDBManager } from '../../types';

export class RuntimeThemeDBManager implements BaseThemeDBManager {
    readonly prefix = `[RuntimeThemeDBManager]`;

    private _themes: { [themeId: string]: BaseTheme } = {};

    GetBaseThemes(): Promise<BaseTheme[]> {
        return new Promise((resolve, reject) => {
            const themes = Object.values(this._themes);
            resolve(themes);
        });     
    }

    GetBaseTheme(themeId: string): Promise<BaseTheme | undefined> {
        return new Promise((resolve, reject) => {
            const theme = this._themes[themeId];
            resolve(theme);
        });     
    }

}