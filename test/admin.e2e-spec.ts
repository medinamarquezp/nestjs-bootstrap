import { TestClient } from './utils';
import { factory } from '@/database/factory.loader';
import { User } from '@/users/entities/user.entity';

describe('Admin Tests (e2e)', () => {
    let client: TestClient;

    beforeAll(async () => {
        jest.setTimeout(30000);
        client = await TestClient.init();

        await factory(User)().create();
        await client.authUser();
    });

    afterAll(async () => {
        await client.close();
    });

    describe('users', () => {
        const dummyData = {
            username: 'Nest',
            password: 's3cr3tN3$t',
            role: 'admin',
        };

        const expectUserToMatchSnapshot = async (id): Promise<void> => {
            const user = await User.findOne({ id });
            delete user.createdAt;
            delete user.updatedAt;
            delete user.salt;
            delete user.password;
            expect(user).toMatchSnapshot();
        };

        it('GET /admin/users/1', async () => {
            const data = await client.get('/admin/users/1').expect(200);
            delete data.body.createdAt;
            delete data.body.updatedAt;
            expect(data.body).toMatchSnapshot();
        });

        it('POST /admin/users', async () => {
            const data = await client
                .post('/admin/users')
                .send(dummyData)
                .expect(201);
            expect(data.body).toMatchSnapshot();
            await expectUserToMatchSnapshot(2);
        });

        it('PUT /admin/users/2', async () => {
            const dummyUpdates = {
                id: 2,
                password: '$up3r$3cr3t',
                role: 'guest',
                username: 'updatedUsername',
            };
            const data = await client
                .put('/admin/users/2')
                .send(dummyUpdates)
                .expect(200);
            expect(data.body).toMatchSnapshot();
            await expectUserToMatchSnapshot(2);
        });

        it('GET /admin/users', async () => {
            const data = await client.get('/admin/users').expect(200);
            data.body.forEach((item) => {
                delete item.createdAt;
                delete item.updatedAt;
            });
            expect(data.body).toMatchSnapshot();
        });

        it('DELETE /admin/users/4 but user does not exist', async () => {
            await client.delete('/admin/users/4').expect(404);
        });

        it('DELETE /admin/users/2', async () => {
            await client.delete('/admin/users/2').expect(204);
        });

        it('GET /admin/users empty', async () => {
            await client.get('/admin/users').expect(404);
        });
    });
});
