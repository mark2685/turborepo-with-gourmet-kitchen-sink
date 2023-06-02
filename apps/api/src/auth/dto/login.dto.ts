import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: 'username@domain.com' })
  email!: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: 'S3cretP@ass' })
  password!: string
}
