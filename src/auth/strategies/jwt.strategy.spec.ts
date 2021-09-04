import { Test } from '@nestjs/testing';
import { config as dotenv } from 'dotenv';
import { AuthModule } from '../auth.module';
import { JwtStrategy } from './jwt.strategy';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { User } from '../../users/entities/user.entity';

dotenv();

describe('JwtStrategy', () => {
    let jwtStrategy: JwtStrategy;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [AuthModule],
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
