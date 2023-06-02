import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import bcrypt from 'bcryptjs'
import { PrismaService } from 'src/prisma/prisma.service'
import { UserEntity } from 'src/users/entities/user.entity'
import { UsersService } from 'src/users/users.service'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)

  constructor(
    private prisma: PrismaService,
    private usersService: UsersService
  ) {}

  async validateUser(email: string, password: string): Promise<UserEntity> {
    this.logger.log('validateUser')
    const user = await this.usersService.getUserByEmail(email)

    if (!user) {
      throw new BadRequestException('Invalid email or password')
    }

    const passwordValid = await bcrypt.compare(password, user.passwordHash)

    if (!passwordValid) {
      throw new BadRequestException('Invalid email or password')
    }

    return user
  }

  async register(body: RegisterDto): Promise<void> {
    this.logger.log('register')
    const userExists = await this.usersService.getUserByEmail(body.email)

    if (userExists) {
      throw new BadRequestException('Email already exists')
    }

    await this.usersService.create(body)

    return
  }

  async login({ email, password }: LoginDto): Promise<UserEntity> {
    this.logger.log('login')

    const user = await this.usersService.getUserByEmail(email)

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`)
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash)

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password')
    }

    return user
  }

  // async logout(userId: string) {}
}
