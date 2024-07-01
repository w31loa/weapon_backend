import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { RegistrationDto } from './dto/registration.dto';
import { TokensInterface } from 'src/common/interfaces/tokens.interface';
import { IPayload } from 'src/common/interfaces/payload.interface';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/models/user.model';


@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) { }

    async registration(
        registrationDto: RegistrationDto
    ): Promise<TokensInterface> {

        const newUser = await this.userService.create({
            ...registrationDto
        })

        const payload = {
            id: newUser.id,
            login: newUser.login,
            email: newUser.email
        }

        return this.generateTokens(payload)
    }

    async validateUser(login:string , password:string): Promise<any>{
        const user = await this.userService.findOneByLogin(login)
        const passwordMatches = user 
        ? await bcrypt.compare(password, user.password)
        : false

        if(passwordMatches){
            return user
        }

        return null
    }

    async login(user : Omit<User, 'password'>): Promise<TokensInterface>{
        if(!user){
            throw new ForbiddenException('User not found')
        }

        const payload= {
            id: user.id,
            login: user.login,
            email: user.email
        }
        return this.generateTokens(payload)
    }

    async refresh(id:number): Promise<TokensInterface>{
        const user = await this.userService.findOne(id)

        if(!user){
            throw new ForbiddenException('User not found')
        }

        const payload= {
            id: user.id,
            login: user.login,
            email: user.email
        }
        return this.generateTokens(payload)
    }

    private async generateTokens(payload: IPayload): Promise<TokensInterface> {
        const [accessToken, refreshToken]: [string, string] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('JWT_ACCESS_SECRET'),
                expiresIn: this.configService.get('JWT_ACCESS_EXPIRES_IN'),
            }),
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
                expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
            })
        ])

        return {
            access_token: accessToken,
            refresh_token: refreshToken
        }
    }

}
