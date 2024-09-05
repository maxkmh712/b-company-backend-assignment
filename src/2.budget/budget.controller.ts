import { Controller, Get, Query } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { GetSupportingDepartmentsQueryDto } from './get-supporting-department-max-count.dto';

@Controller('budget')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Get()
  getSupportingDepartmentMaxCount(
    @Query() query: GetSupportingDepartmentsQueryDto,
  ): number {
    return this.budgetService.getSupportingDepartmentMaxCount(query);
  }
}
