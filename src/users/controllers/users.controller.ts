import {
    Controller,
    HttpCode,
    Post,
    Body,
    Get,
    Param,
    UseGuards,
    Put,
    Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '@/shared/roles/roles.decorator';
import { RolesGuard } from '@/shared/roles/roles.guard';
import { GetUser } from '@/users/decorators/get-user.decorator';
import { UserCreateDto } from '@/users/dto/user-create.dto';
import { UserUpdateDto } from '@/users/dto/user-update.dto';
import { AuthService } from '@/auth/services/auth.service';
import { UsersService } from '@/users/services/users.service';
import { UserResponseDto } from '@/users/responses/user-response.dto';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { SuccessResponse } from '@/shared/responses/success-message.response';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(AuthGuard(), RolesGuard)
export class UsersController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService,
    ) {}
    @ApiResponse({
        status: 201,
        type: SuccessResponse,
        description: 'Create user',
    })
    @HttpCode(201)
    @Roles('admin')
    @Post('/')
    async createUser(
        @Body() signUpDto: UserCreateDto,
    ): Promise<SuccessResponse> {
        const post = await this.authService.signUp(signUpDto);
        return new SuccessResponse(post);
    }

    @ApiResponse({
        status: 200,
        type: [UserResponseDto],
        description: 'Get list of users',
    })
    @HttpCode(200)
    @Roles('admin')
    @Get('/')
    async getUsers(@GetUser() user): Promise<UserResponseDto[]> {
        return await this.usersService.getUsers(user);
    }

    @ApiResponse({
        status: 200,
        type: SuccessResponse,
        description: 'Update user info',
    })
    @HttpCode(200)
    @Roles('admin')
    @Put('/:id')
    async update(
        @Body() body: UserUpdateDto,
        @Param('id') id,
    ): Promise<SuccessResponse> {
        const update = await this.authService.updateUser(body, id);
        return new SuccessResponse(update);
    }

    @ApiResponse({
        status: 200,
        type: UserResponseDto,
        description: 'Get current user',
    })
    @HttpCode(200)
    @Roles('admin')
    @Get('/me')
    async getUser(@GetUser() user): Promise<UserResponseDto> {
        return await this.usersService.getUserById(user.id);
    }

    @ApiResponse({
        status: 200,
        type: UserResponseDto,
        description: 'Get user by id',
    })
    @HttpCode(200)
    @Roles('admin')
    @Get('/:id')
    async getUserById(@Param('id') id): Promise<UserResponseDto> {
        return await this.usersService.getUserById(id);
    }

    @ApiResponse({
        status: 204,
        description: 'Delete specific user',
    })
    @HttpCode(204)
    @Roles('admin')
    @Delete('/:id')
    async deleteUserById(@Param('id') id): Promise<{ message: string }> {
        return await this.usersService.deleteUserById(id);
    }
}
