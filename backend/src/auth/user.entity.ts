import { Feed } from "../feed/feed.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['username'])
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    facebook_access_token: string;

    @Column()
    facebook_last_time: string;

    @OneToMany(
        () => Feed,
        (feed) => feed.user,
    )
    feed: Feed[];
}
