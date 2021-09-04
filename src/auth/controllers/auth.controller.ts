import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AccessToken } from '../dto/access-token.dto';
import { AuthService } from '../services/auth.service';
import { SignUpCredentialsDto } from '../dto/signup-credentials.dto';
import { SignInCredentialsDto } from '../dto/signin-credentials.dto';
import { AccessTokenResponse } from '../responses/access-token.response';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiResponse({
        status: 201,
        description: 'Sign up, returns only success message',
    })
    @ApiResponse({
        status: 400,
        description: 'Bad Request (password too weak, user already exists etc)',
    })
    @Post('/signup')
    signUp(
        @Body() authCredentialsDto: SignUpCredentialsDto,
    ): Promise<{ message: string }> {
        return this.authService.signUp(authCredentialsDto);
    }

    @ApiResponse({
        status: 200,
        type: AccessToken,
        description: 'Sign in, returns access token',
    })
    @ApiResponse({ status: 401, description: 'Invalid credentials' })
    @HttpCode(200)
    @Post('/signin')
    async signIn(
        @Body() signInCredentialsDto: SignInCredentialsDto,
    ): Promise<AccessTokenResponse> {
        const accessToken = await this.authService.signIn(signInCredentialsDto);
        return new AccessTokenResponse(accessToken);
    }
}
