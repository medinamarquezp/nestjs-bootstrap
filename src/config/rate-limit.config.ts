import * as env from 'env-var';

const fifteenMinutes = 15 * 60 * 1000;

export default {
    windowMs: env.get('RATE_LIMIT_WINDOWMS').default(fifteenMinutes).asInt(),
    max: env.get('RATE_LIMIT_MAX').default(50).asInt(),
};
