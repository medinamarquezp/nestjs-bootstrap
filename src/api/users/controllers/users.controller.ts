import {
    Controller,
    HttpCode,
    Post,
    Body,
    Get,
    Param,
    UseGuards,
    Delete,
    Patch,
} from '@nestjs/common';
import {
    ApiTags,
    ApiResponse,
    ApiBearerAuth,
    ApiExtraModels,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from '@/api/users/dto/user.dto';
import { User } from '@/api/users/entities/user.entity';
import { Roles } from '@/api/shared/roles/roles.decorator';
import { RolesGuard } from '@/api/shared/roles/roles.guard';
import { Response } from '@/api/shared/responses/base.response';
import { UserCreateDto } from '@/api/users/dto/user-create.dto';
import { UserUpdateDto } from '@/api/users/dto/user-update.dto';
import { UsersService } from '@/api/users/services/users.service';
import { GetUser } from '@/api/users/decorators/get-user.decorator';
import { ApiBaseResponse } from '@/api/shared/decorators/api-base-response.decorator';

@ApiTags('Users')
@ApiBearerAuth()
@ApiExtraModels(Response, UserDto)
@Controller('users')
@UseGuards(AuthGuard(), RolesGuard)
export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiBaseResponse(UserDto, {
        statusCode: 201,
        description: 'Create user',
    })
    @HttpCode(201)
    @Roles('admin')
    @Post('/')
    async createUser(
        @Body() body: UserCreateDto,
    ): Promise<Response<User, UserDto>> {
        const user = await this.usersService.createUser(body);
        return new Response<User, UserDto>(user, UserDto);
    }

    @ApiBaseResponse(UserDto, {
        description: 'Get list of users',
        isArray: true,
    })
    @HttpCode(200)
    @Roles('admin')
    @Get('/')
    async getUsers(@GetUser() user: User): Promise<Response<User, UserDto>> {
        const users = await this.usersService.getUsers(user);
        return new Response<User, UserDto>(users, UserDto);
    }

    @ApiBaseResponse(UserDto, { description: 'Update user info' })
    @HttpCode(200)
    @Roles('admin')
    @Patch('/:id')
    async update(
        @Body() body: UserUpdateDto,
        @Param('id') id: number,
    ): Promise<Response<User, UserDto>> {
        const update = await this.usersService.updateUser(body, id);
        return new Response<User, UserDto>(update, UserDto);
    }

    @ApiBaseResponse(UserDto, { description: 'Get current user' })
    @HttpCode(200)
    @Roles('admin')
    @Get('/me')
    async getUser(@GetUser() user): Promise<Response<User, UserDto>> {
        const me = await this.usersService.getUserById(user.id);
        return new Response<User, UserDto>(me, UserDto);
    }

    @ApiBaseResponse(UserDto, { description: 'Get user by id' })
    @HttpCode(200)
    @Roles('admin')
    @Get('/:id')
    async getUserById(
        @Param('id') id: number,
    ): Promise<Response<User, UserDto>> {
        const user = await this.usersService.getUserById(id);
        return new Response<User, UserDto>(user, UserDto);
    }

    @ApiResponse({
        status: 204,
        description: 'Delete specific user',
    })
    @HttpCode(204)
    @Roles('admin')
    @Delete('/:id')
    async deleteUserById(@Param('id') id: number): Promise<void> {
        return await this.usersService.deleteUserById(id);
    }
}
