import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

const port = process.env.PORT || 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(port)

  console.log(
    `ready started server on 0.0.0.0:${port}, url: http://localhost:${port}`
  )
}

bootstrap()
