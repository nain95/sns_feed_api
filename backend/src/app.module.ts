import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import AuthService from './auth/auth.service';
import { typeORMConfig } from './configs/typeorm.config';
import { FeedService } from './feed/feed.service';
import { FeedController } from './feed/feed.controller';
import { FeedModule } from './feed/feed.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    AuthModule,
    FeedModule,
  ],
  controllers: [AppController, FeedController],
  providers: [AppService, FeedService],
})
export class AppModule {}
