import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger';

// filters
import { AllExceptionsFilter } from '@src/common/filters/all-exceptions.filter';

@Controller()
@ApiTags('Root')
@UseFilters(AllExceptionsFilter)
export class RootController {
  @Get('/')
  index() {
    return { ok: true };
  }

  @Get('/throw')
  @ApiInternalServerErrorResponse({
    description: 'Internal server error test',
  })
  throwError(): void {
    throw new HttpException(
      { message: 'Sample Error' },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
