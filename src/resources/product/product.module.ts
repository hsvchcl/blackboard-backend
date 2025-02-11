import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { AerospikeModule } from '@resources/aerospike/aerospike.module';

@Module({
  imports: [AerospikeModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
