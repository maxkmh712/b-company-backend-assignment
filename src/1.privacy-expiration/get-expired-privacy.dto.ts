import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, Matches } from 'class-validator';

export class GetExpiredPrivacyQueryDto {
  @IsString()
  @IsNotEmpty({ message: "'today' 파라미터는 빈 값일 수 없습니다." })
  @Matches(/^\d{4}\.\d{2}\.\d{2}$/, {
    message: "'today' 파라미터는 YYYY.MM.DD 형식이어야 합니다.",
  })
  today: string;

  @IsArray({ message: "'terms'파라미터는 배열이어야 합니다." })
  @IsNotEmpty({ message: "'terms' 파라미터는 빈 값일 수 없습니다." })
  @IsString({
    each: true,
    message:
      "'terms'파라미터 각각의 원소는 '약관종류 유효기간' 형식이어야 합니다. ex) 'A 6'",
  })
  @Transform(({ value }) => {
    return JSON.parse(value);
  })
  terms: string[];

  @IsArray({ message: "'privacies'파라미터는 배열이어야 합니다." })
  @IsNotEmpty({ message: "'privacies' 파라미터는 빈 값일 수 없습니다." })
  @IsString({
    each: true,
    message:
      "'privacies'파라미터 각각의 원소는 '날짜 약관종류' 형식이어야 합니다. ex) '2021.05.02 A'",
  })
  @Transform(({ value }) => {
    return JSON.parse(value);
  })
  privacies: string[];
}
