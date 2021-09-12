import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@/api/users/entities/user.entity';
import { UsersService } from '@/api/users/services/users.service';
import { AccessTokenDto } from '../dto/access-token.dto';
import { JwtPayload } from '../strategies/jwt-payload.interface';
import { SignInCredentialsDto } from '../dto/signin-credentials.dto';
import { SignUpCredentialsDto } from '../dto/signup-credentials.dto';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UsersService,
    ) {}

    async validateUserPassword(
        signInCredentialsDto: SignInCredentialsDto,
    ): Promise<JwtPayload> {
        const { username, password } = signInCredentialsDto;
        const user = await this.userService.getUserByUsername(username);

        if (user && (await user.validatePassword(password))) {
            return { username: user.username, role: user.role };
        } else {
            return null;
        }
    }

    async signUp(body: SignUpCredentialsDto): Promise<User> {
        const user = await this.userService.createUser(body);
        return user;
    }

    async signIn(
        signInCredentialsDto: SignInCredentialsDto,
    ): Promise<AccessTokenDto> {
        const found = await this.validateUserPassword(signInCredentialsDto);

        if (!found) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload: JwtPayload = found;
        const accessToken = await this.jwtService.sign(payload);
        return { accessToken, role: found.role };
    }
}
