/* eslint-disable no-loops/no-loops */
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const specimenData: Prisma.SpecimenCreateInput[] = [
  {
    id: 'ap-22-1-m',
    scientificName: 'Antaresia perthensis',
    commonName: 'Pygmy python',
    sex: 'male',
    birthDate: new Date('2022-06-15'),
    feedingEvents: {
      create: [
        {
          quantity: 1,
          item: 'hopper',
          comment: 'accepted'
        },
        {
          quantity: 2,
          item: 'hopper',
          comment: 'accepted'
        },
        {
          quantity: 1,
          item: 'mouse',
          comment: 'refused'
        }
      ]
    },
    breedingEvents: {
      create: [
        {
          comment: 'prelay shed'
        }
      ]
    }
  },
  {
    id: 'ap-22-2-f',
    scientificName: 'Antaresia perthensis',
    commonName: 'Pygmy python',
    sex: 'female',
    birthDate: new Date('2021-07-01'),
    feedingEvents: {
      create: [
        {
          quantity: 1,
          item: 'mouse',
          comment: 'accepted'
        }
      ]
    },
    breedingEvents: {
      create: [
        {
          comment: 'ovulation'
        }
      ]
    }
  }
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of specimenData) {
    const user = await prisma.specimen.create({
      data: u
    });
    console.log(`Created specimen with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
