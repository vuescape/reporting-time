import { CalendarQuarter } from '../CalendarQuarter'
import { FiscalQuarter } from '../FiscalQuarter'
import { QuarterNumber } from '../QuarterNumber'

/**
 * Extension methods on type @see QuarterNumber .
 */
export class QuarterNumberExtensions {
  /**
   * Constructs a calendar quarter from a @see QuarterNumber  and a year.
   * @param quarterNumber The quarter number.
   * @param year The year.
   * @returns
   * A calendar quarter constructed from the specified @see QuarterNumber  and year.
   * @exception ArgumentException @paramref quarterNumber  is @see QuarterNumber.Invalid .
   */
  public static ToCalendar(quarterNumber: QuarterNumber, year: number) {
    if (quarterNumber === QuarterNumber.Invalid) {
      throw new RangeError('QuarterNumber cannot be Invalid')
    }
    const result = new CalendarQuarter(year, quarterNumber)

    return result
  }

  /**
   * Constructs a fiscal quarter from a @see QuarterNumber  and a year.
   * @param quarterNumber The quarter number.
   * @param year The year.
   * @returns
   * A fiscal quarter constructed from the specified @see QuarterNumber  and year.
   * @exception ArgumentException @paramref quarterNumber  is @see QuarterNumber.Invalid .
   */
  public static ToFiscal(quarterNumber: QuarterNumber, year: number) {
    if (quarterNumber === QuarterNumber.Invalid) {
      throw new RangeError('QuarterNumber cannot be Invalid')
    }
    const result = new FiscalQuarter(year, quarterNumber)

    return result
  }
}
