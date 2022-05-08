"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacebookRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let FacebookRepository = class FacebookRepository extends typeorm_1.Repository {
    async updateUser_facebook(username, facebook_access_token) {
        const user = await this.findOne({ username });
        const update_data = this.create({ id: user.id, facebook_access_token });
        try {
            await this.save(update_data);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
};
FacebookRepository = __decorate([
    (0, typeorm_1.EntityRepository)(user_entity_1.User)
], FacebookRepository);
exports.FacebookRepository = FacebookRepository;
//# sourceMappingURL=facebook.repository.js.map