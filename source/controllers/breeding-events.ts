import { Request, Response } from 'express';
import { Schema, model } from 'mongoose';
import { specimen } from './specimens';

export interface IBreedingEvent {
  id: number;
  date: Date;
  male: string;
  female: string;
  comment: string;
}

const breedingEventSchema = new Schema<IBreedingEvent>({
  id: { type: Number, required: true, unique: true },
  date: { type: Date, required: true },
  male: { type: String, required: false },
  female: { type: String, required: false },
  comment: { type: String, required: true }
});

const breedingEvent = model<IBreedingEvent>(
  'BreedingEvent',
  breedingEventSchema
);

const addBreedingEvent = async (req: Request, res: Response) => {
  const id: number = req.body.id;
  const date: Date = req.body.date;
  const male: string = req.body.male;
  const female: string = req.body.female;
  const comment: string = req.body.comment;

  try {
    const maleSpecimen = await specimenExists(male);
    const femaleSpecimen = await specimenExists(female);
    if (male && !maleSpecimen) {
      return res
        .status(400)
        .json(`non-existent male specimen: ${maleSpecimen}`);
    }
    if (female && !femaleSpecimen) {
      return res
        .status(400)
        .json(`non-existent female specimen: ${femaleSpecimen}`);
    }
    const result = await breedingEvent.create({
      id,
      date,
      male,
      female,
      comment
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

const getBreedingEvents = async (req: Request, res: Response) => {
  const result = await breedingEvent.find();
  return res.status(result.length != 0 ? 200 : 404).json(result);
};

const getBreedingEvent = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const result = await breedingEvent.findOne({ id: id });
  return res.status(result ? 200 : 404).json(result);
};

const updateBreedingEvent = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const date: string = req.body.date;
  const male: string = req.body.male;
  const female: string = req.body.female;
  const comment: string = req.body.comment;

  const result = await breedingEvent.updateOne({
    id: id,
    date: date,
    male: male,
    female: female,
    comment: comment
  });
  return res.status(200).json(result);
};

const deleteBreedingEvent = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const { acknowledged, deletedCount } = await breedingEvent.deleteOne({
    id: id
  });

  if (acknowledged) {
    if (deletedCount == 1) {
      return res.status(200).json('breeding event deleted successfully');
    } else if (deletedCount == 0) {
      return res.status(404).json('breeding event not found');
    } else {
      return res
        .status(500)
        .json('something unexpected happend while trying to delete');
    }
  }
  return res.status(500).json('Something went wrong');
};

const specimenExists = async (id: string): Promise<boolean> => {
  return (await specimen.findOne({ id: id })) != null;
};

export default {
  addBreedingEvent,
  getBreedingEvents,
  getBreedingEvent,
  updateBreedingEvent,
  deleteBreedingEvent
};
