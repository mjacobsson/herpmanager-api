import request from 'supertest';
import { app } from '../source/server';

const feedingEvent = {
  specimen: 'm-123',
  date: '2013-04-27T22:46:27.000Z',
  item: 'Mouse',
  quantity: 1,
  comment: 'accepted'
};

const testSpecimen = {
  id: 'ac-2019-02',
  scientificName: 'Antaresia childreni',
  commonName: 'Childrens python',
  sex: 'male'
};

describe('/feedings', () => {
  it('add feeding event', async () => {
    const result = await request(app)
      .post(`/specimens/${testSpecimen.id}/feedings`)
      .set('Content-Type', 'application/json')
      .send(feedingEvent);
    expect(result.statusCode).toEqual(200);
  });

  it('add duplicate feeding event', async () => {
    const result = await request(app)
      .post(`/specimens/${testSpecimen.id}/feedings`)
      .set('Content-Type', 'application/json')
      .send(feedingEvent);
    expect(result.statusCode).toEqual(403);
  });

  it('add comments to existing feeding', async () => {
    const result = await request(app)
      .put(`/specimens/${testSpecimen.id}/feedings`)
      .set('Content-Type', 'application/json')
      .send({
        specimen: feedingEvent.specimen,
        item: feedingEvent.item,
        quantity: feedingEvent.quantity,
        date: feedingEvent.date,
        comment: 'regurgitated'
      });
    expect(result.statusCode).toEqual(200);
  });

  it('update feeding event', async () => {
    const result = await request(app)
      .put(`/specimens/${testSpecimen.id}/feedings`)
      .set('Content-Type', 'application/json')
      .send({ specimen: 'm-123', comment: 'refused' });
    expect(result.statusCode).toEqual(200);
  });

  it('get feeding events', async () => {
    const result = await request(app).get(
      `/specimens/${testSpecimen.id}/feedings`
    );
    expect(result.statusCode).toEqual(200);
  });

  it('get feeding event', async () => {
    const result = await request(app).get(
      `/specimens/${testSpecimen.id}/feedings`
    );
    expect(result.statusCode).toEqual(200);
  });

  it('delete feeding event', async () => {
    const result = await request(app)
      .delete(`/specimens/${testSpecimen.id}/feedings`)
      .set('Content-Type', 'application/json')
      .send({
        specimen: feedingEvent.specimen,
        date: feedingEvent.date
      });
    expect(result.statusCode).toEqual(200);
  });

  it('delete non existing feeding event', async () => {
    const result = await request(app)
      .delete(`/specimens/${testSpecimen.id}/feedings`)
      .set('Content-Type', 'application/json')
      .send({
        specimen: feedingEvent.specimen,
        date: feedingEvent.date
      });
    expect(result.statusCode).toEqual(404);
  });
});
