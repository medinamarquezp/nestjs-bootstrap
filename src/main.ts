import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
    BadRequestException,
    INestApplication,
    ValidationPipe,
} from '@nestjs/common';
import * as cors from 'cors';
import * as helmet from 'helmet';
import { appConfig } from './config/app.config';
import { BadRequestExceptionFilter } from './shared/filters/bad-request-exception-filter';

async function bootstrap(): Promise<void> {
    if (!process.env.JWT_SECRET) {
        throw new Error('Fatal Error. JWT_SECRET variable is not provided');
    }

    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');

    if (process.env.NODE_ENV !== 'production') {
        await bootstrapSwagger(app);
    }

    app.use(cors());

    app.use(helmet());

    app.useGlobalFilters(new BadRequestExceptionFilter());

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
            exceptionFactory: (errors) => new BadRequestException(errors),
        }),
    );
    await app.listen(appConfig.port);
}

function bootstrapSwagger(app: INestApplication): void {
    const config = new DocumentBuilder()
        .setTitle(appConfig.name)
        .setDescription(appConfig.description)
        .setVersion(appConfig.version)
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
}

bootstrap();
