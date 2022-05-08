import { Controller, Get, Render, UseFilters, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { ViewAuthFilter } from './auth/auth.filter';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  // @UseGuards(AuthGuard('jwt'))
  // @UseFilters(ViewAuthFilter)
  @Render('main.ejs')
  getMain():void{
    
  }
  
}
