import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty } from 'class-validator';
import { UserCreateDto } from './user-create.dto';

export class UserUpdateDto extends UserCreateDto {
    @ApiProperty({ example: '2' })
    @IsNotEmpty()
    id?: number;

    @ApiProperty({ example: 'testUsername' })
    @IsOptional()
    username?: string;

    @ApiProperty({ example: 'password123' })
    @IsOptional()
    password?: string;

    @ApiProperty({ example: 'guest' })
    @IsOptional()
    role?: string;
}
