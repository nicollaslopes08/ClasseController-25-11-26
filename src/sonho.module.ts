import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Sonho } from "./sonhos.entity.js";
import { SonhosService } from "./sonho.service.js";
import { SonhosController } from "./sonho.controller.js";

@Module({
    imports: [
        TypeOrmModule.forFeature([Sonho])
    ],
    providers: [SonhosService],
    controllers: [SonhosController],
})
export class SonhosModule{}