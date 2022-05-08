import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
export declare class UserRepository extends Repository<User> {
    createUser(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    saveFeed(feed: any): Promise<void>;
    updatePullTime(username: string, time: string): Promise<void>;
    saveAccessToken(username: string, access_token: string): Promise<User>;
    getPullTime(username: string): Promise<string>;
    getUserId(username: string): Promise<User>;
    getFbAccesstoken(username: string): Promise<string>;
}
