import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { GetProductDto } from './get-product.dto';

export class ResponseDto {
  @IsBoolean()
  @ApiProperty({
    example: true,
    description: 'Retorna flag si la respuesta fue correcta',
  })
  success: boolean;

  @IsString()
  @ApiProperty({
    example: '🔍 Se encontraron 1 producto(s).',
    description: 'Mensaje de referencia',
  })
  message: string;

  @IsOptional()
  @ApiPropertyOptional({
    example: [],
    description:
      'Retorna objeto o arreglo con informacion relevante de la consulta',
  })
  data?: [] | {};
}
