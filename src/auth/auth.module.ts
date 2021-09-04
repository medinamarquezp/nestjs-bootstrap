import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { authConfig } from '../config/auth.config';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './controllers/auth.controller';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: authConfig.strategy }),
        JwtModule.register({
            secret: authConfig.secret,
            signOptions: {
                expiresIn: authConfig.expiration,
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [JwtStrategy, PassportModule, JwtModule, AuthService],
})
export class AuthModule {}
