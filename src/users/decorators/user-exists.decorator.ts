/* eslint-disable @typescript-eslint/ban-types */
import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';
import { User } from '@/users/entities/user.entity';

@ValidatorConstraint({ async: true })
export class UserDoesntExists implements ValidatorConstraintInterface {
    validate(username: string, args: ValidationArguments): Promise<boolean> {
        const currentUserId = (args.object && args.object['id']) || 0;
        return User.findOne({ username }).then((user) => {
            if (user && currentUserId != user.id) {
                return false;
            }
            return true;
        });
    }
}

export function UserAlreadyExists(validationOptions?: ValidationOptions) {
    return (object: object, propertyName: string): void => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: UserDoesntExists,
        });
    };
}
