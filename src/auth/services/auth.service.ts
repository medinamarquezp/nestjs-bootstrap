import {
    Injectable,
    UnauthorizedException,
    NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../users/entities/user.entity';
import { trimAll } from '@/shared/helpers/trim-all.helper';
import { JwtPayload } from '../strategies/jwt-payload.interface';
import { AccessTokenDto } from '../responses/access-token.response';
import { SignInCredentialsDto } from '../dto/signin-credentials.dto';
import { Message } from '@/shared/responses/success-message.response';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    async validateUserPassword(
        signInCredentialsDto: SignInCredentialsDto,
    ): Promise<JwtPayload> {
        const { username, password } = signInCredentialsDto;
        const user = await User.findOne({ username });

        if (user && (await user.validatePassword(password))) {
            return { username: user.username, role: user.role };
        } else {
            return null;
        }
    }

    async signUp(body): Promise<Message> {
        body = trimAll(body);
        const { username, password, role } = body;

        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(password, user.salt);
        user.role = role;
        await user.save();
        return { message: `User '${username}' created` };
    }

    async updateUser(body, id): Promise<Message> {
        const { username, password, role } = body;
        const found = await User.findOne({ id });
        if (!found) {
            throw new NotFoundException(`User not found`);
        }

        if (password) {
            found.salt = await bcrypt.genSalt();
            found.password = await bcrypt.hash(password, found.salt);
        }

        if (username) found.username = username;

        if (role) found.role = role;

        await found.save();
        return { message: 'User updated' };
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
