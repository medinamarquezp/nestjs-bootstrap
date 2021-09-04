import { Module } from '@nestjs/common';
import { AuthModule } from '@/auth/auth.module';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';

@Module({
    imports: [AuthModule],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
