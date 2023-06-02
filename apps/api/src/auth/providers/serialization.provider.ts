import { Injectable } from '@nestjs/common'
import { PassportSerializer } from '@nestjs/passport'
import { UserEntity } from 'src/users/entities/user.entity'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super()
  }

  serializeUser(
    user: UserEntity,
    done: (err: Error | null, user: { id: string; role: string }) => void
  ) {
    done(null, { id: user.id, role: user.role })
  }

  async deserializeUser(
    payload: { id: string; role: string },
    done: (
      err: Error | null,
      user: Partial<Pick<UserEntity, 'id' | 'role'>>
    ) => void
  ) {
    const user = await this.usersService.getUserById(payload.id)
    done(null, { id: user?.id, role: user?.role })
  }
}
