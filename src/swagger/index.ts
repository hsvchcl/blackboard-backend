import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CreateProductDto } from '@resources/product/dto/create-product.dto';
import { ResponseDto } from '@resources/product/dto/response.dto';
import { UpdateProductDto } from '@resources/product/dto/update-product.dto';

export function ApiUpdate() {
  return applyDecorators(
    ApiOperation({ summary: 'Actualiza parcialmente un producto' }),
    ApiResponse({
      status: 200,
      description: 'Producto actualizado con éxito',
      type: CreateProductDto,
    }),
    ApiResponse({
      status: 204,
      description: 'Producto actualizado sin contenido devuelto',
    }),
    ApiResponse({ status: 400, description: 'Datos inválidos' }),
    ApiResponse({ status: 404, description: 'Producto no encontrado' }),
    ApiResponse({ status: 500, description: 'Error del servidor' }),
    ApiBody({ type: UpdateProductDto }),
  );
}

export function ApiDelete() {
  return applyDecorators(
    ApiOperation({ summary: 'Elimina un producto' }),
    ApiResponse({
      status: 200,
      description: 'Producto eliminado con éxito',
      type: CreateProductDto,
    }),
    ApiResponse({
      status: 204,
      description: 'Producto eliminado sin contenido devuelto',
    }),
    ApiResponse({ status: 404, description: 'Producto no encontrado' }),
    ApiResponse({ status: 500, description: 'Error del servidor' }),
  );
}

export function ApiFindWithQuery() {
  return applyDecorators(
    ApiOperation({
      summary:
        'Devuelve todos los productos encontrados de acuerdo a los criterios de búsqueda.',
    }),
    ApiQuery({
      name: 'name',
      required: false,
      type: String,
      description: 'Nombre del producto',
    }),
    ApiQuery({
      name: 'price',
      required: false,
      type: Number,
      description: 'Precio del producto',
    }),
    ApiQuery({
      name: 'stock',
      required: false,
      type: Number,
      description: 'Stock del producto',
    }),
    ApiResponse({
      status: 200,
      description: 'Productos devueltos con éxito',
      type: [ResponseDto],
    }),
    ApiResponse({ status: 400, description: 'Solicitud incorrecta' }),
    ApiResponse({ status: 500, description: 'Error del servidor' }),
  );
}

export function ApiFindAll() {
  return applyDecorators(
    ApiOperation({ summary: 'Devuelve todos los productos registrados' }),
    ApiResponse({
      status: 200,
      description: 'Productos devueltos con éxito',
      type: ResponseDto,
    }),
    ApiResponse({ status: 400, description: 'Solicitud incorrecta' }),
    ApiResponse({ status: 500, description: 'Error del servidor' }),
    // ApiBody({ type: [CreateProductDto] }),
  );
}

export function ApiCreate() {
  return applyDecorators(
    ApiOperation({ summary: 'Crea un nuevo producto' }),
    ApiResponse({
      status: 201,
      description: 'Producto creado con éxito',
      type: CreateProductDto,
    }),
    ApiResponse({ status: 400, description: 'Solicitud incorrecta' }),
    ApiResponse({ status: 500, description: 'Error del servidor' }),
    ApiBody({ type: CreateProductDto }),
  );
}
