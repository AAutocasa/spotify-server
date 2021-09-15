import { BaseThemeDBManager, SavedThemeDBManager } from "../types";

export class ThemeService {
    readonly prefix = `[ThemeService]`;

    constructor(
        private savedThemeDB: SavedThemeDBManager,
        private baseThemeDB: BaseThemeDBManager) { }
}