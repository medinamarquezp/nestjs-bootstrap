import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '@/config';
import { AuthModule } from '@/api/auth/auth.module';
import { UsersModule } from '@/api/users/users.module';
@Module({
    imports: [TypeOrmModule.forRoot(config.typeorm), AuthModule, UsersModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
