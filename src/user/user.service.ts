import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class UserService {

  constructor(private readonly prisma:PrismaService){}

  async create(createUserInput: CreateUserInput) : Promise<User> {

    const loginExist = await this.findOneByLogin(createUserInput.login)
    const emailExist = await this.prisma.user.findFirst({
      where: {email: createUserInput.email}
    })

    if(loginExist){
      throw new BadRequestException('Login already exist')
    }
    if(emailExist){
      throw new BadRequestException('Email already exist')
    }


    const hashPassword = await bcrypt.hash(createUserInput.password, 3);
    createUserInput.password = hashPassword
    return this.prisma.user.create({
      data: createUserInput
    })
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return this.prisma.user.findFirst({
      where: {id},
      include:{
        Basket:true
      }
    })
  }

  findOneByLogin(login: string) {
    return this.prisma.user.findUnique({
      where: {login},
      include:{
        Basket:true
      }
    })
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
