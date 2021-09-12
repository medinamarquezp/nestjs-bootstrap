import * as bcrypt from 'bcryptjs';
import { Not, Equal, FindConditions } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@/users/entities/user.entity';
import { UserCreateDto } from '../dto/user-create.dto';
import { UserUpdateDto } from '../dto/user-update.dto';

@Injectable()
export class UsersService {
    async getUsers(user: User): Promise<User[]> {
        const users = await User.find({ id: Not(Equal(user.id)) });
        if (!users.length) {
            throw new NotFoundException(`No users found`);
        }
        return users;
    }

    async getUserById(id: number): Promise<User> {
        return await this.getUserBy({ id });
    }

    async getUserByUsername(username: string): Promise<User> {
        return await this.getUserBy({ username });
    }

    async getUserBy(criteria: FindConditions<User>): Promise<User> {
        const user = await User.findOne(criteria);
        if (!user) {
            throw new NotFoundException(`User not found`);
        }
        return user;
    }

    async createUser(body: UserCreateDto): Promise<User> {
        const { username, password, role } = body;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = Object.assign(new User(), {
            username,
            role,
            salt,
            password: hashedPassword,
        });
        return await user.save();
    }

    async updateUser(body: UserUpdateDto, id: number): Promise<User> {
        let salt, hashedPassword;
        const { username, password, role } = body;

        if (password) {
            salt = await bcrypt.genSalt();
            hashedPassword = await bcrypt.hash(password, salt);
        }

        let user = await this.getUserById(id);
        user = Object.assign(user, {
            username,
            role,
            salt,
            password: hashedPassword,
        });
        return await user.save();
    }

    async deleteUserById(id: number): Promise<void> {
        const found = await this.getUserById(id);
        await User.delete(found.id);
    }
}
