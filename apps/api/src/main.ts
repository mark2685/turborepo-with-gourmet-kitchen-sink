import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'

const port = process.env.PORT || 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'log', 'debug', 'warn'],
  })

  app.enableCors()
  app.enableShutdownHooks()
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  const config = new DocumentBuilder()
    .setTitle('Median')
    .setDescription('The Median API description')
    .setVersion('0.1')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('api', app, document)

  const logger = new Logger('api')

  await app.listen(port, () => {
    logger.log(
      `ready started server on 0.0.0.0:${port}, url: http://localhost:${port}`
    )
  })
}

bootstrap()
