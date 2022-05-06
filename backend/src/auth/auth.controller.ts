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
  signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{accessToken:string}>{
    return this.authService.signIn(authCredentialsDto)
  }

  @Get("/facebook")
  // @UseGuards(AuthGuard("jwt"), AuthGuard("facebook"))
  @UseGuards(AuthGuard("facebook"))
  async facebookLogin(): Promise<any> {
    // console.log(req.user);
    return HttpStatus.OK;
  }

  @Get("/facebook/redirect")
  // @UseGuards(AuthGuard("jwt"), AuthGuard("facebook"))
  @UseGuards(AuthGuard("facebook"))
  async facebookLoginRedirect(@Req() req: Request): Promise<any> {
    const facebook_access_token: string = req.user["facebook_access_token"];
    return this.authService.facebookSingIn("ijeon", facebook_access_token);
    // return {
    //   statusCode: HttpStatus.OK,
    //   data: req.user,
    // };
  }
}