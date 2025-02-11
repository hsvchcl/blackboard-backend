import { Test, TestingModule } from '@nestjs/testing';
import { AerospikeService } from './aerospike.service';

describe('AerospikeService', () => {
  let service: AerospikeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AerospikeService],
    }).compile();

    service = module.get<AerospikeService>(AerospikeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
