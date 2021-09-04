import { ApiProperty } from '@nestjs/swagger';

export class Message {
    @ApiProperty({ example: 'Success' })
    message: string;
}

export class SuccessResponse {
    @ApiProperty({ type: Message })
    data: Message;
    constructor(message: Message) {
        this.data = message;
    }
}
