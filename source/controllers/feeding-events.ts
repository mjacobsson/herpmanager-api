import { Request, Response } from 'express';
import { Schema, model } from 'mongoose';

export interface IFeedingEvent {
  specimen: string;
  date: Date;
  item: string;
  quantity: number;
  comment: string;
}

const feedingEventSchema = new Schema<IFeedingEvent>({
  specimen: { type: String, required: true },
  date: { type: Date, required: true },
  item: { type: String, required: true },
  quantity: { type: Number, required: true },
  comment: { type: String, required: false }
});

const feedingEvent = model<IFeedingEvent>('FeedingEvent', feedingEventSchema);

const addFeedingEvent = async (req: Request, res: Response) => {
  const specimen: string = req.params.specimen;
  const date: Date = req.body.date;
  const comment: string = req.body.comment;
  const item: string = req.body.item;
  const quantity: number = req.body.quantity;

  try {
    const existingEvent = await feedingEvent.findOne({
      specimen: specimen,
      date: date,
      comment: comment,
      item: item,
      quantity: quantity
    });
    if (existingEvent) {
      return res.status(403).json('duplicate feeding event');
    }
    const result = await feedingEvent.create({
      specimen,
      date,
      comment,
      item,
      quantity
    });
    return res.status(200).json(result);
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
};

const getFeedings = async (req: Request, res: Response) => {
  const specimen = req.params.specimen;
  const result = await feedingEvent.find(
    { specimen: specimen },
    { _id: 0, __v: 0 }
  );
  return res.status(result.length != 0 ? 200 : 404).json(result);
};

const updateFeedingEvent = async (req: Request, res: Response) => {
  const specimen: string = req.params.specimen;
  const date: string = req.body.date;
  const item: string = req.body.item;
  const quantity: number = req.body.quantity;
  const comment: string = req.body.comment;

  const result = await feedingEvent.updateOne({
    specimen: specimen,
    date: date,
    item: item,
    quantity: quantity,
    comment: comment
  });
  return res.status(200).json(result);
};

const deleteFeedingEvent = async (req: Request, res: Response) => {
  const specimen: string = req.params.specimen;
  const date: string = req.body.date;
  const { acknowledged, deletedCount } = await feedingEvent.deleteOne({
    specimen: specimen,
    date: date
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
  getFeedings,
  updateFeedingEvent,
  deleteFeedingEvent
};
