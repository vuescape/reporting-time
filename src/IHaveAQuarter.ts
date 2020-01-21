import { IHaveAYear } from './IHaveAYear'
import { QuarterNumber } from './QuarterNumber'

/** Exposes a quarter. */
// tslint:disable-next-line: interface-name
export interface IHaveAQuarter extends IHaveAYear {
  /** Gets the quarter number. */
  readonly quarterNumber: QuarterNumber
}
