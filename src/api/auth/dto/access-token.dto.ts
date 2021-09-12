import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenDto {
    @ApiProperty({
        example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluQHRlc3QuZXMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzExMzIwNDcsImV4cCI6MTYzMTIxODQ0N30.18UvPPkWz9IiqGZ8pyqZvmaIUY_K7OZM9Pd2WnEG8Y8',
    })
    accessToken: string;

    @ApiProperty({ example: 'admin' })
    role: string;
}
