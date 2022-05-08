import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { User } from 'src/auth/user.entity';
import { UserRepository } from 'src/auth/user.repository';
import { FeedRepository } from './feed.repository';

@Injectable()
export class FeedService {
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
    @InjectRepository(FeedRepository)
    private feedRepository: FeedRepository
    private readonly graph_URL: string = 'https://graph.facebook.com/';
    private readonly version: string = 'v13.0/';

    async pullingfeed(username: string): Promise<any> {
        const access_token = await this.userRepository.getFbAccesstoken(username)
        const products = await axios.get(this.graph_URL+this.version+'me?access_token='+access_token);
        const id: string = products.data['id'];
        const user = await this.userRepository.findOne({username})
        let flag:number = 0;
        let feed = await axios.get(this.graph_URL + this.version + id + '/feed?access_token='+access_token)
        const facebook_last_time = await this.userRepository.getPullTime(username);
        while (feed.data['data'].length != 0){
            for (const post_data of feed.data['data']){
                let message: string = null;
                let created_time: string = null;
                let image_url: string = null;
                const post_id = post_data['id']
                if (post_data.hasOwnProperty('message')){
                    message = post_data['message'];
                    created_time = post_data['created_time'];
                    console.log(created_time)
                    console.log(facebook_last_time)
                    if (flag == 0){
                        this.userRepository.updatePullTime(username, created_time)
                    }
                    if (created_time == facebook_last_time){
                        return HttpStatus.OK
                    }
                }
                const attachments = await axios.get(this.graph_URL + this.version + post_id + '/attachments?access_token='+access_token)
                if (attachments.data['data'].length != 0){
                    if (attachments.data['data'][0].hasOwnProperty('media')){
                        if (attachments.data['data'][0]['media'].hasOwnProperty('image')){
                            image_url = attachments.data['data'][0]['media']['image']['src']
                            console.log(image_url);
                        }   
                    }
                }
                this.feedRepository.saveFeed(user,username, message, image_url,created_time);
                flag = 1;
            }
            feed = await axios.get(feed.data['paging']['next'])
        }
        return HttpStatus.OK;
    }

    async getFeed(username: string): Promise<any> {
        return this.feedRepository.getFeed(username);
    }

    async getFeedId(id: number): Promise<any> {
        return this.feedRepository.getFeedId(id);
    }
}
