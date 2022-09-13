import { Request, Response } from 'express';
import { Schema, model } from 'mongoose';

export interface ISpecimen {
  id: string;
  scientificName: string;
  commonName: string;
  sex: string;
  birthDate: Date;
  sire: string;
  dam: string;
}

const specimenSchema = new Schema<ISpecimen>({
  id: { type: String, required: true, unique: true },
  scientificName: { type: String, required: true },
  commonName: { type: String, rquired: true },
  sex: { type: String, required: true },
  birthDate: { type: Date, required: false },
  sire: { type: String, required: false },
  dam: { type: String, required: false }
});

export const specimen = model<ISpecimen>('Specimen', specimenSchema);

const addSpecimen = async (req: Request, res: Response) => {
  const id: string = req.body.id;
  const scientificName: string = req.body.scientificName;
  const commonName: string = req.body.commonName;
  const sex: string = req.body.sex;
  const birthDate: Date = req.body.birthDate;
  const sire: string = req.body.sire;
  const dam: string = req.body.dam;

  try {
    const result = await specimen.create({
      id,
      scientificName,
      commonName,
      sex,
      birthDate,
      sire,
      dam
    });
    return res.status(200).json(result);
  } catch (e: any) {
    if (e.code == 11000) {
      return res.status(403).json(e.message);
    } else {
      return res.status(500).json(e.message);
    }
  }
};

const getSpecimens = async (req: Request, res: Response) => {
  const result = await specimen.find({}, { _id: 0, __v: 0 });
  return res.status(result.length != 0 ? 200 : 404).json(result);
};

const getSpecimen = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const result = await specimen.findOne({ id: id }, { _id: 0, __v: 0 });
  return res.status(result ? 200 : 404).json(result);
};

const updateSpecimen = async (req: Request, res: Response) => {
  const updatedSpecimen = {
    id: req.params.id,
    scientificName: req.body.scientificName,
    commonName: req.body.commonName,
    sex: req.body.sex,
    birthDate: req.body.birthDate,
    sire: req.body.sire,
    dam: req.body.dam
  };

  const response = await specimen.updateOne(updatedSpecimen, {
    omitUndefined: true
  });
  return res.status(200).json(response);
};

const deleteSpecimen = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const { acknowledged, deletedCount } = await specimen.deleteOne({ id: id });

  if (acknowledged) {
    if (deletedCount == 1) {
      return res.status(200).json('specimen deleted successfully');
    } else if (deletedCount == 0) {
      return res.status(404).json('specimen not found');
    } else {
      return res
        .status(500)
        .json('something unexpected happend while trying to delete');
    }
  }
  return res.status(500).json('Something went wrong');
};

export default {
  addSpecimen,
  getSpecimens,
  getSpecimen,
  updateSpecimen,
  deleteSpecimen
};
