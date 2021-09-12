import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '@/api/auth/auth.module';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';

@Module({
    imports: [forwardRef(() => AuthModule)],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
