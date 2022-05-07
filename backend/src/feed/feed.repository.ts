import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { UserRepository } from 'src/auth/user.repository';
import { EntityRepository, Repository } from 'typeorm'
import { Feed } from './feed.entity';

@EntityRepository(Feed)
export class FeedRepository extends Repository<Feed> {
    @InjectRepository(UserRepository)
    private userRepository: UserRepository

    async saveFeed(user:User, username:string, message: string, image_url:string, created_time: string): Promise<void>{
        const feed = this.create({author:username, message, image_url, created_time, user});
        try{
            await this.save(feed);
        }catch (error) {
            if (error.code === '23505'){
                throw new ConflictException('Existing username');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}