import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FeedService } from './feed.service';
import { Request } from "express";

@Controller('feed')
export class FeedController {
    constructor( private feedService: FeedService){}

    @Post('/pull')
    @UseGuards(AuthGuard('jwt'))
    pullingfeed(@Req() req: Request):Promise<any> {
        console.log(req.user["username"])
        return this.feedService.pullingfeed(req.user["username"]);
    }

    @Get('/')
    @UseGuards(AuthGuard('jwt'))
    getFeed(@Req() req:Request){
        return this.feedService.getFeed(req.user['username'])
    }

    @Get('/:id')
    @UseGuards(AuthGuard('jwt'))
    getFeedId(@Param() param, @Req() req:Request){
        return this.feedService.getFeedId(req.user['username'], param['id'])
    }
}
