import { UnitOfTime } from './UnitOfTime'
import { UnitOfTimeKind } from './UnitOfTimeKind'

/** Represents a unit of time tied to the (gregorian) calendar. */
export abstract class CalendarUnitOfTime extends UnitOfTime {
  public get unitOfTimeKind() {
    return UnitOfTimeKind.Calendar
  }
}
