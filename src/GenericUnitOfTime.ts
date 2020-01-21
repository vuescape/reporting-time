import { UnitOfTime } from './UnitOfTime'
import { UnitOfTimeKind } from './UnitOfTimeKind'

/** Represents a generic unit of time, without any context. */
export abstract class GenericUnitOfTime extends UnitOfTime {
  public get unitOfTimeKind() {
    return UnitOfTimeKind.Generic
  }
}
