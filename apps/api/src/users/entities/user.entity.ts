import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Role, User } from 'database'
import { Exclude } from 'class-transformer'
import { IsOptional, IsString } from 'class-validator'

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial)
  }

  @ApiProperty()
  id!: string

  @ApiProperty()
  createdAt!: Date

  @ApiProperty()
  updatedAt!: Date

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ default: null, nullable: true })
  firstName!: string | null

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ default: null, nullable: true })
  lastName!: string | null

  @ApiProperty()
  email!: string

  @ApiProperty({ default: null, nullable: true })
  emailVerified!: Date | null

  @ApiProperty()
  role!: Role

  @Exclude()
  passwordHash!: string
}
