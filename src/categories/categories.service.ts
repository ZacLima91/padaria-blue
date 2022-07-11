import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleConstrainUniqueError } from 'src/utils/handle-error-unique.util';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateCategoryDto): Promise<Category> {
    return this.prisma.category
      .create({ data: dto })
      .catch(handleConstrainUniqueError);
  }

  findAll(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }

  async verifyIdAndReturnCategory(id: string): Promise<Category> {
    const category: Category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`Entrada de id ${id} não encontrada`);
    }

    return category;
  }

  findOne(id: string): Promise<Category> {
    return this.verifyIdAndReturnCategory(id);
  }

  async update(id: string, dto: UpdateCategoryDto): Promise<Category> {
    await this.verifyIdAndReturnCategory(id);
    return this.prisma.category
      .update({ where: { id }, data: dto })
      .catch(handleConstrainUniqueError);
  }

  async remove(id: string) {
    await this.verifyIdAndReturnCategory(id);
    return this.prisma.category.delete({
      where: { id },
      select: { name: true },
    });
  }
}
