import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm'
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
@EntityRepository(User)
export class FacebookRepository extends Repository<User> {
    async updateUser_facebook(username:string, facebook_access_token:string): Promise<void>{
        // const {username, facebook_access_token} = authCredentialsDto;

        // const salt = await bcrypt.genSalt();
        // const hashedPassword = await bcrypt.hash(password, salt);
        // const user = this.create({username, password: hashedPassword});
        const user: User = await this.findOne({ username });
        const update_data = this.create({id : user.id, facebook_access_token})
        try{
            await this.save(update_data);
        }catch (error) {
            if (error.code === '23505'){
                throw new ConflictException('Existing username');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}