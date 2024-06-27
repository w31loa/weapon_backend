import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { RegistrationDto } from './dto/registration.dto';
import { TokensInterface } from 'src/common/interfaces/tokens.interface';
import { User } from 'src/user/models/user.model';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { JwtRefreshGuard } from 'src/common/guards/jwt-refresh.guard';
import { JwtPayload } from 'src/common/interfaces/jwtPayload.interface';
import { CurrentUser } from 'src/common/decorators/user.decorator.restapi';
import { MailService } from 'src/common/mail/mail.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('registration')
  async registration(@Body() dto: RegistrationDto): Promise<TokensInterface> {
    return this.authService.registration(dto)
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@CurrentUser() user: User): Promise<TokensInterface> {
    return this.authService.login(user)
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  refresh(@CurrentUser() user: User): Promise<TokensInterface> {
    return this.authService.refresh(user.id);
  }

}
