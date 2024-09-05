import { Module } from '@nestjs/common';
import { PrivacyExpirationModule } from './1.privacy-expiration/privacy-expiration.module';
import { BudgetModule } from './2.budget/budget.module';
import { DiscountEventModule } from './3.discount-event/discount-event.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PrivacyExpirationModule, BudgetModule, DiscountEventModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
