import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsUUID } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Número da mesa do pedido',
    example: 12,
  })
  tableNumber: number;

  @IsUUID()
  @ApiProperty({
    description: 'Id da mesa do pedido',
    example: 'acb989bb-c9ee-4d13-bf8a-6dab15cce935',
  })
  userId: string;

  @IsUUID(undefined, { each: true })
  @ApiProperty({
    description: 'Listas dos produtos pedidos',
    example: `['acb989bb-c9ee-4d13-bf8a-6dab15cce935','acb989bb-c9ee-4d13-bf8a-6dab15cce935']`,
  })
  products: string[];
}
