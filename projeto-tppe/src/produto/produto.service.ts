import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from './entity/produto.entity';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>,
    ) {}

    create(dto: CreateProdutoDto) {
        const novoProduto = this.produtoRepository.create(dto);
        return this.produtoRepository.save(novoProduto);
    }

    findAll() {
        return this.produtoRepository.find();
    }

    findOne(id: number) {
        return this.produtoRepository.findOne({ where: { id } });
    }

    async update(id: number, dto: UpdateProdutoDto) {
        const produto = await this.findOne(id);
        if (!produto) throw new NotFoundException(`Produto ${id} não encontrado`);

        Object.assign(produto, dto);
        return this.produtoRepository.save(produto);
    }

    async remove(id: number) {
        const resultado = await this.produtoRepository.delete(id);
        if (resultado.affected === 0) {
            throw new NotFoundException(`Produto ${id} não encontrado`);
        }
    }
}
