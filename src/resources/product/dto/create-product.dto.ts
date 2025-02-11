import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsInt()
  @ApiProperty({ example: 1, description: 'ID del producto' })
  id: number;

  @IsString()
  @MinLength(1, { message: 'El nombre no puede estar vacío' })
  @ApiProperty({ example: 'Producto 1', description: 'Nombre del producto' })
  name: string;

  @IsInt()
  @IsPositive({ message: 'El precio debe ser mayor a 0' })
  @ApiProperty({ example: 1990, description: 'Precio del producto' })
  price: number;

  @IsInt()
  @IsPositive({ message: 'El stock debe ser mayor o igual a 1' })
  @ApiProperty({ example: 19, description: 'Stock del producto' })
  stock: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Electro', description: 'Categoría del producto' })
  category: string;

  @IsOptional()
  @IsInt()
  @IsPositive({ message: 'Las ventas deben ser mayores a 0' })
  @ApiProperty({
    example: 9,
    description: 'Representa las ventas para el producto',
  })
  sales: number;
}
