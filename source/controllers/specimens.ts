import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';

export interface Specimen {
    id: Number;
    scientificName: String;
    commonName: String;
    sex: String;
    birthDate: String;
    sire: Specimen;
    dam: Specimen;
}

const getSpecimens = async (req: Request, res: Response, next: NextFunction) => {
    let result: AxiosResponse = await axios.get(`https://mockend.com/mjacobsson/herpmanager-api/specimens`);
    let specimens: [Specimen] = result.data;
    return res.status(200).json({
        message: specimens
    });
};

const getSpecimen = async (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.params.id;
    let result: AxiosResponse = await axios.get(`https://mockend.com/mjacobsson/herpmanager-api/specimens/${id}`);
    let specimen: Specimen = result.data;
    return res.status(200).json({
        message: specimen
    });
};

const updateSpecimen = async (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.params.id;
    let scientificName: string = req.body.scientificName ?? null;
    let commonName: string = req.body.commonName ?? null;
    let response: AxiosResponse = await axios.put(`https://mockend.com/mjacobsson/herpmanager-api/specimens/${id}`, {
        ...(scientificName && { scientificName }),
        ...(commonName && { commonName })
    });
    return res.status(200).json({
        message: response.data
    });
};

const deleteSpecimen = async (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.params.id;
    let response: AxiosResponse = await axios.delete(`https://mockend.com/mjacobsson/herpmanager-api/specimens/${id}`);
    return res.status(200).json({
        message: 'post deleted successfully'
    });
};

const addSpecimen = async (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.body.id;
    let scientificName: string = req.body.scientificName;
    let commonName: string = req.body.commonName
    let response: AxiosResponse = await axios.post(`https://mockend.com/mjacobsson/herpmanager-api/specimens`, {
        id,
        scientificName,
        commonName
    });
    return res.status(200).json({
        message: response.data
    });
};

export default { getSpecimens, getSpecimen, updateSpecimen, deleteSpecimen, addSpecimen };
