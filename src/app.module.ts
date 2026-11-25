import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { Sonho } from './sonhos.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SonhosModule } from './sonho.module.js';


export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
   
   TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '12345678',
    database: 'sonhos_db',
    entities: [Sonho],
    synchronize: true,
    logging: true,
    }),

  SonhosModule,
  ],
})
export class AppModule {}
