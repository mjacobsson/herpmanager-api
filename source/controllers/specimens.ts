import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';

interface Post {
    userId: Number;
    id: Number;
    title: String;
    body: String;
}

const getSpecimens = async (req: Request, res: Response, next: NextFunction) => {
    let result: AxiosResponse = await axios.get(`https://mockend.com/mjacobsson/herpmanager-api/specimens`);
    let posts: [Post] = result.data;
    return res.status(200).json({
        message: posts
    });
};

const getSpecimen = async (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.params.id;
    let result: AxiosResponse = await axios.get(`https://mockend.com/mjacobsson/herpmanager-api/specimens/${id}`);
    let post: Post = result.data;
    return res.status(200).json({
        message: post
    });
};

const updateSpecimen = async (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.params.id;
    let title: string = req.body.title ?? null;
    let body: string = req.body.body ?? null;
    let response: AxiosResponse = await axios.put(`https://mockend.com/mjacobsson/herpmanager-api/specimens/${id}`, {
        ...(title && { title }),
        ...(body && { body })
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
    let title: string = req.body.title;
    let body: string = req.body.body;
    let response: AxiosResponse = await axios.post(`https://mockend.com/mjacobsson/herpmanager-api/specimens`, {
        title,
        body
    });
    return res.status(200).json({
        message: response.data
    });
};

export default { getSpecimens, getSpecimen, updateSpecimen, deleteSpecimen, addSpecimen };
