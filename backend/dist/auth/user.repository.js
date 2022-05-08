"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const bcrypt = require("bcryptjs");
let UserRepository = class UserRepository extends typeorm_1.Repository {
    async createUser(authCredentialsDto) {
        const { username, password } = authCredentialsDto;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.create({ username, password: hashedPassword });
        try {
            await this.save(user);
        }
        catch (error) {
            if (error.code === "ER_DUP_ENTRY") {
                throw new common_1.ConflictException('Existing username');
            }
            else {
                throw new common_1.InternalServerErrorException();
            }
        }
    }
    async saveFeed(feed) {
        const user = this.create({ feed: [feed] });
        try {
            await this.save(user);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async updatePullTime(username, time) {
        const user = await this.findOne({ username });
        const update_data = this.create({ id: user.id, facebook_last_time: time });
        try {
            await this.save(update_data);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async saveAccessToken(username, access_token) {
        const user = await this.findOne({ username });
        const save_token = this.create({ id: user.id, facebook_access_token: access_token });
        try {
            await this.save(save_token);
            return user;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async getPullTime(username) {
        const user = await this.findOne({ username });
        console.log(user);
        return user['facebook_last_time'];
    }
    async getUserId(username) {
        const user = await this.findOne({ username });
        return user;
    }
    async getFbAccesstoken(username) {
        const user = await this.findOne({ username });
        console.log(user);
        return user['facebook_access_token'];
    }
};
UserRepository = __decorate([
    (0, typeorm_1.EntityRepository)(user_entity_1.User)
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map