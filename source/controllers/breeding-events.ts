/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

const addBreedingEvent = async (req: Request, res: Response) => {
  const f = await prisma.specimen.update({
    where: { id: req.params.specimen },
    data: {
      breedingEvents: {
        create: {
          mate: req.body.mate,
          date: req.body.date ? new Date(req.body.date) : new Date(),
          comment: req.body.comment
        }
      }
    }
  });
  return res.status(200).json(f);
};

const getBreedingEvents = async (req: Request, res: Response) => {
  const f = await prisma.breedingEvent.findMany({
    where: { specimenId: req.params.specimen }
  });
  return res.status(200).json(f);
};

const updateBreedingEvent = async (req: Request, res: Response) => {
  //TODO: check req.params.specimen too!
  const f = await prisma.breedingEvent.update({
    where: { id: req.params.id },
    data: {
      mate: req.body.mate,
      date: new Date(req.body.date),
      comment: req.body.comment
    }
  });
  return res.status(200).json(f);
};

const deleteBreedingEvent = async (req: Request, res: Response) => {
  //TODO: check req.params.specimen too!
  try {
    const f = await prisma.breedingEvent.delete({
      where: { id: req.body.id }
    });
    return res.status(200).json(f);
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === 'P2023') return res.status(500).json(e.meta?.message);
      if (e.code === 'P2025') return res.status(404).json(e.meta?.cause);
    }
  }
};

export default {
  addBreedingEvent,
  getBreedingEvents,
  updateBreedingEvent,
  deleteBreedingEvent
};
