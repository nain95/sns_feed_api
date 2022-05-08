"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const axios_1 = require("axios");
const user_repository_1 = require("../auth/user.repository");
const feed_repository_1 = require("./feed.repository");
let FeedService = class FeedService {
    constructor() {
        this.graph_URL = 'https://graph.facebook.com/';
        this.version = 'v13.0/';
    }
    async pullingfeed(username) {
        const access_token = await this.userRepository.getFbAccesstoken(username);
        if (access_token == '') {
            throw new common_1.ConflictException('not found accesstoken');
        }
        const products = await axios_1.default.get(this.graph_URL + this.version + 'me?access_token=' + access_token);
        const id = products.data['id'];
        const user = await this.userRepository.findOne({ username });
        let flag = 0;
        let feed = await axios_1.default.get(this.graph_URL + this.version + id + '/feed?access_token=' + access_token);
        const facebook_last_time = await this.userRepository.getPullTime(username);
        while (feed.data['data'].length != 0) {
            for (const post_data of feed.data['data']) {
                let message = null;
                let created_time = null;
                let image_url = null;
                const post_id = post_data['id'];
                if (post_data.hasOwnProperty('message')) {
                    message = post_data['message'];
                    created_time = post_data['created_time'];
                    console.log(created_time);
                    console.log(facebook_last_time);
                    if (flag == 0) {
                        await this.userRepository.updatePullTime(username, created_time);
                    }
                    if (created_time == facebook_last_time) {
                        return common_1.HttpStatus.OK;
                    }
                }
                const attachments = await axios_1.default.get(this.graph_URL + this.version + post_id + '/attachments?access_token=' + access_token);
                if (attachments.data['data'].length != 0) {
                    if (attachments.data['data'][0].hasOwnProperty('media')) {
                        if (attachments.data['data'][0]['media'].hasOwnProperty('image')) {
                            image_url = attachments.data['data'][0]['media']['image']['src'];
                            console.log(image_url);
                        }
                    }
                }
                this.feedRepository.saveFeed(user, username, message, image_url, created_time);
                flag = 1;
            }
            feed = await axios_1.default.get(feed.data['paging']['next']);
        }
        return common_1.HttpStatus.OK;
    }
    async getFeed(username) {
        return this.feedRepository.getFeed(username);
    }
    async getFeedId(username, id) {
        return this.feedRepository.getFeedId(username, id);
    }
};
__decorate([
    (0, typeorm_1.InjectRepository)(user_repository_1.UserRepository),
    __metadata("design:type", user_repository_1.UserRepository)
], FeedService.prototype, "userRepository", void 0);
__decorate([
    (0, typeorm_1.InjectRepository)(feed_repository_1.FeedRepository),
    __metadata("design:type", feed_repository_1.FeedRepository)
], FeedService.prototype, "feedRepository", void 0);
FeedService = __decorate([
    (0, common_1.Injectable)()
], FeedService);
exports.FeedService = FeedService;
//# sourceMappingURL=feed.service.js.map