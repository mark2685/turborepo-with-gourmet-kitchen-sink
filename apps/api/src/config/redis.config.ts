import { registerAs } from '@nestjs/config'

const { REDIS_USER, REDIS_HOST, REDIS_PASSWORD, REDIS_URL } = process.env

const REDIS_PORT = process.env.REDIS_PORT
  ? parseInt(process.env.REDIS_PORT)
  : undefined

export { REDIS_USER, REDIS_HOST, REDIS_PORT, REDIS_PASSWORD, REDIS_URL }

export default registerAs('redis', () => {
  return {
    REDIS: Symbol('AUTH:REDIS'),
    REDIS_URL,
  }
})
