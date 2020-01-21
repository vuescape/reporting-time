import { GenericUnitOfTime } from './GenericUnitOfTime'
import { IHaveAYear } from './IHaveAYear'
import { UnitOfTimeGranularity } from './UnitOfTimeGranularity'

/** Represents a generic year. */
export class GenericYear extends GenericUnitOfTime implements IHaveAYear {
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

  public equals(value: GenericYear) {
    if (this === value) {
      return true
    }
    if (!((value as any) instanceof GenericYear)) {
      return false
    }
    const result = this.year === value.year
    return result
  }

  public valueOf() {
    return this.year
  }

  public toString(): string {
    const result = `${this.year.toString().padStart(4, '0')}`
    return result
  }
}
