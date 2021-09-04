import { ApiProperty } from '@nestjs/swagger';

export class AccessToken {
    @ApiProperty()
    accessToken: string;
}
