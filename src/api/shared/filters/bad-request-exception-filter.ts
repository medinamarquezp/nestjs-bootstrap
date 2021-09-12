import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch(exception: BadRequestException, host: ArgumentsHost): any {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getResponse<Request>();
        const status = exception.getStatus();
        const errors = exception.getResponse()['message'];

        const data = [];

        errors.forEach(function (error) {
            data.push({
                field: error['property'],
                constraints: Object.values(error['constraints']),
            });
        });

        response.status(status).json({
            timestamp: new Date().toISOString(),
            path: request.url,
            status,
            messages: data,
        });
    }
}
