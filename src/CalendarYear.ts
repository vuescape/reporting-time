import { CalendarUnitOfTime } from './CalendarUnitOfTime'
import { IHaveAYear } from './IHaveAYear'
import { UnitOfTimeGranularity } from './UnitOfTimeGranularity'

/** Represents a calendar year. */
export class CalendarYear extends CalendarUnitOfTime implements IHaveAYear {
  private yearValue: number

  public get year(): number {
    return this.yearValue
  }

  public get unitOfTimeGranularity(): UnitOfTimeGranularity {
    return UnitOfTimeGranularity.Year
  }

  public constructor(year: number) {
    super()
    if (!Number.isInteger(year) || year < 1 || year > 9999) {
      throw new RangeError(`year, '${year}', must be a positive integer less than or equal to 9999.`)
    }
    this.yearValue = year
  }

  public equals(value: CalendarYear) {
    if (value === undefined || !((value as any) instanceof CalendarYear)) {
      return false
    }
    return this.year === value.year
  }

  public valueOf() {
    return this.year
  }

  public toString(): string {
    const result = `CY${this.year.toString().padStart(4, '0')}`
    return result
  }
}
