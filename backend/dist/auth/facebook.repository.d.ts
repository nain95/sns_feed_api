import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class FacebookRepository extends Repository<User> {
    updateUser_facebook(username: string, facebook_access_token: string): Promise<void>;
}
