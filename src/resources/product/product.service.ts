import { Injectable, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AerospikeService } from '@resources/aerospike/aerospike.service';
import { GetProductDto } from './dto/get-product.dto';
import { AerospikeError } from 'aerospike';

@Injectable()
export class ProductService {
  logger = new Logger(ProductService.name);

  constructor(private readonly aerospikeService: AerospikeService) {}

  async create(createProductDto: CreateProductDto) {
    this.logger.log('Guardando datos en Aerospike');
    try {
      const data = await this.aerospikeService.setData(
        createProductDto.id,
        createProductDto,
      );
      this.logger.log('Datos guardados en Aerospike');
      return data;
    } catch (error) {
      this.logger.error(error);
      return 'Error al guardar los datos';
    }
  }

  async findAll() {
    try {
      console.time('🕑findAll'); // Medición tiempo de respuesta.
      const data = await this.aerospikeService.getAllData();
      console.timeEnd('🕑findAll');
      return data;
    } catch (error) {
      this.logger.error(error);
      return 'Error al obtener los datos';
    }
  }

  async findWithQuery(query: GetProductDto) {
    this.logger.log('Buscando datos en Aerospike');
    try {
      const data = await this.aerospikeService.getDataByQuery(query);
      this.logger.log('Búsqueda finalizada.');
      return data;
    } catch (error) {
      this.logger.error(error);
      return 'Error al obtener los datos';
    }
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    this.logger.log('Actualizando datos en Aerospike');
    try {
      const data = this.aerospikeService.updateData(id, updateProductDto);
      this.logger.log('Datos actualizados en Aerospike');
      return data;
    } catch (error) {
      this.logger.error(error);
      return 'Error al actualizar los datos';
    }
  }

  remove(id: number) {
    this.logger.log('Eliminando datos en Aerospike');
    try {
      const data = this.aerospikeService.deleteData(id);
      return data;
    } catch (error) {
      this.logger.error(error);
      return 'Error al eliminar los datos';
    }
  }
}
