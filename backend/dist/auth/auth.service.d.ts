import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { JwtService } from '@nestjs/jwt';
import { FacebookRepository } from './facebook.repository';
export default class AuthService {
    private userRepository;
    private jwtService;
    private facebookRepository;
    constructor(userRepository: UserRepository, jwtService: JwtService, facebookRepository: FacebookRepository);
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    signIn(authCredentialsDto: AuthCredentialsDto): Promise<{
        accessToken: string;
    }>;
    facebookSingIn(username: string, facebook_access_token: string): Promise<void>;
}
