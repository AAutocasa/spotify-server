import { SavedTheme, BaseThemeDBManager, SavedThemeDBManager, BaseTheme, SaveThemeRequest, ThemeToFunctionMap, ExecutableTheme } from "../types";
import { v4 as uuidv4 } from 'uuid';

export class ThemeService {
    readonly prefix = `[ThemeService]`;

    constructor(
        private savedThemeDB: SavedThemeDBManager,
        private baseThemeDB: BaseThemeDBManager,
        private themeToFunctionMap: ThemeToFunctionMap) { }
    
    private _observers: ((theme: ExecutableTheme) => void)[] = [];

    async GetAllBaseThemes(): Promise<BaseTheme[]> {
        const themes = await this.baseThemeDB.GetBaseThemes();
        return themes;
    } 

    async SaveTheme(theme: SaveThemeRequest): Promise<boolean> {
        const id = uuidv4();
        const themeWithID = Object.assign(theme, { id: id });

        await this.savedThemeDB.UpdateSavedTheme(themeWithID);

        return true;
    } 

    async GetAllSavedThemes(): Promise<SavedTheme[]> {
        const themes = await this.savedThemeDB.GetSavedThemes();
        return themes;
    } 

    async RemoveSavedTheme(themeId: string): Promise<boolean> {
        await this.savedThemeDB.RemoveSavedTheme(themeId);
        return true;
    } 

    async ActivateThemeWithID(themeId: string): Promise<boolean> {
        const theme = await this.savedThemeDB.GetSavedTheme(themeId);
        if (theme) {
            return this.ActivateTheme(theme);
        }
        return false;
    }

    async ActivateTheme(savedTheme: SavedTheme): Promise<boolean> {
        const processingFunction = this.themeToFunctionMap.GetFunctionForTheme(savedTheme.baseThemeId);

        if (!processingFunction) {
            return false;
        }

        const executableTheme = Object.assign(savedTheme, { processingFunction });
        this.NotifyObservers(executableTheme);

        return true;
    }

    async SubscribeToNewActiveTheme(callback: (theme: ExecutableTheme) => void): Promise<void> {
        this._observers.push(callback);
    }

    private async NotifyObservers(activeTheme: ExecutableTheme): Promise<void> {
        this._observers.forEach(observer => observer(activeTheme));
    }
}