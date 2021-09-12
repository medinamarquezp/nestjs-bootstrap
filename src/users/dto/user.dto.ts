import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class UserDto {
    @ApiProperty({ example: 5 })
    id: number;

    @ApiProperty({ example: 'testUsername' })
    username: string;

    @Exclude()
    password: string;

    @Exclude()
    salt: string;

    @ApiProperty({ example: new Date().toISOString() })
    createdAt: Date;

    @ApiProperty({ example: new Date().toISOString() })
    updatedAt: Date;

    @ApiProperty({ example: 'guest' })
    role: string;
}
