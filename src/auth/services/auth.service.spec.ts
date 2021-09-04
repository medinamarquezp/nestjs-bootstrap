import { AuthService } from './auth.service';
import { initClass } from '@/../test/utils';
import { User } from '../../users/entities/user.entity';

const mockCredentialsDto = {
    username: 'TestUsername',
    password: 'TestPassword',
};

describe('AuthService', () => {
    let authService;

    beforeAll(async () => {
        authService = await initClass<AuthService>(AuthService);
    });

    describe('signUp', () => {
        let save;

        beforeEach(() => {
            save = jest.fn();
            User.create = jest.fn().mockReturnValue({ save });
        });

        it('successfully signs up the user', async () => {
            save.mockResolvedValue(undefined);
            await expect(
                authService.signUp(mockCredentialsDto),
            ).resolves.not.toThrow();
        });
    });

    describe('validateUserPassword', () => {
        let user;

        beforeEach(() => {
            user = new User();
            user.username = 'TestUsername';
            user.role = 'guest';
            user.validatePassword = jest.fn();
        });

        it('returns the username as validation is successful', async () => {
            User.findOne = jest.fn().mockResolvedValue(user);
            user.validatePassword.mockResolvedValue(true);

            const result = await authService.validateUserPassword(
                mockCredentialsDto,
            );
            expect(result).toEqual({ username: 'TestUsername', role: 'guest' });
        });

        it('returns null as user cannot be found', async () => {
            User.findOne = jest.fn().mockResolvedValue(null);
            const result = await authService.validateUserPassword(
                mockCredentialsDto,
            );
            expect(user.validatePassword).not.toHaveBeenCalled();
            expect(result).toBeNull();
        });

        it('returns null as password is invalid', async () => {
            User.findOne = jest.fn().mockResolvedValue(user);
            user.validatePassword.mockResolvedValue(false);
            const result = await authService.validateUserPassword(
                mockCredentialsDto,
            );
            expect(user.validatePassword).toHaveBeenCalled();
            expect(result).toBeNull();
        });
    });
});
