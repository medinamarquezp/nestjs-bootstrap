/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import request = require('supertest');
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe, Type } from '@nestjs/common';
import { AppModule } from '@/app.module';
import { initFactories } from '@/database/factory.loader';
import {
    testPassword,
    testUsername,
} from '@/database/factories/factory.constants';

async function createAppModuleFixture(): Promise<TestingModule> {
    // Initialize AppModule, the entry point to load all the available
    // modules and providers in the project.
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
    }).compile();

    return moduleFixture;
}

export async function initApp(): Promise<INestApplication> {
    const moduleFixture = await createAppModuleFixture();

    // Init app with the same config as in src/main.ts
    const app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );
    await app.init();

    // Init factories
    await initFactories();

    return app;
}

export async function initClass<TInput>(
    classType: Type<TInput>,
): Promise<TInput> {
    const moduleFixture = await createAppModuleFixture();

    // Init factories
    await initFactories();

    return moduleFixture.get<TInput>(classType);
}

export class TestClient {
    private app: INestApplication;

    private request: request.SuperTest<request.Test>;

    private bearer: string;

    constructor(app: INestApplication) {
        this.app = app;
        this.request = request(app.getHttpServer());
    }

    static async init(): Promise<TestClient> {
        return new this(await initApp());
    }

    getApp(): object {
        return this.app;
    }

    async close(): Promise<void> {
        await this.app.close();
    }

    /**
     * Authenticate the client as the given user. By default, if none
     * is provided, create a new user from a factory and authenticate
     * as him.
     */
    async authUser(): Promise<object> {
        const tokenResp = await this.post('/auth/signin').send({
            username: testUsername,
            password: testPassword,
        });

        this.bearer = tokenResp.body.data.accessToken;

        return this;
    }

    private withAuth(req: request.Test): object {
        if (this.bearer) {
            req.set({ Authorization: `Bearer ${this.bearer}` });
        }
        return req;
    }

    get(url: string): any {
        return this.withAuth(this.request.get(url));
    }
    post(url: string): any {
        return this.withAuth(this.request.post(url));
    }
    put(url: string): any {
        return this.withAuth(this.request.put(url));
    }
    patch(url: string): any {
        return this.withAuth(this.request.patch(url));
    }
    delete(url: string): any {
        return this.withAuth(this.request.delete(url));
    }
}
