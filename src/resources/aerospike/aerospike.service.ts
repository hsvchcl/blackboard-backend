import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  OnModuleDestroy,
} from '@nestjs/common';
import { CreateProductDto } from '@resources/product/dto/create-product.dto';
import { GetProductDto } from '@resources/product/dto/get-product.dto';
import * as Aerospike from 'aerospike';

@Injectable()
export class AerospikeService implements OnModuleDestroy {
  private readonly logger = new Logger(AerospikeService.name);
  constructor(
    @Inject('AEROSPIKE_CLIENT') private readonly client: Aerospike.Client,
  ) {}

  async setData(key: number, data: CreateProductDto) {
    this.logger.log('Guardando datos en Aerospike');
    try {
      const writePolicy = new Aerospike.WritePolicy({
        key: Aerospike.policy.key.SEND,
      });
      const aerospikeKey = new Aerospike.Key('test', 'products', key);
      this.client.put(
        aerospikeKey,
        data as unknown as Aerospike.AerospikeBins,
        writePolicy,
      );
      this.logger.log('Datos guardados en Aerospike');
      return {
        success: true,
        message: `${data.name} guardado correctamente`,
      };
    } catch (error) {
      this.logger.error(`Error al guardar los datos: ${error.message}`);
      if (error instanceof Aerospike.AerospikeError) {
        this.handleAerospikeError(error, key);
      } else {
        throw new InternalServerErrorException('Error al guardar los datos');
      }
    }
  }

  async getData(key: number) {
    this.logger.log('Buscando datos en Aerospike');
    try {
      const aerospikeKey = new Aerospike.Key('test', 'products', key);
      const record = await this.client.get(aerospikeKey);
      this.logger.log('Datos encontrados en Aerospike');
      return {
        success: true,
        message: 'Datos encontrados en Aerospike',
        data: record.bins,
      };
    } catch (error) {
      this.logger.error(`Error al obtener los datos: ${error.message}`);
      if (error instanceof Aerospike.AerospikeError) {
        this.handleAerospikeError(error, key);
      } else {
        throw new InternalServerErrorException('Error al obtener los datos');
      }
    }
  }

  async getAllData() {
    this.logger.log('Buscando todos los datos en Aerospike');
    try {
      const query = this.client.query('test', 'products');
      const stream = query.foreach();
      const records = [];
      stream.on('data', (record) => {
        records.push(record.bins);
      });

      return new Promise((resolve, reject) => {
        stream.on('error', (error) => reject(error));
        stream.on('end', () => {
          this.logger.log(`🔍 Se encontraron ${records.length} producto(s).`);
          resolve({
            success: true,
            message: `🔍 Se encontraron ${records.length} producto(s).`,
            data: records.sort((a, b) => b.id - a.id),
          });
        });
      });
    } catch (error) {
      this.logger.error(`Error al obtener los datos: ${error.message}`);
      throw new InternalServerErrorException('Error al obtener los datos');
    }
  }

  async getDataByQuery(queryDto: GetProductDto) {
    this.logger.log(
      `🔍 Buscando datos en Aerospike con los criterios de búsqueda: ${JSON.stringify(
        queryDto,
        null,
        2,
      )}`,
    );
    try {
      const productos = [];
      return new Promise((resolve, reject) => {
        const scan = this.client.scan('test', 'products');

        const stream = scan.foreach();

        stream.on('data', (record) => {
          // Filtrar manualmente los productos que contengan el texto
          if (queryDto.name) {
            if (
              record.bins.name
                .toString()
                .toLocaleLowerCase()
                .includes(queryDto.name.toLowerCase())
            ) {
              productos.push(record.bins);
            }
          }

          // Filtrar por precio:
          if (queryDto.price) {
            if (record.bins.price === queryDto.price) {
              productos.push(record.bins);
            }
          }

          // Filtra por stock:
          if (queryDto.stock) {
            if (record.bins.stock === queryDto.stock) {
              productos.push(record.bins);
            }
          }
        });

        stream.on('end', () => {
          this.logger.log(
            `🔍 Se encontraron ${productos.length} producto(s) con el criterio de búsqueda seleccionado`,
          );
          resolve({
            success: true,
            message: `🔍 Se encontraron ${productos.length} producto(s) con el criterio de búsqueda seleccionado`,
            data: [
              ...new Map(productos.map((item) => [item.id, item])).values(),
            ],
          });
        });
        stream.on('error', (error) => {
          this.logger.error(`Error al obtener los datos: ${error.message}`);
          reject(error);
        });
      });
    } catch (error) {
      this.logger.error(`Error al obtener los datos: ${error.message}`);
      throw new InternalServerErrorException('Error al obtener los datos');
    }
  }

  async updateData(key: number, data: any) {
    try {
      let updatePolicy = new Aerospike.WritePolicy({
        exists: Aerospike.policy.exists.UPDATE,
      });
      const aerospikeKey = new Aerospike.Key('test', 'products', key);
      await this.client.put(aerospikeKey, data, null, updatePolicy);
      return { success: true, message: 'Datos actualizados', data };
    } catch (error) {
      if (error instanceof Aerospike.AerospikeError) {
        this.handleAerospikeError(error, key);
      } else {
        throw new InternalServerErrorException('Error al actualizar los datos');
      }
    }
  }

  async deleteData(key: number) {
    this.logger.log(`Eliminando datos en Aerospike con key: ${key}`);
    try {
      const aerospikeKey = new Aerospike.Key('test', 'products', key);
      await this.client.remove(aerospikeKey);
      this.logger.log(`Datos eliminados en Aerospike con key: ${key}`);
      return {
        success: true,
        message: `Documento eliminado en Aerospike con key: ${key}`,
      };
    } catch (error) {
      this.logger.error(`Error al eliminar los datos: ${error.message}`);
      if (error instanceof Aerospike.AerospikeError) {
        this.handleAerospikeError(error, key);
      } else {
        throw new InternalServerErrorException('Error al eliminar los datos');
      }
    }
  }

  private handleAerospikeError(error: Aerospike.AerospikeError, key: number) {
    switch (error.code) {
      case Aerospike.status.ERR_RECORD_NOT_FOUND:
        throw new NotFoundException(`El registro con key ${key} no existe`);
      case Aerospike.status.ERR_TIMEOUT:
        throw new InternalServerErrorException(
          'Timeout en la base de datos Aerospike',
        );
      case Aerospike.status.ERR_SERVER:
        throw new InternalServerErrorException(
          'Error interno en el servidor de Aerospike',
        );
      default:
        throw new InternalServerErrorException(
          `Error de Aerospike: ${error.message}`,
        );
    }
  }

  onModuleDestroy() {
    this.client.close();
  }
}
