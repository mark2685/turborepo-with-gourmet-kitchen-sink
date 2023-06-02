import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UsersService } from 'src/users/users.service'

export interface Token {
  sub: string
  username: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService
  ) {
    const secretOrKey = configService.get('JWT_PUBLIC_KEY')

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey,
      algorithms: ['RS256'],
    })
  }

  async validate(payload: { userId: string }) {
    const user = await this.usersService.getUserById(payload.userId)

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
