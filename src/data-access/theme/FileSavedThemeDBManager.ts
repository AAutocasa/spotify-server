import { SavedTheme, SavedThemeDBManager } from '../../types';
import fse from 'fs-extra';


export class FileSavedThemeDBManager implements SavedThemeDBManager {
    readonly prefix = `[FileSavedThemeDBManager]`;

    constructor(private filePath: string) {
        this.ReadDB();
    }

    private _themes: { [themeId: string]: SavedTheme } = {};

    private ReadDB() {
        const prefix = this.prefix

        fse.readJson(this.filePath, (err: any, data: any) => {
            if (err) { 
                console.log(`${prefix} ReadDB error: ${err}. Creating file...!`);
                this.PersistDB();
                console.log(`${prefix} Created file!`);
            }
            this._themes = data || {};
        })
    }

    private PersistDB() {
        const prefix = this.prefix

        fse.writeJson(this.filePath, this._themes, (err: any) => {
            if (err) {
                return console.log(`${prefix} PersistDB error: ${err}`);
            }
        })
    }

    async UpdateSavedTheme(theme: SavedTheme): Promise<void> {
        this._themes[theme.id] = theme;
        this.PersistDB();
    }

    async RemoveSavedTheme(themeId: string): Promise<void> {
        delete this._themes[themeId];
        this.PersistDB();
    }

    GetSavedThemes(): Promise<SavedTheme[]> {
        return new Promise((resolve, reject) => {
            resolve(Object.values(this._themes));
        });
    }

    GetSavedTheme(themeId: string): Promise<SavedTheme | undefined> {
        return new Promise((resolve, reject) => {
            resolve(Object.values(this._themes).find(t => t.id == themeId));
        });
    }
}