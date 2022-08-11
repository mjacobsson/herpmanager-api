import request from 'supertest';
import { app } from '../source/server';
import { connectDB, closeDB } from './db';
import http from 'http';

const specimen = {
    id:  "m-123",
    scientificName: "Antaresia childreni",
    sex: "unsexed"
};

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

describe('/specimen', () => {

    it('add specimen', async () => {
        const result = await request(app)
            .post('/specimens')
            .set('Content-Type', 'application/json')
            .send(specimen);
            expect(result.statusCode).toEqual(200);
    });

    it('add duplicate specimen', async() => {
        const result = await request(app)
        .post('/specimens')
        .set('Content-Type', 'application/json')
        .send(specimen);
        expect(result.statusCode).toEqual(403);
    });

    it('update specimen', async () => {
        const result = await request(app)
            .put(`/specimens/${specimen.id}`)
            .set('Content-Type', 'application/json')
            .send({	birthDate: "2013-04-28T00:46:27.000Z"});
            expect(result.statusCode).toEqual(200);
    });

    it('get specimens', async () => {
        const result = await request(app)
            .get(`/specimens`)
        expect(result.statusCode).toEqual(200);
    });

    it('get specimen', async () => {
        const result = await request(app)
            .get(`/specimens/${specimen.id}`)
        expect(result.statusCode).toEqual(200);
    });

    it('delete specimen', async () => {
        const result = await request(app).delete(`/specimens/${specimen.id}`);
        expect(result.statusCode).toEqual(200);
    });

    it('delete non existing specimen', async () => {
        const result = await request(app).delete(`/specimens/${specimen.id}`);
        expect(result.statusCode).toEqual(404);
    });
});
