import { ExecutionContext, Injectable, Logger } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  private readonly logger = new Logger(LocalAuthGuard.name)

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.logger.log('canActivate')

    const result = (await super.canActivate(context)) as boolean
    await super.logIn(context.switchToHttp().getRequest())
    return result
  }
}
