import { CalendarDay } from '../CalendarDay'
import { CalendarMonth } from '../CalendarMonth'
import { CalendarQuarter } from '../CalendarQuarter'
import { CalendarYear } from '../CalendarYear'
import { FiscalMonth } from '../FiscalMonth'
import { FiscalQuarter } from '../FiscalQuarter'
import { FiscalYear } from '../FiscalYear'
import { GenericMonth } from '../GenericMonth'
import { GenericQuarter } from '../GenericQuarter'
import { GenericYear } from '../GenericYear'
import { UnitOfTime } from '../UnitOfTime'
import { UnitOfTimeGranularity } from '../UnitOfTimeGranularity'

import { UnitOfTimeGranularityExtensions } from './UnitOfTimeGranularityExtensions'

declare module '../UnitOfTime' {
  interface UnitOfTime {
    plus(unitsToAdd: number, granularityOfUnitsToAdd?: UnitOfTimeGranularity): UnitOfTime
  }
}

import './UnitOfTimeExtensions.Serialization'

// tslint:disable-next-line: only-arrow-functions
UnitOfTime.prototype.plus = function(unitsToAdd: number, granularityOfUnitsToAdd: UnitOfTimeGranularity) {
  if (granularityOfUnitsToAdd === undefined) {
    return plusInternal(this, unitsToAdd)
  }

  return plusInternalWithGranularity(this, unitsToAdd, granularityOfUnitsToAdd)
}

const plusInternalWithGranularity = <T extends UnitOfTime>(unitOfTime: T,
  unitsToAdd: number,
  granularityOfUnitsToAdd: UnitOfTimeGranularity,
): T => {
  if (granularityOfUnitsToAdd === UnitOfTimeGranularity.Invalid || granularityOfUnitsToAdd === UnitOfTimeGranularity.Unbounded) {
    throw new RangeError('UnitOfTimeGranularity cannot be Invalid or Unbounded')
  }

  if (UnitOfTimeGranularityExtensions.isMoreGranularThan(granularityOfUnitsToAdd, unitOfTime.unitOfTimeGranularity)) {
    throw new Error(// tslint:disable-next-line: max-line-length
      'granularityOfUnitsToAdd is more granular than unitOfTime.  Only units that are as granular or less granular than a unit-of-time can be added to that unit-of-time.')
  }

  if (unitOfTime.unitOfTimeGranularity === granularityOfUnitsToAdd) {
    return plusInternal(unitOfTime, unitsToAdd)
  }

  if (granularityOfUnitsToAdd === UnitOfTimeGranularity.Year) {
    if (unitOfTime.unitOfTimeGranularity === UnitOfTimeGranularity.Quarter) {
      return plusInternal(unitOfTime, 4 * unitsToAdd)
    }

    if (unitOfTime.unitOfTimeGranularity === UnitOfTimeGranularity.Month) {
      return plusInternal(unitOfTime, 12 * unitsToAdd)
    }

    if (unitOfTime.unitOfTimeGranularity === UnitOfTimeGranularity.Day) {
      throw new Error('adjusting a unit-of-time with Day granularity is not supported')
    }

    throw new Error('Invalid Operation -- should not get here')
  }

  if (granularityOfUnitsToAdd === UnitOfTimeGranularity.Quarter) {
    if (unitOfTime.unitOfTimeGranularity === UnitOfTimeGranularity.Month) {
      return plusInternal(unitOfTime, 3 * unitsToAdd)
    }

    if (unitOfTime.unitOfTimeGranularity === UnitOfTimeGranularity.Day) {
      throw new Error('adjusting a unit-of-time with Day granularity is not supported')
    }

    throw new Error('Invalid Operation -- should not get here')
  }

  if (granularityOfUnitsToAdd === UnitOfTimeGranularity.Month) {
    if (unitOfTime.unitOfTimeGranularity === UnitOfTimeGranularity.Day) {
      throw new Error('adjusting a unit-of-time with Day granularity is not supported')
    }

    throw new Error('Invalid Operation -- should not get here')
  }

  throw new Error('Unknown granularity combination.  should not get here')
}

const plusInternal = <T extends UnitOfTime>(unitOfTime: T, unitsToAdd: number): T => {
  if (unitOfTime instanceof GenericMonth) {
    const monthAsDateTime = new Date(unitOfTime.year, unitOfTime.monthNumber - 1, 1)
    monthAsDateTime.setMonth(monthAsDateTime.getMonth() + unitsToAdd)

    const result = new GenericMonth(monthAsDateTime.getFullYear(), monthAsDateTime.getMonth() + 1)
    return (result as unknown) as T
  }

  if (unitOfTime instanceof GenericQuarter) {
    let year          = unitOfTime.year
    let quarterNumber = unitOfTime.quarterNumber

    year          = year + Math.trunc(unitsToAdd / 4)
    quarterNumber = quarterNumber + (unitsToAdd % 4)

    if (quarterNumber > 4) {
      year++
      quarterNumber = quarterNumber - 4
    }
    if (quarterNumber < 1) {
      year--
      quarterNumber = 4 + quarterNumber
    }

    const result = new GenericQuarter(year, quarterNumber)
    return (result as unknown) as T
  }

  if (unitOfTime instanceof GenericYear) {
    const result = new GenericYear(unitOfTime.year + unitsToAdd)
    return (result as unknown) as T
  }

  if (unitOfTime instanceof CalendarDay) {
    const calendarDayAsDate = new Date(unitOfTime.year, unitOfTime.monthNumber - 1, unitOfTime.dayOfMonth)
    calendarDayAsDate.setDate(calendarDayAsDate.getDate() + unitsToAdd)
    const result = new CalendarDay(calendarDayAsDate.getFullYear(),
      calendarDayAsDate.getMonth() + 1,
      calendarDayAsDate.getDate(),
    )

    return (result as unknown) as T
  }

  if (unitOfTime instanceof CalendarMonth) {
    const unitOfTimeAsCalendarMonth = unitOfTime as CalendarMonth
    const genericCalendarMonth      = new GenericMonth(
      unitOfTimeAsCalendarMonth.year,
      unitOfTimeAsCalendarMonth.monthNumber,
    )
    const genericMonth              = plusInternal(genericCalendarMonth, unitsToAdd)

    const result = new CalendarMonth(genericMonth.year, genericMonth.monthNumber)
    return (result as unknown) as T
  }

  if (unitOfTime instanceof CalendarQuarter) {
    const unitOfTimeAsCalendarQuarter = unitOfTime as CalendarQuarter
    const genericCalendarQuarter      = new GenericQuarter(unitOfTimeAsCalendarQuarter.year,
      unitOfTimeAsCalendarQuarter.quarterNumber,
    )
    const genericQuarter              = plusInternal(genericCalendarQuarter, unitsToAdd)

    const result = new CalendarQuarter(genericQuarter.year, genericQuarter.quarterNumber)
    return (result as unknown) as T
  }

  if (unitOfTime instanceof CalendarYear) {
    const unitOfTimeAsCalendarYear = unitOfTime as CalendarYear
    const genericCalendarYear      = new GenericYear(unitOfTimeAsCalendarYear.year)
    const genericYear              = plusInternal(genericCalendarYear, unitsToAdd)

    const result = new CalendarYear(genericYear.year)
    return (result as unknown) as T
  }

  if (unitOfTime instanceof FiscalMonth) {
    const unitOfTimeAsFiscalMonth = unitOfTime as FiscalMonth
    const genericFiscalMonth      = new GenericMonth(unitOfTimeAsFiscalMonth.year, unitOfTimeAsFiscalMonth.monthNumber)
    const genericMonth            = plusInternal(genericFiscalMonth, unitsToAdd)

    const result = new FiscalMonth(genericMonth.year, genericMonth.monthNumber)
    return (result as unknown) as T
  }

  if (unitOfTime instanceof FiscalQuarter) {
    const unitOfTimeAsFiscalQuarter = unitOfTime as FiscalQuarter
    const genericFiscalQuarter      = new GenericQuarter(unitOfTimeAsFiscalQuarter.year,
      unitOfTimeAsFiscalQuarter.quarterNumber,
    )
    const genericQuarter            = plusInternal(genericFiscalQuarter, unitsToAdd)

    const result = new FiscalQuarter(genericQuarter.year, genericQuarter.quarterNumber)
    return (result as unknown) as T
  }

  if (unitOfTime instanceof FiscalYear) {
    const unitOfTimeAsCalendarYear = unitOfTime as FiscalYear
    const genericFiscalYear        = new GenericYear(unitOfTimeAsCalendarYear.year)
    const genericYear              = plusInternal(genericFiscalYear, unitsToAdd)

    const result = new FiscalYear(genericYear.year)
    return (result as unknown) as T
  }

  throw new RangeError('this type of unit-of-time is not supported: ' + unitOfTime.constructor.name)
}
