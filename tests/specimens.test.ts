import request from 'supertest';
import { app } from '../source/server';

const specimen = {
  id: 'ac-2010-05',
  scientificName: 'Antaresia childreni',
  sex: 'unsexed'
};

describe('/specimen', () => {
  it('add specimen', async () => {
    const result = await request(app)
      .post('/specimens')
      .set('Content-Type', 'application/json')
      .send(specimen);
    expect(result.statusCode).toEqual(200);
  });

  it('add duplicate specimen', async () => {
    const result = await request(app)
      .post('/specimens')
      .set('Content-Type', 'application/json')
      .send(specimen);
    //TODO: should probably not be HTTP 500
    expect(result.statusCode).toEqual(500);
  });

  it('update specimen', async () => {
    const result = await request(app)
      .put(`/specimens/${specimen.id}`)
      .set('Content-Type', 'application/json')
      .send({
        birthDate: '2013-04-28T00:46:27.000Z',
        commonName: 'Childrens python'
      });
    expect(result.statusCode).toEqual(200);
  });

  it('get specimens', async () => {
    const result = await request(app).get(`/specimens`);
    expect(result.statusCode).toEqual(200);
  });

  it('get specimen', async () => {
    const result = await request(app).get(`/specimens/${specimen.id}`);
    expect(result.statusCode).toEqual(200);
  });

  it('delete specimen', async () => {
    const result = await request(app).delete(`/specimens/${specimen.id}`);
    expect(result.statusCode).toEqual(200);
  });

  it('delete already deleted specimen', async () => {
    const result = await request(app).delete(`/specimens/${specimen.id}`);
    expect(result.statusCode).toEqual(404);
  });
});
