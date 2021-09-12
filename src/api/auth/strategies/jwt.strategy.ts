import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { authConfig } from '@/config/auth.config';
import { User } from '@/api/users/entities/user.entity';
import { JwtPayload } from './jwt-payload.interface';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: authConfig.secret,
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { username } = payload;
        const user = await User.findOne({ username });
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
