# `api`

`docker-compose up -d`

## TODO:

- Setup Sessions in database
- Add limit to active sessions
- Rename to auth

## Resources

- [Creating RSA Keys using OpenSSL](https://www.scottbrady91.com/openssl/creating-rsa-keys-using-openssl)

## Generate Assymetric Keys

```
openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048
openssl rsa -pubout -in private_key.pem -out public_key.pem
```
