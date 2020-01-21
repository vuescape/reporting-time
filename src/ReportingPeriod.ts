import { UnitOfTime } from './UnitOfTime'

/** Represents a range of time over which to report, inclusive of the endpoints. */
export class ReportingPeriod {
  private startValue: UnitOfTime

  private endValue: UnitOfTime

  public get start(): UnitOfTime {
    return this.startValue
  }

  public get end(): UnitOfTime {
    return this.endValue
  }

  public constructor(start: UnitOfTime, end: UnitOfTime) {
    if ((start as any).constructor !== (end as any).constructor) {
      throw new Error('start and end are different concrete types of units-of-time.')
    }
    if (start.valueOf() > end.valueOf()) {
      throw new RangeError('start is greater than end.')
    }
    this.startValue = start
    this.endValue = end
  }

  public equals(value: ReportingPeriod) {
    if (this === value) {
      return true
    }
    if (!((value as any) instanceof ReportingPeriod)) {
      return false
    }
    const result = this.start.equals(value.start) && this.end.equals(value.end)
    return result
  }

  public toString(): string {
    const result = `${this.start.toString()}-${this.end.toString()}`
    return result
  }
}
