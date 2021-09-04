import { define } from 'typeorm-seeding';
import { User } from '@/users/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { testPassword, testUsername } from './factory.constants';

const createUser = (): User => {
    const user = new User();
    user.username = testUsername;
    user.salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(testPassword, user.salt);
    user.role = 'admin';
    return user;
};

define(User, createUser);
