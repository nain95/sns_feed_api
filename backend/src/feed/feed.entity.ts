import { User } from "src/auth/user.entity";
import { BaseEntity, Column, Entity, Index, IsNull, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({
    orderBy: {
        created_time: 'DESC'
      }
})
export class Feed extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    author: string;

    @Column()
    created_time: string;

    @Column({nullable: true})
    image_url: string;

    @Column({nullable: true})
    message: string;
    
    @ManyToOne(
        () => User,
        (user) => user.feed,
    )
    @JoinColumn({ name: 'user_id' })
    user: User;
}