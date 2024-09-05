import { Controller, Get, Query } from '@nestjs/common';
import { DiscountEventService } from './discount-event.service';
import { GetDiscountAvailableDateDto } from './get-discount-available-date.dto';

@Controller('discount-event')
export class DiscountEventController {
  constructor(private readonly discountEventService: DiscountEventService) {}

  @Get()
  getDiscountAvailableDate(@Query() query: GetDiscountAvailableDateDto) {
    return this.discountEventService.getDiscountAvailableDate(query);
  }
}
