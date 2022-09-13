import { Request, Response } from 'express';
import { Schema, model } from 'mongoose';
import { specimen } from './specimens';

export interface IBreedingEvent {
  individual: string;
  date: Date;
  mate: string;
  comment: string;
}

const breedingEventSchema = new Schema<IBreedingEvent>({
  individual: { type: String, required: true },
  date: { type: Date, required: true },
  mate: { type: String, required: false },
  comment: { type: String, required: true }
});

const breedingEvent = model<IBreedingEvent>(
  'BreedingEvent',
  breedingEventSchema
);

const addBreedingEvent = async (req: Request, res: Response) => {
  const id: string = req.params.id as string;
  const date: Date = req.body.date;
  const mate: string = req.body.mate;
  const comment: string = req.body.comment;

  try {
    if (id === mate) {
      return res.status(400).json({
        error: `the mate can not be the specimen itself (mate: ${mate} specimen: ${id})`
      });
    }
    if (mate && !(await specimenExists(mate))) {
      return res.status(400).json({ error: `non-existent mate: ${mate}` });
    }

    const result = await breedingEvent.create({
      individual: id,
      date: date,
      mate: mate,
      comment: comment
    });
    return res.status(200).json(result);
  } catch (e: any) {
    if (e.code == 11000) {
      return res
        .status(403)
        .json({ error: 'could not add breeding event', message: e.message });
    } else {
      return res.status(500).json(e.message);
    }
  }
};

const getBreedingEvents = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const result = await breedingEvent.find({ specimen: id }, { _id: 0, __v: 0 });
  return res.status(result.length != 0 ? 200 : 404).json(result);
};

const updateBreedingEvent = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const date: string = req.body.date;
  const mate: string = req.body.mate;
  const comment: string = req.body.comment;

  const result = await breedingEvent.updateOne({
    specimen: id,
    date: date,
    mate: mate,
    comment: comment
  });
  return res.status(200).json(result);
};

const deleteBreedingEvent = async (req: Request, res: Response) => {
  return res.status(500).json('Not implemented');
};

const specimenExists = async (id: string): Promise<boolean> => {
  return (await specimen.findOne({ id: id })) != null;
};

export default {
  addBreedingEvent,
  getBreedingEvents,
  updateBreedingEvent,
  deleteBreedingEvent
};
