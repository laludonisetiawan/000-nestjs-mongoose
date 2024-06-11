import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodb:27017/nest_mongoose'),
    CatsModule,
  ],
})
export class AppModule {}
