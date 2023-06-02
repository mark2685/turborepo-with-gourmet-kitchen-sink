import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { PrismaModule } from 'src/prisma/prisma.module'
import { UsersModule } from 'src/users/users.module'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { LocalStrategy } from './strategies//local.strategy'
import { AuthSerializer } from './providers/serialization.provider'

@Module({
  imports: [
    PassportModule.register({ session: true }),
    PrismaModule,
    UsersModule,
  ],
  providers: [AuthService, LocalStrategy, AuthSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
