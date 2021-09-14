import './dotenv';

import app from './app.config';
import auth from './auth.config';
import typeorm from './typeorm.config';
import rateLimit from './rate-limit.config';

export const config = {
    app,
    auth,
    typeorm,
    rateLimit,
};
