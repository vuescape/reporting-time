import { GenericUnitOfTime } from './GenericUnitOfTime'
import { IHaveAMonth } from './IHaveAMonth'
import { MonthNumber } from './MonthNumber'
import { MonthOfYear } from './MonthOfYear'
import { UnitOfTimeGranularity } from './UnitOfTimeGranularity'

/** Represents a generic month in a specified year. */
export class GenericMonth extends GenericUnitOfTime implements IHaveAMonth {
  private yearValue: number
  private monthNumberValue: MonthNumber

  public get monthNumber() {
    return this.monthNumberValue
  }

  public get year(): number {
    return this.yearValue
  }

  public get unitOfTimeGranularity(): UnitOfTimeGranularity {
    return UnitOfTimeGranularity.Month
  }

  public constructor(year: number, monthNumber: MonthNumber | MonthOfYear) {
    super()
    if (!Number.isInteger(year) || year < 1 || year > 9999) {
      throw new RangeError(`year, '${year}', must be a positive integer less than or equal to 9999.`)
    }

    const monthNumberValue = monthNumber as number
    if (!Object.values(MonthNumber).includes(monthNumberValue)) {
      throw new RangeError(`monthNumber, ${monthNumberValue}, must be a valid MonthNumber.`)
    }

    if (monthNumberValue === MonthNumber.Invalid) {
      throw new RangeError(`monthNumber, ${monthNumberValue}, must not be Invalid.`)
    }

    this.yearValue        = year
    this.monthNumberValue = monthNumberValue
  }

  public equals(value: GenericMonth) {
    if (this === value) {
      return true
    }
    if (!((value as any) instanceof GenericMonth)) {
      return false
    }
    const result = this.year === value.year && this.monthNumber === value.monthNumber
    return result
  }

  public valueOf() {
    return this.year * 100 + this.monthNumber
  }

  public toString(): string {
    let monthNumberSuffix: string
    switch (this.monthNumber) {
      case MonthNumber.One:
        monthNumberSuffix = 'st'
        break
      case MonthNumber.Two:
        monthNumberSuffix = 'nd'
        break
      case MonthNumber.Three:
        monthNumberSuffix = 'rd'
        break
      default:
        monthNumberSuffix = 'th'
        break
    }
    const result = `${this.monthNumber}${monthNumberSuffix} month of ${this.year.toString().padStart(4, '0')}`
    return result
  }
}
