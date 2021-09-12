import { Test } from '@nestjs/testing';
import { config as dotenv } from 'dotenv';
import { forwardRef, UnauthorizedException } from '@nestjs/common';
import { UsersModule } from '@/api/users/users.module';
import { User } from '@/api/users/entities/user.entity';
import { AuthModule } from '../auth.module';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from '../services/auth.service';

dotenv();

describe('JwtStrategy', () => {
    let jwtStrategy: JwtStrategy;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [AuthModule, forwardRef(() => UsersModule)],
            providers: [AuthService, JwtStrategy],
        }).compile();
        jwtStrategy = await module.get<JwtStrategy>(JwtStrategy);
    });

    describe('validate', () => {
        it('validates and returns the user based on JWT payload', async () => {
            const user = new User();
            user.username = 'TestUser';

            User.findOne = jest.fn().mockResolvedValue(user);
            const result = await jwtStrategy.validate({ username: 'TestUser' });
            expect(User.findOne).toHaveBeenCalledWith({
                username: 'TestUser',
            });
            expect(result).toEqual(user);
        });

        it('throws an unauthorized exception as user cannot be found', () => {
            User.findOne = jest.fn().mockResolvedValue(null);
            expect(
                jwtStrategy.validate({ username: 'TestUser' }),
            ).rejects.toThrow(UnauthorizedException);
        });
    });
});
