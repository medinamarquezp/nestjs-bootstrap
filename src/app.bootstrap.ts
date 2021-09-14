import { NestFactory } from '@nestjs/core';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { BadRequestExceptionFilter } from '@/api/shared/filters/bad-request-exception-filter';
import { AppModule } from './app.module';
import { config } from './config';
import { bootstrapSwagger } from './swagger/swagger.bootstarp';

export async function bootstrap(): Promise<void> {
    /*
    |--------------------------------------------------------------------------
    | Checks for JWT SECRET, required for app bootstrapping
    |--------------------------------------------------------------------------
    */
    if (!process.env.JWT_SECRET) {
        throw new Error('Fatal Error. JWT_SECRET variable is not provided');
    }

    /*
    |--------------------------------------------------------------------------
    | Creates an instance of the NestApplication and set Middlewares
    |--------------------------------------------------------------------------
    */
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    app.enableCors();
    app.use(helmet.default());
    app.use(rateLimit(config.rateLimit));

    /*
    |--------------------------------------------------------------------------
    | Set global filters and pipes
    |--------------------------------------------------------------------------
    */
    app.useGlobalFilters(new BadRequestExceptionFilter());
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
            exceptionFactory: (errors) => new BadRequestException(errors),
        }),
    );

    /*
    |--------------------------------------------------------------------------
    | Initialize Swagger and APP
    |--------------------------------------------------------------------------
    */
    if (process.env.NODE_ENV !== 'production') {
        await bootstrapSwagger(app, config.app);
    }

    await app.listen(config.app.port);
}
