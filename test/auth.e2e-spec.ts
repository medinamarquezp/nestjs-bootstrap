import { TestClient } from './utils';
import {
    testPassword,
    testUsername,
} from '@/database/factories/factory.constants';
import { factory } from '@/database/factory.loader';
import { User } from '@/api/users/entities/user.entity';

describe('Auth Tests (e2e)', () => {
    let client: TestClient;

    beforeAll(async () => {
        client = await TestClient.init();

        await factory(User)().create();
    });

    afterAll(async () => {
        await client.close();
    });

    describe('SignIn', () => {
        it('POST /auth/signin (no body)', async () => {
            await client.post('/auth/signin').expect(400);
        });

        it('POST /auth/signin (invalid password)', async () => {
            await client
                .post('/auth/signin')
                .send({ username: testUsername, password: 'invalid' })
                .expect(400);
        });

        it('POST /auth/signin (valid user)', async () => {
            const resp = await client
                .post('/auth/signin')
                .send({ username: testUsername, password: testPassword })
                .expect(200);
            expect(resp.body.data.accessToken).toBeDefined();
        });
    });

    describe('SignUp', () => {
        it('POST /auth/signup (no body)', async () => {
            await client.post('/auth/signup').expect(400);
        });

        it('POST /auth/signup (existing user)', async () => {
            await client
                .post('/auth/signup')
                .send({ username: testUsername, password: testPassword })
                .expect(400);
        });
        it('POST /auth/signup (short password)', async () => {
            await client
                .post('/auth/signup')
                .send({ username: testUsername, password: 'pw' })
                .expect(400);
        });
        it('POST /auth/signup (correct credentials)', async () => {
            await client
                .post('/auth/signup')
                .send({ username: 'testUsername2', password: testPassword })
                .expect(201);
        });
    });
});
