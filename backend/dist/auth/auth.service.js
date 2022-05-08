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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_repository_1 = require("./user.repository");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const facebook_repository_1 = require("./facebook.repository");
let AuthService = class AuthService {
    constructor(userRepository, jwtService, facebookRepository) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.facebookRepository = facebookRepository;
    }
    async signUp(authCredentialsDto) {
        return this.userRepository.createUser(authCredentialsDto);
    }
    async signIn(authCredentialsDto) {
        const { username, password } = authCredentialsDto;
        const user = await this.userRepository.findOne({ username });
        if (user && await bcrypt.compare(password, user.password)) {
            const payload = { username };
            const accessToken = this.jwtService.sign(payload);
            return { accessToken };
        }
        else {
            throw new common_1.UnauthorizedException('login Fail');
        }
    }
    async facebookSingIn(username, facebook_access_token) {
        return this.facebookRepository.updateUser_facebook(username, facebook_access_token);
    }
    async saveAccessToken(username, access_token) {
        return this.userRepository.saveAccessToken(username, access_token);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_repository_1.UserRepository)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        jwt_1.JwtService,
        facebook_repository_1.FacebookRepository])
], AuthService);
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map