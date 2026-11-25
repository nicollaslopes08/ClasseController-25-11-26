import {
    Injectable,
    BadRequestException,
    NotFoundException
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sonho } from './sonhos.entity.js';

type DadosCadastro = Pick<
Sonho, 'descricao' | 'meta'>;

type DadosAtualizacao = Partial<DadosCadastro>;

@Injectable()
export class SonhosService {

    constructor(
        @InjectRepository(Sonho)
        private readonly sonhoRepository: Repository<Sonho>
    ){}

    private validarTexto(valor: unknown, campo: string): string {
        if (typeof valor !== 'string' || !valor.trim()) {
            throw new BadRequestException(
                `${campo} deve ser um taxto não vazio`
            );
        }

        return valor.trim();
    }


listar(): Promise<Sonho[]>{
    return this.sonhoRepository.find();
}

async buscarPorId(id: number): Promise<Sonho>{
    const sonho = await this.sonhoRepository.findOneBy({id});

    if (!sonho) {
        throw new NotFoundException('Sonho não encontrado')
    }
    return sonho;
}

cadastrar(dados: DadosCadastro): Promise<Sonho> {
    const sonho = this.sonhoRepository.create({
        descricao: this.validarTexto(
            dados?.descricao, 'descricao'
        ),
        meta: this.validarTexto(
            dados?.meta, 'meta'
        )
    });

    return this.sonhoRepository.save(sonho);
}

async atualizar(
    id: number,
    dados: DadosAtualizacao
): Promise<Sonho>{

    if (!dados || (dados.descricao === undefined &&
        dados.meta === undefined)){
            throw new BadRequestException(
                'Informe os dados para atualização'
            );
        }

        const sonho = await this.buscarPorId(id);

        if (dados.descricao !== undefined) {
            sonho.descricao = this.validarTexto(
                dados.descricao, 'descricao'
            );
        }

        if (dados.meta !== undefined) {
            sonho.meta = this.validarTexto(
                dados.meta, 'meta'
            );
        }
        return this.sonhoRepository.save(sonho);
    
}

async remover(id: number) {
    const sonho = await this.buscarPorId(id);

    await this.sonhoRepository.remove(sonho);

    return{
        mensagem: 'Sonho excluido com sucesso'
    };
}
}