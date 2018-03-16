import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn} from "typeorm";
import { Profile } from "./Profile";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ type: "varchar", length: "100", unique: true })
    email: string;

    @Column({ type: "bool", default: false })
    confirm: boolean;
    
    @Column({default:10})
    age: number;

    @Column({ nullable: true })
    profileId: number;

    @OneToOne(type => Profile)
    @JoinColumn()
    profile: Profile;
}
