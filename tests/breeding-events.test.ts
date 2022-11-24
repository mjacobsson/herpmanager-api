import request from 'supertest';
import { app } from '../source/server';

const breedingEvent = {
  individual: '',
  date: '2013-04-27T22:46:27.000Z',
  comment: 'Ovulation',
  mate: 'f-123'
};

const male = {
  id: 'm-123',
  scientificName: 'Antaresia childreni',
  commonName: 'Childrens python',
  sex: 'male'
};
const female = {
  id: 'f-123',
  scientificName: 'Antaresia childreni',
  commonName: 'Childrens python',
  sex: 'female'
};

beforeAll(async () => {
  await specimen.create(male);
  await specimen.create(female);
});

afterAll(async () => {

});

describe('/breedings', () => {
  it('add breeding event', async () => {
    breedingEvent.individual = male.id;
    const result = await request(app)
      .post(`/specimens/${male.id}/breedings`)
      .set('Content-Type', 'application/json')
      .send(breedingEvent);
    expect(result.statusCode).toEqual(200);
  });

  it('add duplicate breeding event', async () => {
    const result = await request(app)
      .post(`/specimens/${male.id}/breedings`)
      .set('Content-Type', 'application/json')
      .send(breedingEvent);
    expect(result.statusCode).toEqual(403);
  });

  xit('update breeding event', async () => {
    const result = await request(app)
      .put(`/breedings`)
      .set('Content-Type', 'application/json')
      .send({ male: male.id, female: female.id });
    expect(result.statusCode).toEqual(200);
  });

  it('get breeding events', async () => {
    const result = await request(app).get(`/specimens/${male.id}/breedings`);
    expect(result.statusCode).toEqual(200);
  });

  xit('get breeding event', async () => {
    const result = await request(app).get(`/breedings/`);
    expect(result.statusCode).toEqual(200);
  });

  xit('delete breeding event', async () => {
    const result = await request(app).delete(`/breedings}`);
    expect(result.statusCode).toEqual(200);
  });
});
