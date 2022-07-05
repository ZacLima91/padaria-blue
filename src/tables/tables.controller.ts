import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TablesService } from './tables.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { Table } from './entities/table.entity';

@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Post()
  create(@Body() dto: CreateTableDto): Promise<Table> {
    return this.tablesService.create(dto);
  }

  @Get()
  findAll(): Promise<Table[]> {
    return this.tablesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Table> {
    return this.tablesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTableDto): Promise<Table> {
    return this.tablesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tablesService.remove(id);
  }
}
