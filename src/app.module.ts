import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ORMConfig from './config/typeorm.config';
import { UsersModule } from './users/users.module';
@Module({
    imports: [TypeOrmModule.forRoot(ORMConfig), AuthModule, UsersModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
