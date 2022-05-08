import { Controller, Get, UseGuards, HttpStatus, Req, Post, Body, ValidationPipe, Redirect, Res, Render, UseFilters } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import axios from "axios";
import { resolveSoa } from "dns";
import { Request, response, Response } from "express";
import { ViewAuthFilter } from "./auth.filter";
import AuthService from "./auth.service";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import { JwtStrategy } from "./jwt.strategy";

@Controller('auth')
export class AuthController {
  constructor( private authService: AuthService){}

  @Post('/signup')
  signUp(@Body() authcredentialsDto: AuthCredentialsDto): Promise<{accessToken:string}>{
    this.authService.signUp(authcredentialsDto);
    return this.authService.signIn(authcredentialsDto)
  }  

  @Post('signin')
  signIn(@Body() authCredentialsDto: AuthCredentialsDto):Promise<{accessToken:string}>{
    const access_token = this.authService.signIn(authCredentialsDto);
    return access_token;
  }

  @Get('signin')
  @Render('login.ejs')
  getLogin(): object {
    return {"message":"helloworld"}
    // return this.appService.getHello();
  }

  @Get('signup')
  @Render('signup.ejs')
  getSignUp() {
    
  }

  @Get("/facebook")
  @UseGuards(AuthGuard("facebook"))
  async facebookLogin(@Req() req: Request, @Res() res:Response): Promise<any> {
    return HttpStatus.OK
  }


  @Get("/facebook/redirect")
  // @UseGuards(AuthGuard("jwt"), AuthGuard("facebook"))
  @UseGuards(AuthGuard("facebook"))
  async facebookLoginRedirect(@Req() req: Request, @Res() res:Response): Promise<any> {
    // const username = req.user["username"];
    const facebook_access_token: string = req.user["facebook_access_token"];
    this.authService.facebookSingIn('test', facebook_access_token);
    // return facebook_access_token
    // res.redirect('http://localhost:3000/auth/signup')
    // res.send({facebook_access_token})
  }
}