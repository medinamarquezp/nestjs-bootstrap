import * as env from 'env-var';
import { config as dotenv } from 'dotenv';
import { Options } from 'express-rate-limit';
dotenv();

const fifteenMinutes = 15 * 60 * 1000;

export const rateLimitConfig: Options = {
    windowMs: env.get('RATE_LIMIT_WINDOWMS').default(fifteenMinutes).asInt(),
    max: env.get('RATE_LIMIT_MAX').default(50).asInt(),
};
