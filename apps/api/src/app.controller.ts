import { Controller, Get, UseGuards } from '@nestjs/common'
import { AppService } from './app.service'
import { AdminGuard } from './auth/guards/admin.guard'
import { LoggedInGuard } from './auth/guards/logged-in.guard'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  publicRoute() {
    return this.appService.getPublicMessage()
  }

  @UseGuards(LoggedInGuard)
  @Get('protected')
  guardedRoute() {
    return this.appService.getPrivateMessage()
  }

  @UseGuards(AdminGuard)
  @Get('admin')
  getAdminMessage() {
    return this.appService.getAdminMessage()
  }
}
