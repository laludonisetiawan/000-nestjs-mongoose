import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './schemas/cat.schemas';
import { Model } from 'mongoose';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = await this.catModel.create(createCatDto);
    return createdCat;
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }

  async findOne(id: string): Promise<Cat> {
    return this.catModel.findOne({ _id: id }).exec();
  }

  async update(id: string, updateCatDto: UpdateCatDto): Promise<Cat> {
    const existingCat = await this.catModel
      .findByIdAndUpdate(id, updateCatDto, { new: true })
      .exec();

    if (!existingCat) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    return existingCat;
  }

  async delete(id: string) {
    const deletedCat = await this.catModel
      .findByIdAndDelete({ _id: id })
      .exec();
    return deletedCat;
  }
}
