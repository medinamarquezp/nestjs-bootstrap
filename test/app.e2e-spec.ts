import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '@/app.module';

describe('AppController (e2e)', () => {
    let app;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('GET /not-found-route', () => {
        return request(app.getHttpServer()).get('/not-found-route').expect(404);
    });
});
