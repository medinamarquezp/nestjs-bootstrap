import { JwtModule } from '@nestjs/jwt';
import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { authConfig } from '@/config/auth.config';
import { UsersModule } from '@/api/users/users.module';
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
        forwardRef(() => UsersModule),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [JwtStrategy, PassportModule, JwtModule, AuthService],
})
export class AuthModule {}
