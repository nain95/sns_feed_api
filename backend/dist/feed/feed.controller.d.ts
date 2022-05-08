import { FeedService } from './feed.service';
import { Request } from "express";
export declare class FeedController {
    private feedService;
    constructor(feedService: FeedService);
    pullingfeed(req: Request): Promise<any>;
    getFeed(req: Request): Promise<any>;
    getFeedId(param: any): Promise<any>;
}
