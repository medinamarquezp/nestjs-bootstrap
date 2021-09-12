import {
    ApiBadRequestResponse,
    ApiExtraModels,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AccessTokenDto } from '../dto/access-token.dto';
import { AuthService } from '../services/auth.service';
import { SignUpCredentialsDto } from '../dto/signup-credentials.dto';
import { SignInCredentialsDto } from '../dto/signin-credentials.dto';
import { Response } from '@/shared/responses/base.response';
import { ApiBaseResponse } from '@/shared/decorators/api-base-response.decorator';
import { UserDto } from '@/users/dto/user.dto';
import { User } from '@/users/entities/user.entity';

@ApiTags('Auth')
@Controller('auth')
@ApiExtraModels(Response, UserDto, AccessTokenDto)
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiBaseResponse(UserDto, {
        description: 'Sign up, returns only success message',
        statusCode: 201,
    })
    @ApiBadRequestResponse({
        description: 'Bad Request (password too weak, user already exists etc)',
    })
    @Post('/signup')
    async signUp(
        @Body() authCredentialsDto: SignUpCredentialsDto,
    ): Promise<Response<User, UserDto>> {
        const user = await this.authService.signUp(authCredentialsDto);
        return new Response<User, UserDto>(user, UserDto);
    }

    @ApiBaseResponse(AccessTokenDto, {
        description: 'Sign in, returns access token',
    })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    @HttpCode(200)
    @Post('/signin')
    async signIn(
        @Body() signInCredentialsDto: SignInCredentialsDto,
    ): Promise<Response<AccessTokenDto, AccessTokenDto>> {
        const accessToken = await this.authService.signIn(signInCredentialsDto);
        return new Response<AccessTokenDto, AccessTokenDto>(
            accessToken,
            AccessTokenDto,
        );
    }
}
