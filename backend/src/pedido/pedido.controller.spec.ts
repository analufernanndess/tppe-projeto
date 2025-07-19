import { Test, TestingModule } from '@nestjs/testing';
import { PedidoController } from './pedido.controller';

describe('PedidoController', () => {
  let controller: PedidoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PedidoController],
    }).compile();

    controller = module.get<PedidoController>(PedidoController);
  });

  it('should be defined', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    expect(controller).toBeDefined();
  });
});
