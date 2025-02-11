import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class GetProductDto {
  @IsOptional()
  @IsInt()
  id: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'producto 1', description: 'Nombre del producto a buscar' })
  name: string;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 0))
  @IsInt()
  @ApiPropertyOptional({ example: 1990, description: 'Precio del producto a buscar' })
  price: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 0))
  @IsInt()
  @ApiPropertyOptional({ example: 19, description: 'Stock del producto a buscar' })
  stock: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Electro', description: 'Categoría del producto a buscar' })
  category: string;
}
