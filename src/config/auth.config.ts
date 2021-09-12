import * as env from 'env-var';
import { config as dotenv } from 'dotenv';
dotenv();

interface authConfigInterface {
    secret: string;
    expiration: string;
    strategy: string;
}

export const authConfig: authConfigInterface = {
    secret: env.get('JWT_SECRET').required().asString(),
    expiration: env.get('JWT_EXPIRATION_TIME').default('1d').asString(),
    strategy: env.get('PASSPORT_DEFAULT_STRATEGY').default('jwt').asString(),
};
