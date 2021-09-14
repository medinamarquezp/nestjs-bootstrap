import { JwtModule } from '@nestjs/jwt';
import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { config } from '@/config';
import { UsersModule } from '@/api/users/users.module';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './controllers/auth.controller';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: config.auth.strategy }),
        JwtModule.register({
            secret: config.auth.secret,
            signOptions: {
                expiresIn: config.auth.expiration,
            },
        }),
        forwardRef(() => UsersModule),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [JwtStrategy, PassportModule, JwtModule, AuthService],
})
export class AuthModule {}
