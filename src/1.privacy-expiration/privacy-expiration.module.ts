import { Module } from '@nestjs/common';
import { PrivacyExpirationService } from './privacy-expiration.service';
import { PrivacyExpirationController } from './privacy-expiration.controller';

@Module({
  controllers: [PrivacyExpirationController],
  providers: [PrivacyExpirationService],
})
export class PrivacyExpirationModule {}
