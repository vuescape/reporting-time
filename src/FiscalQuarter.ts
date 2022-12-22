import { FiscalUnitOfTime } from './FiscalUnitOfTime'
import { IHaveAQuarter } from './IHaveAQuarter'
import { QuarterNumber } from './QuarterNumber'
import { UnitOfTimeGranularity } from './UnitOfTimeGranularity'

/** Represents a fiscal quarter of a specified year. */
export class FiscalQuarter extends FiscalUnitOfTime implements IHaveAQuarter {
  private yearValue: number
  private quarterNumberValue: QuarterNumber

  public get quarterNumber() {
    return this.quarterNumberValue
  }

  public get year(): number {
    return this.yearValue
  }

  public get unitOfTimeGranularity(): UnitOfTimeGranularity {
    return UnitOfTimeGranularity.Quarter
  }

  public constructor(year: number, quarterNumber: QuarterNumber) {
    super()
    if (!Number.isInteger(year) || year < 1 || year > 9999) {
      throw new RangeError(`year, '${year}', must be a positive integer less than or equal to 9999.`)
    }
    if (!Object.values(QuarterNumber).includes(quarterNumber)) {
      throw new RangeError(`quarterNumber, ${quarterNumber}, must be a valid QuarterNumber.`)
    }
    this.yearValue          = year
    this.quarterNumberValue = quarterNumber
  }

  public equals(value: FiscalQuarter) {
    if (this === value) {
      return true
    }
    if (!((value as any) instanceof FiscalQuarter)) {
      return false
    }
    const result = this.year === value.year && this.quarterNumber === value.quarterNumber
    return result
  }

  public valueOf() {
    return this.year * 10 + this.quarterNumber
  }

  public toString(): string {
    const result = `${this.quarterNumber}Q${this.year.toString().padStart(4, '0')}`
    return result
  }
}
