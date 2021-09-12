import * as bcrypt from 'bcryptjs';
import { Entity, Column } from 'typeorm';
import { MainEntity } from '@/shared/entities/main.entity';

@Entity()
export class User extends MainEntity {
    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @Column({ name: 'role', default: 'guest' })
    role: string;

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}
