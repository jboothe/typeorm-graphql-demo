import {Entity, BaseEntity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Profile extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    gender: string;

    @Column({ nullable: true })
    photo: string;

}