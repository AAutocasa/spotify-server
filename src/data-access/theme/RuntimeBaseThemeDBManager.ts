import { BaseTheme, BaseThemeDBManager } from '../../types';

export class RuntimeThemeDBManager implements BaseThemeDBManager {
    readonly prefix = `[RuntimeThemeDBManager]`;

    private _themes: { [themeId: string]: { theme: BaseTheme } } = {};

    GetBaseThemes(): Promise<BaseTheme[]> {
        return new Promise((resolve, reject) => {
            const themes = Object.values(this._themes).map(t => t.theme);
            resolve(themes);
        });     
    }

    GetBaseTheme(themeId: string): Promise<BaseTheme | undefined> {
        return new Promise((resolve, reject) => {
            const theme = this._themes[themeId]?.theme;
            resolve(theme);
        });     
    }

}