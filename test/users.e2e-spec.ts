import { TestClient } from './utils';
import { factory } from '@/database/factory.loader';
import { User } from '@/users/entities/user.entity';

describe('Users Tests (e2e)', () => {
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

        it('GET /users/1', async () => {
            const {
                body: { data },
            } = await client.get('/users/1').expect(200);
            delete data.createdAt;
            delete data.updatedAt;
            expect(data).toMatchSnapshot();
        });

        it('POST /users', async () => {
            const {
                body: { data },
            } = await client.post('/users').send(dummyData).expect(201);
            delete data.createdAt;
            delete data.updatedAt;
            expect(data).toMatchSnapshot();
            await expectUserToMatchSnapshot(data.id);
        });

        it('PATH /users/2', async () => {
            const dummyUpdates = {
                password: '$up3r$3cr3t',
                role: 'guest',
                username: 'updatedUsername',
            };
            const {
                body: { data },
            } = await client.patch('/users/2').send(dummyUpdates).expect(200);
            delete data.createdAt;
            delete data.updatedAt;
            expect(data).toMatchSnapshot();
            await expectUserToMatchSnapshot(2);
        });

        it('GET /users', async () => {
            const {
                body: { data },
            } = await client.get('/users').expect(200);
            const cleanedData = data.map(({ id, username, role }) => ({
                id,
                username,
                role,
            }));
            expect(cleanedData).toMatchSnapshot();
        });

        it('DELETE /users/4 but user does not exist', async () => {
            await client.delete('/users/99').expect(404);
        });

        it('DELETE /users/2', async () => {
            await client.delete('/users/2').expect(204);
        });

        it('GET /users empty', async () => {
            await client.get('/users').expect(404);
        });
    });
});
