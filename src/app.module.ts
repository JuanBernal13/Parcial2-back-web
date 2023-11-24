/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AerolineaModule } from './aerolinea/aerolinea.module'; // Importa el módulo de Aerolinea
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aerolinea } from './aerolinea/aerolinea.entity'; // Importa la entidad Aerolinea
import { AeropuertoModule } from './aeropuerto/aeropuerto.module';
import { Aeropuerto } from './aeropuerto/aeropuerto.entity';

@Module({
  imports: [
    AerolineaModule,
    AeropuertoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: '123',
      database: 'prueba',
      entities: [Aerolinea,Aeropuerto], // Incluye solo la entidad Aerolinea
      synchronize: true, // Cuidado con esto en un entorno de producción
      keepConnectionAlive: true,
      logging: true,

    }),
          
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
