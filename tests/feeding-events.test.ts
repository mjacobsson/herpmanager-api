import request from 'supertest';
import { app } from '../source/server';
import { connectDB, closeDB } from './db';
import http from 'http';

const feedingEvent = {
  id: 42,
  date: '2013-04-27T22:46:27.000Z',
  comment: '1 Mouse'
};

let server: any;

beforeAll(async () => {
  server = http.createServer();
  server.listen(6666, () => console.log(`The server is running on port 6666`));
  await connectDB();
});

afterAll(async () => {
  closeDB();
  server.close();
});

describe('/feedings', () => {
  it('add feeding event', async () => {
    const result = await request(app)
      .post('/feedings')
      .set('Content-Type', 'application/json')
      .send(feedingEvent);
    expect(result.statusCode).toEqual(200);
  });

  it('add duplicate feeding event', async () => {
    const result = await request(app)
      .post('/feedings')
      .set('Content-Type', 'application/json')
      .send(feedingEvent);
    expect(result.statusCode).toEqual(403);
  });

  it('update feeding event', async () => {
    const result = await request(app)
      .put(`/feedings/${feedingEvent.id}`)
      .set('Content-Type', 'application/json')
      .send({ male: 'm-123', female: 'f-123' });
    expect(result.statusCode).toEqual(200);
  });

  it('get feeding events', async () => {
    const result = await request(app).get(`/feedings`);
    expect(result.statusCode).toEqual(200);
  });

  it('get feeding event', async () => {
    const result = await request(app).get(`/feedings/${feedingEvent.id}`);
    expect(result.statusCode).toEqual(200);
  });

  it('delete feeding event', async () => {
    const result = await request(app).delete(`/feedings/${feedingEvent.id}`);
    expect(result.statusCode).toEqual(200);
  });
});
