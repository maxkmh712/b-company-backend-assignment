import { Injectable } from '@nestjs/common';
import { GetDiscountAvailableDateDto } from './get-discount-available-date.dto';

type ProductMap = Map<string, number>;

@Injectable()
export class DiscountEventService {
  /**
   * @description 문제 3. 할인행사 -> 원하는 제품을 모두 할인 받가 위한 회원등록 날짜 수 구하기
   */
  public getDiscountAvailableDate(query: GetDiscountAvailableDateDto): number {
    const { want, number, discount } = query;

    const wantMap = this.createWantMap(want, number);

    // 모두 할인 받을 수 있는 날짜 변수 선언
    let discountAvailableDate = 0;

    for (let i = 0; i <= discount.length - 10; i++) {
      // 슬라이딩 윈도우 알고리즘 활용하여 10일 단위로 할인받을 수 있는 목록 배열(윈도우) 생성
      const window = discount.slice(i, i + 10);

      const discountMap = this.createDiscountMap(window);

      if (this.isMatchingMap(wantMap, discountMap)) {
        discountAvailableDate += 1;
      }
    }

    return discountAvailableDate;
  }

  /**
   * @description 원하는 목록의 상품명과 수량으로 맵 생성
   */
  private createWantMap(
    want: GetDiscountAvailableDateDto['want'],
    number: GetDiscountAvailableDateDto['number'],
  ): ProductMap {
    return want.reduce((map, item, index) => {
      map.set(item, number[index]);

      return map;
    }, new Map<string, number>());
  }

  /**
   * @description 할인하는 목록의 상품명과 수량으로 맵 생성
   */
  private createDiscountMap(
    discountWindow: GetDiscountAvailableDateDto['discount'],
  ): ProductMap {
    return discountWindow.reduce((map, item) => {
      map.set(item, (map.get(item) || 0) + 1);

      return map;
    }, new Map<string, number>());
  }

  /**
   * @description 원하는 목록의 맵과 할인하는 목록의 맵이 일치하는지 확인
   */
  private isMatchingMap(wantMap: ProductMap, discountMap: ProductMap): boolean {
    for (const [key, value] of wantMap.entries()) {
      // 할인하는 상품의 수량과 원하는 상품의 수량이 모두 같아야 하기 떄문에 하나라도 같지 않으면 false 반환
      if (discountMap.get(key) !== value) {
        return false;
      }
    }

    return true;
  }
}
