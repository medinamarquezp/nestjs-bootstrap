import * as env from 'env-var';

export default {
    secret: env.get('JWT_SECRET').required().asString(),
    expiration: env.get('JWT_EXPIRATION_TIME').default('1d').asString(),
    strategy: env.get('PASSPORT_DEFAULT_STRATEGY').default('jwt').asString(),
};
