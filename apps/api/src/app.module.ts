import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import RedisStore from 'connect-redis'
import session from 'express-session'
import { Redis } from 'ioredis'
import passport from 'passport'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { PrismaService } from './prisma/prisma.service'
import { PrismaModule } from './prisma/prisma.module'
import { RedisModule, RedisService } from '@liaoliaots/nestjs-redis'
import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from './config/redis.config'

@Module({
  imports: [
    RedisModule.forRoot({
      readyLog: true,
      config: {
        host: REDIS_HOST,
        port: REDIS_PORT,
        password: REDIS_PASSWORD,
      },
    }),
    AuthModule,
    PrismaModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule implements NestModule {
  private readonly redis: Redis

  constructor(private readonly redisService: RedisService) {
    this.redis = this.redisService.getClient()
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          store: new RedisStore({ client: this.redis, prefix: "myapp:" }),
          saveUninitialized: true,
          secret: 'sup3rs3cr3t',
          resave: false,
          cookie: {
            sameSite: true,
            httpOnly: true,
            maxAge: 60000, // 1 minute
          },
        }),
        passport.initialize(),
        passport.session()
      )
      .forRoutes('*')
  }
}
