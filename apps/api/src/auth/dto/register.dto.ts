import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'

export class RegisterDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ default: null, nullable: true })
  firstName: string | null | undefined

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ default: null, nullable: true })
  lastName: string | null | undefined

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ default: 'username@domain.com' })
  email!: string

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(64)
  @ApiProperty({ default: 'S3cretP@ass' })
  password!: string
}
