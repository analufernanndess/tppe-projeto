import { Test, TestingModule } from '@nestjs/testing';
import { ClienteService } from './cliente.service';

describe('ClienteService', () => {
  let service: ClienteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClienteService],
    }).compile();

    service = module.get<ClienteService>(ClienteService);
  });

  it('should be defined', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    expect(service).toBeDefined();
  });
});
