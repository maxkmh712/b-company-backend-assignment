import { Transform } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
} from 'class-validator';
import { TotalSumTen } from './total-sum-ten.decorator';

export class GetDiscountAvailableDateDto {
  @IsArray({ message: "'want'파라미터는 배열이어야 합니다." })
  @IsNotEmpty({ message: "'want' 파라미터는 빈 값일 수 없습니다." })
  @ArrayMinSize(1, {
    message: "'want' 파라미터의 길이는 최소 1이어야 합니다.",
  })
  @ArrayMaxSize(10, {
    message: "'want' 파라미터의 길이는 최대 10이어야 합니다.",
  })
  @Transform(({ value }) => {
    return JSON.parse(value);
  })
  want: string[];

  @IsArray({ message: "'number'파라미터는 배열이어야 합니다." })
  @IsNotEmpty({ message: "'number' 파라미터는 빈 값일 수 없습니다." })
  @ArrayMinSize(1, {
    message: "'number' 파라미터의 길이는 최소 1이어야 합니다.",
  })
  @ArrayMaxSize(10, {
    message: "'number' 파라미터의 길이는 최대 10이어야 합니다.",
  })
  @Transform(({ value }) => {
    return JSON.parse(value);
  })
  @TotalSumTen()
  number: number[];

  @IsArray({ message: "'discount'파라미터는 배열이어야 합니다." })
  @IsNotEmpty({ message: "'discount' 파라미터는 빈 값일 수 없습니다." })
  @ArrayMinSize(10, {
    message: "'number' 파라미터의 길이는 최소 1이어야 합니다.",
  })
  @ArrayMaxSize(100000, {
    message: "'number' 파라미터의 길이는 최대 100,000이어야 합니다.",
  })
  @Transform(({ value }) => {
    return JSON.parse(value);
  })
  discount: string[];
}
