import { Request, Response, Router } from "express";
import { ThemeService } from '../services';
import { BaseError, SaveThemeRequest, ActivateSavedThemeRequest, SetActiveThemeRequest } from "../types";
import { v4 as uuidv4 } from 'uuid';

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

    router.post('/save-theme', async (req: Request, res: Response) => {
        console.log(`${prefix} [POST] '/save-theme' called...`);
        try {
            const saveThemeReq = <SaveThemeRequest>req.body;

            const result = await themeSvc.SaveTheme(saveThemeReq);
            
            res.status(200).send(result);
        } catch (error) {
            const baseError = <BaseError>error;
            res.status(baseError.httpCode).send(baseError.formatted);
        }
    })


    router.get('/saved-themes', async (req: Request, res: Response) => {
        console.log(`${prefix} [GET] '/saved-theme' called...`);
        try {
            const themes = await themeSvc.GetAllSavedThemes();
            res.status(200).send(themes);
        } catch (error) {
            const baseError = <BaseError>error;
            res.status(baseError.httpCode).send(baseError.formatted);
        }
    })


    router.delete('/saved-themes/:themeId', async (req: Request, res: Response) => {
        console.log(`${prefix} [DELETE] '/saved-theme' called...`);
        try {
            const id = req.params["themeId"];
            
            const result = await themeSvc.RemoveSavedTheme(id);

            res.status(200).send(result);
        } catch (error) {
            const baseError = <BaseError>error;
            res.status(baseError.httpCode).send(baseError.formatted);
        }
    })
    
    // Sets a theme already saved as active
    router.put('/activate-theme', async (req: Request, res: Response) => {
        console.log(`${prefix} [PUT] '/activate-theme' called...`);
        try {
            const activateThemeReq = <ActivateSavedThemeRequest>req.body;
            const id = activateThemeReq.id;
            
            const result = await themeSvc.ActivateThemeWithID(id);

            res.status(200).send(result);
        } catch (error) {
            const baseError = <BaseError>error;
            res.status(baseError.httpCode).send(baseError.formatted);
        }
    })

    // Sets a theme sent in a parameter as the active theme
    router.put('/set-active-theme', async (req: Request, res: Response) => {
        console.log(`${prefix} [PUT] '/set-active-theme' called...`);
        try {
            const setActiveThemeReq = <SetActiveThemeRequest>req.body;
            const temporaryId = uuidv4();

            const theme = Object.assign(setActiveThemeReq, { id: temporaryId });
            
            const result = await themeSvc.ActivateTheme(theme);

            res.status(200).send(result);
        } catch (error) {
            const baseError = <BaseError>error;
            res.status(baseError.httpCode).send(baseError.formatted);
        }
    })
    
};
