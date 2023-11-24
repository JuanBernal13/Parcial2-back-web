/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';



@Module({
  imports: [
    
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: '123',
      database: 'prueba',
      entities: [], 
      synchronize: true, 
      keepConnectionAlive: true,
      logging: true,

    }),
    
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
