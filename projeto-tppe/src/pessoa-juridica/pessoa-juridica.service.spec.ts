import { Test, TestingModule } from '@nestjs/testing';
import { PessoaJuridicaService } from './pessoa-juridica.service';

describe('PessoaJuridicaService', () => {
  let service: PessoaJuridicaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PessoaJuridicaService],
    }).compile();

    service = module.get<PessoaJuridicaService>(PessoaJuridicaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
