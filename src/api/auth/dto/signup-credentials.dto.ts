import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
import { UserAlreadyExists } from '@/api/users/decorators/user-exists.decorator';

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
