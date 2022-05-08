import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm'
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void>{
        const {username, password} = authCredentialsDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.create({username, password: hashedPassword});

        try{
            await this.save(user);
        }catch (error) {
            if (error.code === '23505'){
                throw new ConflictException('Existing username');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async saveFeed(feed){
        const user = this.create({feed:[feed]});
        try{
            await this.save(user);
        }catch (error) {
                throw new InternalServerErrorException();
        }
    }

    async updatePullTime(username:string, time:string){
        const user: User = await this.findOne({ username });
        const update_data = this.create({id : user.id, facebook_last_time:time})
        try{
            await this.save(update_data);
        }catch (error) {
                throw new InternalServerErrorException();
        }
    }

    async getPullTime(username:string): Promise<string>{
        const user: User = await this.findOne({ username });
        console.log(user)
        return user['facebook_last_time']
    }

    async getUserId(username:string): Promise<User>{
        const user: User = await this.findOne({ username });
        return user
    }

    async getFbAccesstoken(username: string): Promise<string>{
        const user: User = await this.findOne({username});
        console.log(user);
        return user['facebook_access_token'];
    }
}