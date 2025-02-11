import { Module } from '@nestjs/common';
import * as Aerospike from 'aerospike';
import { Logger } from '@nestjs/common';
import { AerospikeService } from './aerospike.service';
import { DUMMY_PRODUCTS } from '@constants/dummy-products.constants';

@Module({
  providers: [
    {
      provide: 'AEROSPIKE_CLIENT',
      useFactory: async () => {
        const client = Aerospike.client({
          hosts: process.env.AEROSPIKE_DB_HOST || '127.0.0.1:3000',
        });
        await client
          .connect()
          .then(async () => {
            Logger.log('✅ Conectado a Aerospike!', 'AerospikeModule');
            await seedData(client);
          })
          .catch((error) => {
            Logger.error(
              '❌ Error al conectar a Aerospike, Revise que servicio este activo',
              error.stack,
              'AerospikeModule',
            );
            process.exit(1);
          });
        return client;
      },
    },
    AerospikeService,
  ],
  exports: ['AEROSPIKE_CLIENT', AerospikeService],
})
export class AerospikeModule {}

// 🔥 Función para insertar productos de ejemplo al arrancar
async function seedData(client: Aerospike.Client) {
  const products = DUMMY_PRODUCTS;

  for (const product of products) {
    const key = new Aerospike.Key('test', 'products', product.id);
    try {
      client.put(key, product as unknown as Aerospike.AerospikeBins);
      Logger.log(`✅ Producto añadido: ${product.name}`, 'AerospikeModule');
    } catch (error) {
      Logger.error(
        `❌ Error al añadir producto ${product.name}:`,
        error.stack,
        'AerospikeModule',
      );
    }
  }
}
