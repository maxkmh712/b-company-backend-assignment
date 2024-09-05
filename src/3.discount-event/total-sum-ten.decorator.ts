import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class TotalSumTenConstraint implements ValidatorConstraintInterface {
  validate(numbers: number[], args: ValidationArguments) {
    return numbers.reduce((acc, val) => acc + val, 0) === 10;
  }

  defaultMessage(args: ValidationArguments) {
    return `'${args.property}' 배열의 총합은 10이어야 합니다. 현재 총합은 ${args.value.reduce((acc, val) => acc + val, 0)}입니다.`;
  }
}

export function TotalSumTen(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: TotalSumTenConstraint,
    });
  };
}
