import { User } from "src/auth/user.entity";
import { BaseEntity } from "typeorm";
export declare class Feed extends BaseEntity {
    id: number;
    author: string;
    created_time: string;
    image_url: string;
    message: string;
    user: User;
}
