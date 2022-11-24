/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

const addFeedingEvent = async (req: Request, res: Response) => {
  const f = await prisma.specimen.update({
    where: { id: req.params.specimen },
    data: {
      feedingEvents: {
        create: {
          quantity: +req.body.quantity,
          item: req.body.item,
          date: req.body.date ? new Date(req.body.date) : new Date(),
          comment: req.body.comment
        }
      }
    }
  });
  return res.status(200).json(f);
};

const getFeedingEvents = async (req: Request, res: Response) => {
  const f = await prisma.feedingEvent.findMany({
    where: { specimenId: req.params.specimen }
  });
  return res.status(200).json(f);
};

const updateFeedingEvent = async (req: Request, res: Response) => {
  //TODO: check req.params.specimen too!
  const f = await prisma.feedingEvent.update({
    where: { id: req.params.id },
    data: {
      quantity: req.body.quantity,
      item: req.body.item,
      date: new Date(req.body.date),
      comment: req.body.comment
    }
  });
  return res.status(200).json(f);
};

const deleteFeedingEvent = async (req: Request, res: Response) => {
  //TODO: check req.params.specimen too!
  try {
    const f = await prisma.feedingEvent.delete({ where: { id: req.body.id } });
    return res.status(200).json(f);
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === 'P2023') return res.status(500).json(e.meta?.message);
      if (e.code === 'P2025') return res.status(404).json(e.meta?.cause);
    }
  }
};

export default {
  addFeedingEvent,
  getFeedingEvents,
  updateFeedingEvent,
  deleteFeedingEvent
};
