import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
    @ApiProperty({ example: 5 })
    id?: number;

    @ApiProperty({ example: 'testUsername' })
    username?: string;

    @ApiProperty({ example: new Date().toISOString() })
    createdAt?: Date;

    @ApiProperty({ example: new Date().toISOString() })
    updatedAt?: Date;

    @ApiProperty({ example: 'guest' })
    role?: string;
}
