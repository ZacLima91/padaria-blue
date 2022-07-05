import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { Table } from './entities/table.entity';

@Injectable()
export class TablesService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateTableDto): Promise<Table> {
    return this.prisma.table.create({ data: dto });
  }

  findAll(): Promise<Table[]> {
    return this.prisma.table.findMany();
  }

  findOne(id: string): Promise<Table> {
    return this.verifyIdAndReturnTable(id);
  }

  async verifyIdAndReturnTable(id: string): Promise<Table> {
    const table: Table = await this.prisma.table.findUnique({
      where: { id },
    });

    if (!table) {
      throw new NotFoundException(`Entrada de id ${id} não encontrada`);
    }

    return table;
  }

  handleConstrainUniqueError(error: Error): never {
    const splitedMessage = error.message.split('`');

    const errorMessage = `Entrada '${
      splitedMessage[splitedMessage.length - 2]
    }' não está respeitando a constraint UNIQUE`;
    throw new UnprocessableEntityException(errorMessage);
  }

  async update(id: string, dto: UpdateTableDto): Promise<Table> {
    await this.verifyIdAndReturnTable(id);
    return this.prisma.table.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.verifyIdAndReturnTable(id);
    return this.prisma.table.delete({
      where: { id },
      select: { number: true },
    });
  }
}
