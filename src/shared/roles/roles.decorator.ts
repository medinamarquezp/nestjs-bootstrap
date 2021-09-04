import { SetMetadata } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Roles = (...roles: string[]): any => SetMetadata('roles', roles);
