import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class UserService {

  constructor(private readonly prisma: PrismaService) { }

  async create(createUserInput: CreateUserInput): Promise<User> {

    const userExists = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: createUserInput.email },
          { login: createUserInput.login }
        ]
      }
    })

    if (userExists) {
      throw new BadRequestException('User with this email or login  already exist!')
    }

    const hashPassword = await bcrypt.hash(createUserInput.password, 3);
    createUserInput.password = hashPassword
    return this.prisma.user.create({
      data: {
        ...createUserInput,
        Basket: {
          create: {}
        }
      },
    })
  }

  findOne(id: number) {
    return this.prisma.user.findFirst({
      where: { id },
      include: {
        Basket: true
      }
    })
  }

  findOneByLogin(login: string) {
    return this.prisma.user.findUnique({
      where: { login },
      include: {
        Basket: true
      }
    })
  }
}
