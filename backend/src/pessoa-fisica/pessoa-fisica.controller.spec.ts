import { Test, TestingModule } from '@nestjs/testing';
import { PessoaFisicaController } from './pessoa-fisica.controller';

describe('PessoaFisicaController', () => {
  let controller: PessoaFisicaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PessoaFisicaController],
    }).compile();

    controller = module.get<PessoaFisicaController>(PessoaFisicaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
