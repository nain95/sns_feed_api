import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import AuthService from './auth.service';
import { FacebookRepository } from './facebook.repository';
import { JwtStrategy } from './jwt.strategy';
import { FacebookStrategy } from './local.strategy';
import { UserRepository } from './user.repository';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret:'Secret1234',
            signOptions:{
                expiresIn: 60 * 60,
            }
        }),
        TypeOrmModule.forFeature([UserRepository]),
        TypeOrmModule.forFeature([FacebookRepository])
    ],
    controllers: [AuthController],
    providers : [AuthService, FacebookStrategy, JwtStrategy],
    exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
