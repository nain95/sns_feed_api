import { Module } from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedController } from './feed.controller';
import { UserRepository } from 'src/auth/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { FeedRepository } from './feed.repository';
@Module({
    imports:[
        TypeOrmModule.forFeature([UserRepository]),
        TypeOrmModule.forFeature([FeedRepository]),
        AuthModule,
    ],
    controllers: [FeedController],
    providers: [FeedService],
    exports: [TypeOrmModule]
})
export class FeedModule {}
