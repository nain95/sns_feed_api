import { Controller, Get, UseGuards, HttpStatus, Req, Post, Body, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import AuthService from "./auth.service";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";

@Controller('auth')
export class AuthController {
  constructor( private authService: AuthService){}

  @Post('/signup')
  signUp(@Body() authcredentialsDto: AuthCredentialsDto): Promise<void>{
    return this.authService.signUp(authcredentialsDto);
  }

  @Post('signin')
  signIn(@Body() authCredentialsDto: AuthCredentialsDto){
    return this.authService.signIn(authCredentialsDto)
  }

  @Get("/facebook")
  @UseGuards(AuthGuard("facebook"))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get("/facebook/redirect")
  @UseGuards(AuthGuard("facebook"))
  async facebookLoginRedirect(@Req() req: Request): Promise<any> {
    console.log(req)
    return {
      statusCode: HttpStatus.OK,
      data: req.user,
    };
  }
}