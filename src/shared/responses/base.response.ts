import { ApiProperty } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';

export declare type ClassType<T> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any[]): T;
};

export class Response<Content, Dto> {
    @ApiProperty()
    data: Dto;

    constructor(content: Content | Content[], dto: ClassType<Dto>) {
        this.data = this.toJson(dto, content);
    }

    toJson(dto: ClassType<Dto>, content: Content | Content[]) {
        return plainToClass(dto, content);
    }
}
