import { Transform, Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  Max,
  Min,
} from 'class-validator';

export class GetSupportingDepartmentsQueryDto {
  @IsArray({ message: "'d'파라미터는 배열이어야 합니다." })
  @IsNotEmpty({ message: "'d' 파라미터는 빈 값일 수 없습니다." })
  @ArrayMinSize(1, {
    message: "'d' 파라미터는 최소 1개의 요소를 가져야 합니다.",
  })
  @ArrayMaxSize(100, {
    message: "'d' 파라미터는 최대 100개의 요소를 가질 수 있습니다.",
  })
  @IsInt({ each: true, message: "'d' 파라미터 각각의 원소는 정수여야 합니다." })
  @Min(1, {
    each: true,
    message: "'d' 파라미터 각각의 원소는 최소 1이어야 합니다.",
  })
  @Max(100000, {
    each: true,
    message: "'d' 파라미터 각각의 원소는 최대 100,000이어야 합니다.",
  })
  @Transform(({ value }) => {
    return JSON.parse(value);
  })
  d: number[];

  @IsNumber()
  @IsNotEmpty({ message: "'budget' 파라미터는 빈 값일 수 없습니다." })
  @Min(1, { message: "'budget' 파라미터의 값은 최소 1이어야 합니다." })
  @Max(10000000, {
    message: "'budget' 파라미터의 값은 최대 10,000,000이어야 합니다.",
  })
  @Type(() => Number)
  budget: number;
}
