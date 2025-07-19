import { Test, TestingModule } from '@nestjs/testing';
import { PessoaFisicaService } from './pessoa-fisica.service';

describe('PessoaFisicaService', () => {
  let service: PessoaFisicaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PessoaFisicaService],
    }).compile();

    service = module.get<PessoaFisicaService>(PessoaFisicaService);
  });

  it('should be defined', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    expect(service).toBeDefined();
  });
});
