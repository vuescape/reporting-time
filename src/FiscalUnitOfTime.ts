import { UnitOfTime } from './UnitOfTime'
import { UnitOfTimeKind } from './UnitOfTimeKind'

/** Represents a unit of time in the context of some company's fiscal year. */
export abstract class FiscalUnitOfTime extends UnitOfTime {
  public get unitOfTimeKind() {
    return UnitOfTimeKind.Fiscal
  }
}
