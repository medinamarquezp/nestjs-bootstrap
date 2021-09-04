/* eslint-disable @typescript-eslint/ban-types */
import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenDto {
    @ApiProperty()
    accessToken: string;

    @ApiProperty()
    role: string;
}

export class AccessTokenResponse {
    @ApiProperty({ type: AccessTokenDto })
    data;
    constructor(payload: object) {
        this.data = payload;
    }
}
