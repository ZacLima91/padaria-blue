import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/users/entity/users.entity';
import { handleConstrainUniqueError } from 'src/utils/handle-error-unique.util';
import { CreateProductDto } from './dto/create-product.dto';
import { FavoriteProductDto } from '../favorites/dto/favorite.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Favorite } from 'src/favorites/entities/favorites.entity';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProductDto): Promise<Product | void> {
    return this.prisma.product
      .create({ data: dto })
      .catch(handleConstrainUniqueError);
  }

  findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async verifyIdAndReturnUser(id: string): Promise<Product> {
    const product: Product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Entrada de id ${id} não encontrada`);
    }

    return product;
  }

  findOne(id: string): Promise<Product> {
    return this.verifyIdAndReturnUser(id);
  }

  async update(id: string, dto: UpdateProductDto): Promise<Product | void> {
    await this.verifyIdAndReturnUser(id);
    return this.prisma.product
      .update({ where: { id }, data: dto })
      .catch(handleConstrainUniqueError);
  }

  async remove(id: string): Promise<Product> {
    await this.verifyIdAndReturnUser(id);
    return this.prisma.product.delete({ where: { id } });
  }
  async favorite(dto: FavoriteProductDto): Promise<Favorite> {
    const user: User = await this.prisma.user.findUnique({
      where: { id: dto.userId },
    });
    if (!user) {
      throw new NotFoundException(`Entrada de id ${dto.userId} não encontrada`);
    }

    const product: Product = await this.prisma.product.findUnique({
      where: { name: dto.productName },
    });

    if (!product) {
      throw new NotFoundException(
        `Produto de nome '${dto.productName}' não encontrado`,
      );
    }
    return this.prisma.favorite.create({ data: dto });
  }

  async disfavoring(id: string) {
    await this.verifyIdAndReturnUser(id);
    return this.prisma.favorite.delete({ where: { id } });
  }

  async findUsersLiked(id: string) {
    const product: Product = await this.prisma.product.findUnique({
      where: { id },
    });

    return this.prisma.favorite.findMany({
      where: {
        productName: product.name,
      },
      select: {
        productName: true,
        user: { select: { id: true, email: true } },
      },
    });
  }
}
