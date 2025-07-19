import { Test, TestingModule } from '@nestjs/testing';
import { PessoaJuridicaController } from './pessoa-juridica.controller';

describe('PessoaJuridicaController', () => {
  let controller: PessoaJuridicaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PessoaJuridicaController],
    }).compile();

    controller = module.get<PessoaJuridicaController>(PessoaJuridicaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
