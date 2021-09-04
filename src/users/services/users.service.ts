import { Not, Equal } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@/users/entities/user.entity';
import { UserResponseDto } from '@/users/responses/user-response.dto';
import { Message } from '@/shared/responses/success-message.response';

@Injectable()
export class UsersService {
    async getUsers(user): Promise<UserResponseDto[]> {
        const users = await User.find({ id: Not(Equal(user.id)) });
        if (!users.length) {
            throw new NotFoundException(`No users found`);
        }
        users.forEach((user) => {
            delete user.password;
            delete user.salt;
        });

        return users;
    }

    async getUserById(id): Promise<UserResponseDto> {
        const user = await User.findOne({ id });
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        delete user.password;
        delete user.salt;
        return user;
    }

    async deleteUserById(id): Promise<Message> {
        const found = await User.findOne({ id });
        if (!found) {
            throw new NotFoundException(`User not found`);
        }

        await User.delete({ id });

        return { message: 'User deleted' };
    }
}
