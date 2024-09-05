import { Injectable } from '@nestjs/common';
import { GetSupportingDepartmentsQueryDto } from './get-supporting-department-max-count.dto';

@Injectable()
export class BudgetService {
  /**
   * @description 문제 2. 예산 -> 예산 내 지원받을 수 있는 최대 부서수 구하기
   */
  public getSupportingDepartmentMaxCount(
    query: GetSupportingDepartmentsQueryDto,
  ): number {
    const { d, budget } = query;

    d.sort((a, b) => a - b); // 부서별 신청 금액 오름차순 정렬

    let usedBudget = 0; // 사용된 총 금액
    let maxCount = 0; // 최대 지원가능 부서 수

    for (const amount of d) {
      // 오름차순 정렬된 부선별 신청금액을 순회하면서
      if (usedBudget + amount <= budget) {
        // 총 사용된 금액이 예산을 넘지 않았으면
        maxCount += 1; // 지원 받은 부서수를 1 증가시키고
        usedBudget += amount; // 사용된 금액을 업데이트
      } else {
        break; // 총 사용된 금액이 예산을 넘을 떄 순회 종료
      }
    }

    return maxCount;
  }
}
