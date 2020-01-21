import { FiscalUnitOfTime } from './FiscalUnitOfTime'
import { IHaveAYear } from './IHaveAYear'
import { UnitOfTimeGranularity } from './UnitOfTimeGranularity'

/** Represents a fiscal year. */
export class FiscalYear extends FiscalUnitOfTime implements IHaveAYear {
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

  public equals(value: FiscalYear) {
    if (this === value) {
      return true
    }
    if (!((value as any) instanceof FiscalYear)) {
      return false
    }
    const result = this.year === value.year
    return result
  }

  public valueOf() {
    return this.year
  }

  public toString(): string {
    const result = `FY${this.year.toString().padStart(4, '0')}`
    return result
  }
}
