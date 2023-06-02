import { readFile } from 'node:fs/promises'

export default async () => {
  const jwtPrivateKey = await readFile(`${process.cwd()}/private_key.pem`, {
    encoding: 'utf8',
  })
  const jwtPublicKey = await readFile(`${process.cwd()}/public_key.pem`, {
    encoding: 'utf8',
  })

  return {
    JWT_PRIVATE_KEY: jwtPrivateKey,
    JWT_PUBLIC_KEY: jwtPublicKey,
  }
}
