import { applyDecorators, Type } from '@nestjs/common';
import { ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { Response } from '@/shared/responses/base.response';

export const ApiBaseResponse = <TModel extends Type<any>>(
    model: TModel,
    options?: { statusCode?: number; description?: string; isArray?: boolean },
) => {
    const { statusCode, description, isArray } = options;
    const status = statusCode ? statusCode : 200;
    const properties = isArray
        ? {
              data: {
                  type: 'array',
                  items: { $ref: getSchemaPath(model) },
              },
          }
        : {
              data: { $ref: getSchemaPath(model) },
          };
    return applyDecorators(
        ApiResponse({
            status,
            description,
            schema: {
                allOf: [
                    { $ref: getSchemaPath(Response) },
                    {
                        properties,
                    },
                ],
            },
        }),
    );
};
