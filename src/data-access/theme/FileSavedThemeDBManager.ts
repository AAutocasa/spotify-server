import { SavedTheme, SavedThemeDBManager } from '../../types';
import fse from 'fs-extra';


export class FileSavedThemeDBManager implements SavedThemeDBManager {
    readonly prefix = `[FileSavedThemeDBManager]`;

    constructor(filePath: string) {
        this._filePath = filePath;
        this.ReadDB(filePath);
    }

    private _filePath: string
    private _themes: { [themeId: string]: { theme: SavedTheme } } = {};

    private ReadDB(filePath: string) {
        const prefix = this.prefix

        fse.readJson(filePath, (err: any, data: any) => {
            if (err) { 
                console.log(`${prefix} ReadDB error: ${err}. Creating file...!`);
                this.PersistDB(filePath);
                console.log(`${prefix} Created file!`);
            }
            this._themes = data || {};
        })
    }

    private PersistDB(filePath: string) {
        const prefix = this.prefix

        fse.writeJson(filePath, this._themes, (err: any) => {
            if (err) {
                return console.log(`${prefix} PersistDB error: ${err}`);
            }
        })
    }

    UpdateSavedTheme(theme: SavedTheme): void {
        this._themes[theme.id] = { theme };
        this.PersistDB(this._filePath);
    }

    RemoveSavedTheme(themeId: string): void {
        delete this._themes[themeId];
        this.PersistDB(this._filePath);
    }

    GetSavedThemes(): Promise<SavedTheme[]> {
        return new Promise((resolve, reject) => {
            resolve(Object.values(this._themes).map(t => t.theme));
        });
    }
}