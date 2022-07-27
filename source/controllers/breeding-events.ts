import { Specimen } from "./specimens";
import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';

export interface BreedingEvent {
    date: Date;
    male: Specimen;
    female: Specimen;
    comment: String;
}

const getBreedingEvents = async (req: Request, res: Response, next: NextFunction) => {
    let result: AxiosResponse = await axios.get(`https://mockend.com/mjacobsson/herpmanager-api/breedings`);
    let breedings: [BreedingEvent] = result.data;
    return res.status(200).json({
        message: breedings
    });
};

export default { getBreedingEvents }