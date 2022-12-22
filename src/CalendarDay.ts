import { CalendarUnitOfTime } from './CalendarUnitOfTime'
import { DayOfMonth } from './DayOfMonth'
import { IHaveAMonth } from './IHaveAMonth'
import { MonthNumber } from './MonthNumber'
import { MonthOfYear } from './MonthOfYear'
import { UnitOfTimeGranularity } from './UnitOfTimeGranularity'

/** Represents a calendar month in a specified year. */
export class CalendarDay extends CalendarUnitOfTime implements IHaveAMonth {
  private yearValue: number
  private monthNumberValue: MonthNumber
  private dayOfMonthValue: DayOfMonth

  public get year(): number {
    return this.yearValue
  }

  public get monthNumber() {
    return this.monthNumberValue
  }

  public get dayOfMonth() {
    return this.dayOfMonthValue
  }

  public get unitOfTimeGranularity(): UnitOfTimeGranularity {
    return UnitOfTimeGranularity.Day
  }

  public constructor(year: number, monthNumber: MonthNumber | MonthOfYear, dayOfMonth: DayOfMonth) {
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

    const dayOfMonthValue = dayOfMonth as number
    if (!Object.values(DayOfMonth).includes(dayOfMonth)) {
      throw new RangeError(`dayOfMonth, ${dayOfMonthValue}, must be a valid DayOfMonth.`)
    }

    if (dayOfMonthValue === DayOfMonth.Invalid) {
      throw new RangeError(`dayOfMonth, ${dayOfMonth}, must not be Invalid.`)
    }

    this.yearValue        = year
    this.monthNumberValue = monthNumberValue
    this.dayOfMonthValue  = dayOfMonthValue
  }

  public equals(value: CalendarDay) {
    if (this === value) {
      return true
    }
    if (!((value as any) instanceof CalendarDay)) {
      return false
    }
    const result = this.year === value.year && this.monthNumber === value.monthNumber && this.dayOfMonth === value.dayOfMonth
    return result
  }

  public valueOf() {
    return this.year * 10000 + this.monthNumber * 100 + this.dayOfMonth
  }

  public toString(): string {
    const result = `${this.year.toString().padStart(4, '0')}-${this.monthNumber
      .toString()
      .padStart(2, '0')}-${this.dayOfMonth.toString().padStart(2, '0')}`
    return result
  }
}
