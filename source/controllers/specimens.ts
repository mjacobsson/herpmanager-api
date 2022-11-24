import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

const prisma = new PrismaClient();

const addSpecimen = async (req: Request, res: Response) => {
  try {
    const s = await prisma.specimen.create({
      data: {
        id: req.body.id,
        scientificName: req.body.scientificName,
        commonName: req.body.commonName,
        sex: req.body.sex,
        birthDate: new Date(req.body.birthDate)
      }
    });
    return res.status(200).json(s);
  } catch (e) {
    return res.status(500).json({});
  }
};

const getSpecimens = async (req: Request, res: Response) => {
  const includeFeedings = req.query['includeFeedings'];
  const includeBreedings = req.query['includeBreedings'];

  const specimems = await prisma.specimen.findMany({
    include: {
      feedingEvents: includeFeedings === 'true',
      breedingEvents: includeBreedings === 'true'
    }
  });
  return res.status(200).json(specimems);
};

const getSpecimen = async (req: Request, res: Response) => {
  const includeFeedings = req.query['includeFeedings'];
  const includeBreedings = req.query['includeBreedings'];
  try {
    const s = await prisma.specimen.findUniqueOrThrow({
      where: { id: req.params.id },
      include: {
        feedingEvents: includeFeedings === 'true',
        breedingEvents: includeBreedings === 'true'
      }
    });
    return res.status(200).json(s);
  } catch (NotFoundError) {
    return res.status(404).json({});
  }
};

const updateSpecimen = async (req: Request, res: Response) => {
  const s = await prisma.specimen.update({
    where: { id: req.params.id },
    data: {
      scientificName: req.body.scientificName,
      commonName: req.body.commonName,
      sex: req.body.sex,
      birthDate: new Date(req.body.birthDate)
    }
  });
  return res.status(200).json(s);
};

const deleteSpecimen = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const f = await prisma.feedingEvent.deleteMany({
      where: { specimenId: req.params.id }
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const b = await prisma.breedingEvent.deleteMany({
      where: { specimenId: req.params.id }
    });
    const s = await prisma.specimen.delete({
      where: { id: req.params.id }
    });
    return res.status(200).json(s);
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === 'P2025') return res.status(404).json(e.meta?.cause);
      return res.status(500).json(e.message);
    }
  }
};

export default {
  addSpecimen,
  getSpecimens,
  getSpecimen,
  updateSpecimen,
  deleteSpecimen
};
