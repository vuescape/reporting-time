import { CalendarDay } from '../CalendarDay'
import { CalendarMonth } from '../CalendarMonth'
import { CalendarQuarter } from '../CalendarQuarter'
import { CalendarUnitOfTime } from '../CalendarUnitOfTime'
import { CalendarYear } from '../CalendarYear'
import { DayOfMonth } from '../DayOfMonth'
import { MonthOfYear } from '../MonthOfYear'

declare module '../CalendarUnitOfTime' {
  interface CalendarUnitOfTime {
    /**
     * Gets the first  @see CalendarDay of a @see CalendarUnitOfTime.
     * @returns
     * The first calendar day.
     */
    getFirstCalendarDay(): CalendarDay

    /**
     * Gets the last  @see CalendarDay of a @see CalendarUnitOfTime.
     * @returns
     * The last calendar day.
     */
    getLastCalendarDay(): CalendarDay
  }

  namespace CalendarUnitOfTime {
    /**
     * Gets the first  @see CalendarDay of a @see CalendarUnitOfTime.
     * @returns
     * The first calendar day.
     */
    export function getFirstCalendarDay(): CalendarDay

    /**
     * Gets the last  @see CalendarDay of a @see CalendarUnitOfTime.
     * @returns
     * The last calendar day.
     */
    export function getLastCalendarDay(): CalendarDay
  }
}

// tslint:disable-next-line: only-arrow-functions
CalendarUnitOfTime.prototype.getFirstCalendarDay = function() {
  if (this instanceof CalendarDay) {
    const result = this
    return result
  }

  if (this instanceof CalendarMonth) {
    console.info('in calendar month')
    const result = new CalendarDay(this.year, this.monthNumber, DayOfMonth.One)
    return result
  }

  if (this instanceof CalendarQuarter) {
    const result = new CalendarDay(this.year, (this.quarterNumber - 1) * 3 + 1, DayOfMonth.One)
    return result
  }

  if (this instanceof CalendarYear) {
    const result = new CalendarDay(this.year, MonthOfYear.January, DayOfMonth.One)
    return result
  }

  throw new RangeError('this type of unit-of-time is not supported: ' + this.constructor.name)
}

CalendarUnitOfTime.prototype.getLastCalendarDay = function() {
  if (this instanceof CalendarDay) {
    const result = this
    return result
  }

  if (this instanceof CalendarMonth) {
    const daysInMonth = new Date(this.year, this.monthNumber, 0).getDate()
    const result      = new CalendarDay(this.year, this.monthNumber, daysInMonth)
    return result
  }

  if (this instanceof CalendarQuarter) {
    const lastMonthInQuarter = new CalendarMonth(this.year, this.quarterNumber * 3)
    const result             = lastMonthInQuarter.getLastCalendarDay()
    return result
  }

  if (this instanceof CalendarYear) {
    const result = new CalendarDay(this.year, MonthOfYear.December, DayOfMonth.ThirtyOne)
    return result
  }

  throw new RangeError('this type of unit-of-time is not supported: ' + this.constructor.name)
}
