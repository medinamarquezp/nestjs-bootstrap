import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BeforeInsert,
    BeforeUpdate,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @Column({
        name: 'created_at',
    })
    createdAt: Date;

    @Column({
        name: 'updated_at',
    })
    updatedAt: Date;

    @Column({ name: 'role', default: 'guest' })
    role: string;

    @BeforeInsert()
    setCreationDates(): void {
        if (!this.createdAt) {
            this.createdAt = new Date();
        }
        if (!this.updatedAt) {
            this.updatedAt = new Date();
        }
    }

    @BeforeUpdate()
    setUpdateDates(): void {
        this.updatedAt = new Date();
    }

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}
