import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ORMConfig from '@/config/typeorm.config';
import { AuthModule } from '@/api/auth/auth.module';
import { UsersModule } from '@/api/users/users.module';
@Module({
    imports: [TypeOrmModule.forRoot(ORMConfig), AuthModule, UsersModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
