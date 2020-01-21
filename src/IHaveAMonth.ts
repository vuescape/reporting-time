import { IHaveAYear } from './IHaveAYear'
import { MonthNumber } from './MonthNumber'

/** Exposes a month. */
// tslint:disable-next-line: interface-name
export interface IHaveAMonth extends IHaveAYear {
  /** Gets the month number. */
  readonly monthNumber: MonthNumber
}
