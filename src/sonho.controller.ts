import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    ParseIntPipe
}from '@nestjs/common'

import { SonhosService } from './sonho.service.js'

@Controller('sonhos')
export class SonhosController {

    constructor(
        private readonly sonhosService: SonhosService
    ){}

    @Get()
    listar(){
        return this.sonhosService.listar();
    }

    @Get(':id')
    buscarPorId(
        @Param('id', ParseIntPipe) id: number
    ){
        return this.sonhosService.buscarPorId(id);
    }

    @Post()
    cadastrar(
        @Body() dados:{
            descricao: string
            meta: string;
        }
    ){
        return this.sonhosService.cadastrar(dados);
    }

    @Put(':id')
    atualizar(
        @Param('id', ParseIntPipe) id: number,
        @Body() dados: {
            descricao?: string;
            meta?: string;
        }
    ){
        return this.sonhosService.atualizar(id, dados);
    }

    @Delete(':id')
    remover(
        @Param('id', ParseIntPipe) id: number
    ){
        return this.sonhosService.remover(id);
    }
}