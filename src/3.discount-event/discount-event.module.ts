import { Module } from '@nestjs/common';
import { DiscountEventService } from './discount-event.service';
import { DiscountEventController } from './discount-event.controller';

@Module({
  controllers: [DiscountEventController],
  providers: [DiscountEventService],
})
export class DiscountEventModule {}
