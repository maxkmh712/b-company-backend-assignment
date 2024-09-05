import { Controller, Get, Query } from '@nestjs/common';
import { GetExpiredPrivacyQueryDto } from './get-expired-privacy.dto';
import { PrivacyExpirationService } from './privacy-expiration.service';

@Controller('privacy-expiration')
export class PrivacyExpirationController {
  constructor(
    private readonly privacyExpirationService: PrivacyExpirationService,
  ) {}

  // 문제 1.개인정보 유효기간
  @Get()
  getExpiredPrivacy(@Query() query: GetExpiredPrivacyQueryDto): number[] {
    return this.privacyExpirationService.getExpiredPrivacy(query);
  }
}
