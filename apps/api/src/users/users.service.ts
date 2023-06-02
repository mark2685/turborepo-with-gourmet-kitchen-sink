import { Injectable, NotFoundException } from '@nestjs/common'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import omit from 'lodash/omit'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { normalizer } from 'src/utils/normalizer'

export const roundsOfHashing = 10

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(body: CreateUserDto) {
    const normalizedEmail = normalizer(body.email)
    const passwordHash = await bcrypt.hash(body.password, 10)

    const user = {
      ...omit(body, 'email', 'password'),
      id: uuidv4(),
      email: normalizedEmail,
      passwordHash,
    }

    return await this.prisma.user.create({ data: user })
  }

  getUserByEmail(email: string) {
    const normalizedEmail = normalizer(email)

    const user = this.prisma.user.findUnique({
      where: { email: normalizedEmail },
    })

    return user
  }

  getUserById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    })
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const passwordHash = updateUserDto.password
      ? await bcrypt.hash(updateUserDto.password, 10)
      : undefined

    const user = {
      ...omit(updateUserDto, 'password'),
      passwordHash,
    }

    return this.prisma.user.update({ where: { id }, data: user })
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } })
  }

  async validateUserById(id: string) {
    const user = await this.getUserById(id)

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user
  }
}
