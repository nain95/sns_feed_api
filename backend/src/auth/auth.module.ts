import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import AuthService from './auth.service';
import { FacebookStrategy } from './local.strategy';
import { UserRepository } from './user.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository])
    ],
    controllers: [AuthController],
    providers : [AuthService, FacebookStrategy]
})
export class AuthModule {}
