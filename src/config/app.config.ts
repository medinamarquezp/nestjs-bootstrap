import * as env from 'env-var';
import { name, description, version } from '@/../package.json';
import { config as dotenv } from 'dotenv';

dotenv();

interface appConfigInterface {
    name: string;
    description: string;
    version: string;
    port: number;
    env: string;
    timezone: string;
    url: string;
}

export const appConfig: appConfigInterface = {
    name: env.get('APP_NAME').default(name).asString(),
    description: env.get('APP_DESCRIPTION').default(description).asString(),
    version: env.get('APP_VERSION').default(version).asString(),
    port: env.get('APP_PORT').default(3000).asInt(),
    env: env.get('NODE_ENV').default('development').asString(),
    timezone: env.get('TZ').default('Europe/Madrid').asString(),
    url: env.get('APP_URL').default('http://localhost').asString(),
};
