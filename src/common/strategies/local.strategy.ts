import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../user/models/user.model';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'login',
    });
  }

  validate = async (login: string, password: string): Promise<User> => {
    const user = await this.authService.validateUser(login, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  };
}
