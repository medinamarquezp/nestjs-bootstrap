import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class SignInCredentialsDto {
    @IsString()
    @MinLength(4)
    @ApiProperty()
    username: string;

    @IsString()
    @MinLength(8)
    @ApiProperty()
    password: string;
}
