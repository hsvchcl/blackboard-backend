import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Query,
  Version,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiCreate,
  ApiDelete,
  ApiFindAll,
  ApiFindIndicatorInfo,
  ApiFindWithQuery,
  ApiUpdate,
} from '@swagger';

import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductDto } from './dto/get-product.dto';

@ApiTags('Productos')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Version('1')
  @ApiCreate()
  create(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    createProductDto: CreateProductDto,
  ) {
    return this.productService.create(createProductDto);
  }

  @Get('all')
  @Version('1')
  @ApiFindAll()
  findAll() {
    return this.productService.findAll();
  }

  @Get('indicator-info')
  @Version('1')
  @ApiFindIndicatorInfo()
  findIndicatorInfo() {
    return this.productService.findIndicatorInfo();
  }

  @Get()
  @Version('1')
  @ApiFindWithQuery()
  findWithQuery(
    @Query(new ValidationPipe({ transform: true, whitelist: true }))
    query: GetProductDto,
  ) {
    return this.productService.findWithQuery(query);
  }

  @Patch(':id')
  @Version('1')
  @ApiUpdate()
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @Version('1')
  @ApiDelete()
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
