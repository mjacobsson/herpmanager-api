import request from 'supertest';
import { app } from '../source/server';
import { closeDB } from '../source/db';
import { specimen } from '../source/controllers/specimens';

const breedingEvent = {
  id: 42,
  date: '2013-04-27T22:46:27.000Z',
  comment: 'Ovulation',
  male: 'm-123'
};

const testSpecimens = [
  {
    id: 'm-123',
    scientificName: 'Antaresia childreni',
    commonName: 'Childrens python',
    sex: 'male'
  },
  {
    id: 'f-123',
    scientificName: 'Antaresia childreni',
    commonName: 'Childrens python',
    sex: 'female'
  }
];

beforeAll(async () => {
  await specimen.insertMany(testSpecimens);
});

afterAll(async () => {
  await closeDB();
});

describe('/breedings', () => {
  it('add breeding event', async () => {
    const result = await request(app)
      .post('/breedings')
      .set('Content-Type', 'application/json')
      .send(breedingEvent);
    expect(result.statusCode).toEqual(200);
  });

  it('add duplicate breeding event', async () => {
    const result = await request(app)
      .post('/breedings')
      .set('Content-Type', 'application/json')
      .send(breedingEvent);
    expect(result.statusCode).toEqual(403);
  });

  it('update breeding event', async () => {
    const result = await request(app)
      .put(`/breedings/${breedingEvent.id}`)
      .set('Content-Type', 'application/json')
      .send({ male: 'm-123', female: 'f-123' });
    expect(result.statusCode).toEqual(200);
  });

  it('get breeding events', async () => {
    const result = await request(app).get(`/breedings`);
    expect(result.statusCode).toEqual(200);
  });

  it('get breeding event', async () => {
    const result = await request(app).get(`/breedings/${breedingEvent.id}`);
    expect(result.statusCode).toEqual(200);
  });

  it('delete breeding event', async () => {
    const result = await request(app).delete(`/breedings/${breedingEvent.id}`);
    expect(result.statusCode).toEqual(200);
  });
});
