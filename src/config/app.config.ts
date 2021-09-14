import * as env from 'env-var';
import { name, description, version } from '@/../package.json';

export default {
    name: env.get('APP_NAME').default(name).asString(),
    description: env.get('APP_DESCRIPTION').default(description).asString(),
    version: env.get('APP_VERSION').default(version).asString(),
    port: env.get('APP_PORT').default(3000).asInt(),
    env: env.get('NODE_ENV').default('development').asString(),
    timezone: env.get('TZ').default('Europe/Madrid').asString(),
    url: env.get('APP_URL').default('http://localhost').asString(),
};
