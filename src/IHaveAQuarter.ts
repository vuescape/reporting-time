import { IHaveAYear } from './IHaveAYear'
import { QuarterNumber } from './QuarterNumber'

/** Exposes a quarter. */
export interface IHaveAQuarter extends IHaveAYear {
  /** Gets the quarter number. */
  readonly quarterNumber: QuarterNumber
}
