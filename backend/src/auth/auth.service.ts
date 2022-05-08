import { Injectable, HttpException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { FacebookRepository } from './facebook.repository';
import { User } from './user.entity';
@Injectable()
export default class AuthService{
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private facebookRepository: FacebookRepository,
  ) { }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>{
    return this.userRepository.createUser(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto) : Promise<{accessToken:string}>{
    const {username, password} = authCredentialsDto;
    const user = await this.userRepository.findOne({username});

    if (user && await bcrypt.compare(password, user.password)){
      // token 발급
      const payload = {username};
      const accessToken = this.jwtService.sign(payload);

      return {accessToken};
    }
    else{
      throw new UnauthorizedException('login Fail')
    }
  }

  async facebookSingIn(username:string, facebook_access_token:string): Promise<void>{
    return this.facebookRepository.updateUser_facebook(username, facebook_access_token);
  }

  async saveAccessToken(username: string, access_token: string): Promise<User>{
    return this.userRepository.saveAccessToken(username, access_token);
  }
}