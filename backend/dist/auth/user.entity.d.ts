import { Feed } from "../feed/feed.entity";
import { BaseEntity } from "typeorm";
export declare class User extends BaseEntity {
    id: number;
    username: string;
    password: string;
    facebook_access_token: string;
    facebook_last_time: string;
    feed: Feed[];
}
