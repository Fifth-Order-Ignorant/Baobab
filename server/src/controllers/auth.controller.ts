import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController {
  constructor(private jwtService: JwtService) {
   
  }
  @Get('auth/test')
  foo() {
    return "success";
  }
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    const sessionInfo = {req.user.id}
    return {jwt: this.jwtService.sign(sessionInfo)}
  }
}
