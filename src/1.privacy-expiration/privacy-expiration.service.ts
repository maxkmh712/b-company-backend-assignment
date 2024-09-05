import { Injectable } from '@nestjs/common';
import { GetExpiredPrivacyQueryDto } from './get-expired-privacy.dto';

@Injectable()
export class PrivacyExpirationService {
  /**
   * @description 문제 1.개인정보 유효기간 -> 유효기간이 지나 파기되어야 하는 개인정보 번호 구하기
   */
  public getExpiredPrivacy(query: GetExpiredPrivacyQueryDto): number[] {
    const { today, terms, privacies } = query;

    const todayDate = this.stringToDate(today);

    // 약관별 유효기간을 Map으로 변환
    const termsMap = this.createTermsMap(terms);

    const expiredPrivacyNumber = this.getExpiredPrivacyNumber(
      privacies,
      termsMap,
      todayDate,
    );

    return expiredPrivacyNumber;
  }

  /**
   * @description 유효기간이 지난 약관번호 반환
   */
  private getExpiredPrivacyNumber(
    privacies: GetExpiredPrivacyQueryDto['privacies'],
    termsMap: Map<string, number>,
    todayDate: Date,
  ): number[] {
    return privacies.reduce<number[]>((expiredNumbers, privacy, index) => {
      const [privacyDate, termType] = privacy.split(' ');
      const validMonths = termsMap.get(termType);

      if (
        validMonths !== undefined &&
        this.isPrivacyExpired(privacyDate, validMonths, todayDate)
      ) {
        expiredNumbers.push(index + 1);
      }

      return expiredNumbers;
    }, []);
  }

  /**
   * @description 약관별 유효기간을 Map으로 변환
   */
  private createTermsMap(terms: string[]): Map<string, number> {
    return terms.reduce((map, term) => {
      const [type, duration] = term.split(' ');

      map.set(type, parseInt(duration, 10));

      return map;
    }, new Map<string, number>());
  }

  /**
   * @description 개인정보의 보관기간 만료 여부 확인
   */
  private isPrivacyExpired(
    privacyDate: string,
    validMonths: number,
    todayDate: Date,
  ): boolean {
    const expirationDate = this.calculateExpirationDate(
      privacyDate,
      validMonths,
    );

    return expirationDate < todayDate;
  }

  /**
   * @description 모든 달은 28일까지 있다는 조건에 맞추어 보관기간 만료 날짜 계산
   */
  private calculateExpirationDate(
    collectedDate: string,
    validMonths: number,
  ): Date {
    let [year, month, day] = collectedDate.split('.').map(Number);
    const MONTHS_IN_YEAR = 12;
    const LAST_DAY_OF_MONTH = 28;

    month += validMonths;

    while (month > MONTHS_IN_YEAR) {
      month -= MONTHS_IN_YEAR;
      year += 1;
    }

    if (day === 1) {
      day = LAST_DAY_OF_MONTH;
      month -= 1;
      if (month === 0) {
        year -= 1;
        month = MONTHS_IN_YEAR;
      }
    } else {
      day -= 1;
    }

    const expirationDate = `${year}.${month}.${day}`;

    return this.stringToDate(expirationDate);
  }

  /**
   * @description 문자열 형식의 날짜 입력값을 Date 객체로 반환
   */
  private stringToDate(date: string): Date {
    const [year, month, day] = date.split('.').map(Number);

    // 시간을 00:00:00으로 설정하여 UTC 시간이 아닌 입력값 그대로의 날짜 출력
    return new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
  }
}
