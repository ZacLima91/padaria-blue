import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class FavoriteProductDto {
  @IsUUID()
  @ApiProperty({
    description: 'Id do usuário que está favoritando o produto',
    example: 'acb989bb-c9ee-4d13-bf8a-6dab15cce935',
  })
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nome do produto a ser favoritado',
    example: 'pao doce, bolo de mandioca',
  })
  productName: string;
}
