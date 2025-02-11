import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class GetProductDto {
  @IsOptional()
  @IsInt()
  id: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'producto 1',
    description: 'Nombre del producto a buscar',
  })
  name: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(2)
  @Transform(({ value }) =>
    Array.isArray(value) ? value.map((v) => parseInt(v, 10)) : [],
  )
  @IsInt({ each: true })
  @ApiPropertyOptional({
    example: [0, 1990],
    description: 'Rango de precios del producto a buscar [min, max]',
  })
  priceRange: number[];

  @IsOptional()
  @IsArray()
  @ArrayMinSize(2)
  @Transform(({ value }) =>
    Array.isArray(value) ? value.map((v) => parseInt(v, 10)) : [],
  )
  @IsInt({ each: true })
  @ApiPropertyOptional({
    example: [0, 19],
    description: 'Rango de stock del producto a buscar [min, max]',
  })
  stockRange: number[];

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'Electro',
    description: 'Categoría del producto a buscar',
  })
  category: string;
}
