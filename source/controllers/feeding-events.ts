import { Request, Response, NextFunction } from 'express';
import { Schema, model } from 'mongoose';

export interface IFeedingEvent {
  id: number;
  date: Date;
  comment: string;
}

const feedingEventSchema = new Schema<IFeedingEvent>({
  id: { type: Number, required: true, unique: true },
  date: { type: Date, required: true },
  comment: { type: String, required: true }
});

const feedingEvent = model<IFeedingEvent>('FeedingEvent', feedingEventSchema);

const addFeedingEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: number = req.body.id;
  const date: Date = req.body.date;
  const comment: string = req.body.comment;

  try {
    const result = await feedingEvent.create({
      id,
      date,
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

const getFeedingEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await feedingEvent.find();
  return res.status(result.length != 0 ? 200 : 404).json(result);
};

const getFeedingEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: string = req.params.id;
  const result = await feedingEvent.findOne({ id: id });
  return res.status(result ? 200 : 404).json(result);
};

const updateFeedingEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: string = req.params.id;
  const date: string = req.body.date;

  const result = await feedingEvent.updateOne({
    id: id,
    date: date
  });
  return res.status(200).json(result);
};

const deleteFeedingEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: string = req.params.id;
  const { acknowledged, deletedCount } = await feedingEvent.deleteOne({
    id: id
  });

  if (acknowledged) {
    if (deletedCount == 1) {
      return res.status(200).json('Feeding event deleted successfully');
    } else if (deletedCount == 0) {
      return res.status(404).json('Feeding event not found');
    } else {
      return res
        .status(500)
        .json('something unexpected happend while trying to delete');
    }
  }
  return res.status(500).json('Something went wrong');
};

export default {
  addFeedingEvent,
  getFeedingEvents,
  getFeedingEvent,
  updateFeedingEvent,
  deleteFeedingEvent
};
