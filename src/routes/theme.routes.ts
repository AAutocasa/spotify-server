import { Request, Response, Router } from "express";
import { ThemeService } from '../services/ThemeService.service';
import { BaseError } from "../types";

export const ThemeRouter = (router: Router, themeSvc: ThemeService): void => {
    const prefix = `[ThemeRouter]`;

    router.get('/themes', async (req: Request, res: Response) => {
        console.log(`${prefix} [GET] '/themes' called...`);
        try {
            const themes = await themeSvc.GetAllBaseThemes(); 
            
            res.status(200).send(themes);
        } catch (error) {
            const baseError = <BaseError>error;
            res.status(baseError.httpCode).send(baseError.formatted);
        }
    })
};
