import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import type { ItemResponseDecoded } from './dto/response-item.dto';

// import { Value } from '@sinclair/typebox/value';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<ItemResponseDecoded[]> {
    const items = await this.prisma.item.findMany();

    return items;
  }

  async findOne(id: number): Promise<ItemResponseDecoded | null> {
    const item = await this.prisma.item.findUnique({
      where: { id },
    });

    if (!item) {
      return null;
    }

    return item;
  }
}
