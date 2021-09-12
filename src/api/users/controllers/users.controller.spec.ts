import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from '@/api/auth/auth.module';
import { UsersService } from '@/api/users/services/users.service';
import { UsersController } from './users.controller';

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
