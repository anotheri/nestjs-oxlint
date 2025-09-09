import {
  Controller,
  Param,
  Get,
  NotFoundException,
  UseFilters,
  //
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiExcludeController,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';

// pipes
import { ParseIdPipe } from '@src/common/pipes/parse-id.pipe';

// filters
import { AllExceptionsFilter } from '@src/common/filters/all-exceptions.filter';

// services
import { ItemsService } from './items.service';

// entities
import { Validate } from 'nestjs-typebox';
import {
  ItemResponseSchema,
  ItemListResponseSchema,
} from './dto/response-item.dto';
import type { ItemResponseDecoded } from './dto/response-item.dto';
import {
  exampleItemEntity,
  exampleItemList,
} from './dto/response-item.dto.mock';

@Controller('items')
@ApiTags('Items')
@ApiExcludeController()
@UseFilters(AllExceptionsFilter)
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get('/')
  @Validate({
    response: {
      schema: ItemListResponseSchema,
      description: 'Returns the list of items',
      example: exampleItemList(),
    },
  })
  async index(): Promise<ItemResponseDecoded[]> {
    return this.itemsService.findAll();
  }

  @Get(':id')
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @Validate({
    response: {
      schema: ItemResponseSchema,
      description: 'Returns item details',
      example: exampleItemEntity(),
    },
  })
  async show(
    @Param('id', ParseIdPipe()) id: number,
  ): Promise<ItemResponseDecoded> {
    const item = await this.itemsService.findOne(id);

    if (!item) {
      throw new NotFoundException({
        error: 'Not found',
        code: 'exceptions.NOT_FOUND',
      });
    }

    return item;
  }
}
