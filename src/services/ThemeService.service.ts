import { SavedTheme, BaseThemeDBManager, SavedThemeDBManager, BaseTheme } from "../types";

export class ThemeService {
    readonly prefix = `[ThemeService]`;

    constructor(
        private savedThemeDB: SavedThemeDBManager,
        private baseThemeDB: BaseThemeDBManager) { }
    
    private _observers: ((theme: SavedTheme) => void)[] = [];

    async GetAllBaseThemes(): Promise<BaseTheme[]> {
        const themes = await this.baseThemeDB.GetBaseThemes();
        return themes;
    } 

    async SubscribeToNewActiveTheme(callback: (theme: SavedTheme) => void): Promise<void> {
        this._observers.push(callback);
    }

    private async NotifyObservers(activeTheme: SavedTheme): Promise<void> {
        this._observers.forEach(observer => observer(activeTheme));
    }
}