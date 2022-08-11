import request from 'supertest';
import { app } from '../source/server';
import { connectDB, closeDB } from './db';
import http from 'http';

const breedingEvent = {
    id: 42,
    date: "2013-04-27T22:46:27.000Z",
    comment: "Ovulation"
}

let server: any;

beforeAll(async () => {
    server = http.createServer();
    server.listen(6666, () => console.log(`The server is running on port 6666`));
    await connectDB();
});

afterAll(async () => {
    closeDB()
    server.close();
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
            .send({male: "m-123", female: "f-123"});
        expect(result.statusCode).toEqual(200);
    });

    it('get breeding events', async () => {
        const result = await request(app)
            .get(`/breedings`)
        expect(result.statusCode).toEqual(200);
    });

    it('get breeding event', async () => {
        const result = await request(app)
            .get(`/breedings/${breedingEvent.id}`)
        expect(result.statusCode).toEqual(200);
    });

    it('delete breeding event', async () => {
        const result = await request(app)
            .delete(`/breedings/${breedingEvent.id}`)
        expect(result.statusCode).toEqual(200);
    });
});
