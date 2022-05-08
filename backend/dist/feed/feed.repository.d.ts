import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { Feed } from './feed.entity';
export declare class FeedRepository extends Repository<Feed> {
    private userRepository;
    saveFeed(user: User, username: string, message: string, image_url: string, created_time: string): Promise<void>;
    getFeed(username: string): Promise<any>;
    getFeedId(id: number): Promise<any>;
}
