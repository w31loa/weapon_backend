import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtRefreshStrategy, JwtStrategy, LocalStrategy } from 'src/common/strategies';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    PassportModule,
    JwtModule.register({})
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
  exports: [JwtModule]
})
export class AuthModule { }
