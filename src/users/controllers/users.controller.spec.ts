import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { AuthModule } from '@/auth/auth.module';
import { UsersService } from '@/users/services/users.service';

describe('Users Controller', () => {
    let controller: UsersController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AuthModule],
            controllers: [UsersController],
            providers: [UsersService],
        }).compile();

        controller = module.get<UsersController>(UsersController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
