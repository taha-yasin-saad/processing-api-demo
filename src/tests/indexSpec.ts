import app from '../index';
import fs from 'fs';
import path from 'path';
import supertest from 'supertest';

const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('Test responses from endpoints', (): void => {
    describe('response for endpoint: /', (): void => {
        it('gets /', async (): Promise<void> => {
            const response: supertest.Response = await request.get('/');

            expect(response.status).toBe(200);
        });
    });

    describe('response for endpoint: /api/full (valid argument)', (): void => {
        it('gets /api/full?filename=encenadaport', async (): Promise<void> => {
            const response: supertest.Response = await request.get('/api/images?filename=encenadaport');

            expect(response.status).toBe(200);
        });
    });


    describe('endpoint: /min', (): void => {
        it('returns 404 for invalid endpoint', async (): Promise<void> => {
            const response: supertest.Response = await request.get('/min');

            expect(response.status).toBe(404);
        });
    });

});
