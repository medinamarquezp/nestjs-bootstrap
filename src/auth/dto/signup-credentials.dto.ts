import { IsString, MinLength } from 'class-validator';
import { UserAlreadyExists } from '../../users/decorators/user-exists.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpCredentialsDto {
    @IsString()
    @MinLength(4)
    @ApiProperty()
    @UserAlreadyExists({
        message: 'User $value already exists. Choose another username.',
    })
    username: string;

    @IsString()
    @MinLength(8)
    @ApiProperty()
    password: string;
}
