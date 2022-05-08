"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedModule = void 0;
const common_1 = require("@nestjs/common");
const feed_service_1 = require("./feed.service");
const feed_controller_1 = require("./feed.controller");
const user_repository_1 = require("../auth/user.repository");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../auth/auth.module");
const feed_repository_1 = require("./feed.repository");
let FeedModule = class FeedModule {
};
FeedModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_repository_1.UserRepository]),
            typeorm_1.TypeOrmModule.forFeature([feed_repository_1.FeedRepository]),
            auth_module_1.AuthModule,
        ],
        controllers: [feed_controller_1.FeedController],
        providers: [feed_service_1.FeedService],
        exports: [typeorm_1.TypeOrmModule]
    })
], FeedModule);
exports.FeedModule = FeedModule;
//# sourceMappingURL=feed.module.js.map