import { Controller, Get, UseGuards, HttpStatus, Req, Post, Body, ValidationPipe, Redirect, Res } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { resolveSoa } from "dns";
import { Request, Response } from "express";
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
  signIn(@Body() authCredentialsDto: AuthCredentialsDto):Promise<{accessToken:string}>{
    const access_token = this.authService.signIn(authCredentialsDto);
    console.log(access_token)
    console.log(authCredentialsDto)
    return access_token;
  }

  @Get("/facebook")
  // @UseGuards(AuthGuard("jwt"), AuthGuard("facebook"))
  @UseGuards(AuthGuard("facebook"))
  async facebookLogin(@Req() req: Request, @Res() res:Response): Promise<any> {
    // console.log(req);
    res.header("Access-Control-Allow-Origin", "*")
    return res.send({"test":"test"});
  }

  @Get()
  

  @Get("/facebook/redirect")
  // @UseGuards(AuthGuard("jwt"), AuthGuard("facebook"))
  @UseGuards(AuthGuard("facebook"))
  async facebookLoginRedirect(@Req() req: Request): Promise<any> {
    // const username = req.user["username"];
    const facebook_access_token: string = req.user["facebook_access_token"];
    return this.authService.facebookSingIn('test', facebook_access_token);
  }
}