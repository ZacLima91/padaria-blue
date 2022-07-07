import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUrl, IsUUID } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nome do produto',
    example: 'pao, bolo, cafe',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Descrição do produto',
    example: 'pao com massa de trigo',
  })
  description: string;

  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @ApiProperty({
    description: 'Preço do produto',
    example: 3.99,
  })
  price: number;

  @IsUrl()
  @ApiProperty({
    description: 'Link da imagem do produto',
    example: 'https://i.imgur.com/sgsdgsd.png',
  })
  image: string;

  @IsUUID()
  @ApiProperty({
    description: 'Id da categoria do produto',
    example: 'acb989bb-c9ee-4d13-bf8a-6dab15cce935',
  })
  categoryId: string;
}
