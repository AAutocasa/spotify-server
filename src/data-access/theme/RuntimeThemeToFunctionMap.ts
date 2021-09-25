import { FixedGradientBaseThemeID, ProcessSongDataUsingFixedGradientTheme, ThemeProcessingFunction, ThemeToFunctionMap } from "../../types";

export class RuntimeThemeToFunctionMap implements ThemeToFunctionMap {

    private _map: { [themeId: string]: ThemeProcessingFunction } = {};

    constructor() {
        this._map[FixedGradientBaseThemeID] = ProcessSongDataUsingFixedGradientTheme;
    }

    GetFunctionForTheme(baseThemeId: string): ThemeProcessingFunction | undefined {
        return this._map[baseThemeId];
    }
}