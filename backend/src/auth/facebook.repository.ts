import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm'
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
@EntityRepository(User)
export class FacebookRepository extends Repository<User> {
    async updateUser_facebook(username:string, facebook_access_token:string): Promise<void>{

        const user: User = await this.findOne({ username });
        const update_data = this.create({id : user.id, facebook_access_token})
        try{
            await this.save(update_data);
        }catch (error) {
                throw new InternalServerErrorException();
        }
    }
}