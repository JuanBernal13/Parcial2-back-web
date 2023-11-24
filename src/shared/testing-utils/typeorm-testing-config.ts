/* eslint-disable prettier/prettier */
/* archivo src/shared/testing-utils/typeorm-testing-config.ts */
import { TypeOrmModule } from '@nestjs/typeorm';


export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
   type: 'sqlite',
   database: ':memory:',
   dropSchema: true,
   entities: [], 
   synchronize: true,
   keepConnectionAlive: true
 }),
 TypeOrmModule.forFeature([]), 
];
