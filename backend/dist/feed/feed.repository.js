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
exports.FeedRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_repository_1 = require("../auth/user.repository");
const typeorm_2 = require("typeorm");
const feed_entity_1 = require("./feed.entity");
let FeedRepository = class FeedRepository extends typeorm_2.Repository {
    async saveFeed(user, username, message, image_url, created_time) {
        const feed = this.create({ author: username, message, image_url, created_time, user });
        try {
            await this.save(feed);
        }
        catch (error) {
            if (error.code === '23505') {
                throw new common_1.ConflictException('Existing username');
            }
            else {
                throw new common_1.InternalServerErrorException();
            }
        }
    }
    async getFeed(username) {
        const feed = await this.find({ author: username });
        return feed;
    }
    async getFeedId(username, id) {
        const feed = await this.findOne({ id });
        if (feed.author == username)
            return feed;
        else
            throw new common_1.ConflictException('author != username');
    }
};
__decorate([
    (0, typeorm_1.InjectRepository)(user_repository_1.UserRepository),
    __metadata("design:type", user_repository_1.UserRepository)
], FeedRepository.prototype, "userRepository", void 0);
FeedRepository = __decorate([
    (0, typeorm_2.EntityRepository)(feed_entity_1.Feed)
], FeedRepository);
exports.FeedRepository = FeedRepository;
//# sourceMappingURL=feed.repository.js.map