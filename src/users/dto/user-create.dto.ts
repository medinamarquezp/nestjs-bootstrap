import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength, IsIn } from 'class-validator';
import { UserAlreadyExists } from '../decorators/user-exists.decorator';

export class UserCreateDto {
    @ApiProperty({ example: 'testUsername' })
    @IsString()
    @MinLength(4)
    @UserAlreadyExists({
        message: 'User $value already exists. Choose another username.',
    })
    username?: string;

    @ApiProperty({ example: 'password123' })
    @IsString()
    @MinLength(8)
    password?: string;

    @ApiProperty({ example: 'guest' })
    @IsOptional()
    @IsString()
    @IsIn(['admin', 'guest'])
    role?: string;
}
