import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Next,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { RegisterDto } from './dto/register.dto'
import { UserEntity } from 'src/users/entities/user.entity'
import { AuthUser } from 'src/users/users.decorator'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { SessionAuthGuard } from './guards/session-auth.guard'
import { NextFunction, Response, Request } from 'express'
import { LoginDto } from './dto/login.dto'

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name)

  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse()
  async register(@Body() body: RegisterDto) {
    this.logger.log('register')
    return this.authService.register(body)
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserEntity })
  async login(@Body() _: LoginDto, @Req() req: Request) {
    this.logger.log('login')
    return req.session
    // return new UserEntity(req.user || {})
  }

  @Get('logout')
  async logout(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    this.logger.log('logout')
    return req.logout((err) => {
      if (err) {
        return next()
      }

      return res.redirect('/')
    })
  }

  @Get('protected')
  protected() {
    this.logger.log('protected')
    return {
      message: 'This route is protected against unauthenticated users!',
    }
  }
  @Get('me')
  @UseGuards(SessionAuthGuard)
  me(@AuthUser() user: UserEntity): UserEntity {
    this.logger.log('me')
    return user
  }
}
