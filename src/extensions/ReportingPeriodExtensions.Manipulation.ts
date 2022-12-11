import { CalendarMonth } from '../CalendarMonth'
import { CalendarQuarter } from '../CalendarQuarter'
import { CalendarUnitOfTime } from '../CalendarUnitOfTime'
import { CalendarYear } from '../CalendarYear'
import { FiscalMonth } from '../FiscalMonth'
import { FiscalQuarter } from '../FiscalQuarter'
import { FiscalYear } from '../FiscalYear'
import { GenericMonth } from '../GenericMonth'
import { GenericQuarter } from '../GenericQuarter'
import { GenericYear } from '../GenericYear'
import { IHaveAMonth } from '../IHaveAMonth'
import { IHaveAQuarter } from '../IHaveAQuarter'
import { IHaveAYear } from '../IHaveAYear'
import { QuarterNumber } from '../QuarterNumber'
import { ReportingPeriod } from '../ReportingPeriod'
import { ReportingPeriodComponent } from '../ReportingPeriodComponent'
import { UnitOfTime } from '../UnitOfTime'
import { UnitOfTimeGranularity } from '../UnitOfTimeGranularity'
import { UnitOfTimeKind } from '../UnitOfTimeKind'

import { UnitOfTimeGranularityExtensions } from './UnitOfTimeGranularityExtensions'

import './ReportingPeriodExtensions.Properties'
import './UnitOfTimeExtensions.Conversion'
import './UnitOfTimeExtensions.Math'

declare module '../ReportingPeriod' {
  interface ReportingPeriod {
    // tslint:disable: max-line-length
    /**
     * Clones a reporting period while adjusting the start or end of the reporting period, or both.
     * @param component The component(s) of the reporting period to adjust.
     * @param unitsToAdd The number of units to add when adjusting the reporting period component.  Use negative
     *   numbers to subtract units.
     * @param granularityOfUnitsToAdd The granularity of the units to add to the specified reporting period
     *   component(s).  Must be as or less granular than the reporting period component (e.g. can add CalendarYear to a
     *   CalendarQuarter, but not vice-versa).
     * @returns  A clone of the specified reporting period with the specified adjustment made to the start or end of
     *   the reporting period, or both.
     */
    cloneWithAdjustment(
      component: ReportingPeriodComponent,
      unitsToAdd: number,
      granularityOfUnitsToAdd: UnitOfTimeGranularity,
    ): ReportingPeriod

    /**
     * Creates all permutations of reporting periods between the
     * start and end of a specified reporting period, from 1 unit
     * to the specified number of maximum number of units that a
     * reporting period can contain.
     * @param maxUnitsInAnyReportingPeriod Maximum number of units-of-time in each reporting period.
     * @returns  All possible reporting periods containing between 1 and @paramref maxUnitsInAnyReportingPeriod
     *   units-of-time, contained within @paramref reportingPeriod.
     */
    createPermutations(maxUnitsInAnyReportingPeriod: number): Array<ReportingPeriod>

    /**
     * Splits a reporting period into units-of-time by a specified granularity.
     * @param granularity The granularity to use when splitting.
     * The strategy to use when @paramref granularity  is less granular than
     * the @paramref reportingPeriod  and, when splitting, the resulting units-of-time
     * cannot be aligned with the start and end of the reporting period.  For example,
     * splitting Mar2015-Feb2017 by year results in 2015,2016,2017, however only 2016 is
     * fully contained within the reporting period.  The reporting period is missing Jan2015-Feb2015
     * and March2017-Dec2017.
     * @returns
     * Returns the units-of-time that split the specified reporting period by the specified granularity.
     * The units-of-time will always be in the specified granularity, regardless of the granularity
     * of the reporting period (e.g. splitting a fiscal month reporting period using yearly granularity
     * will return @see FiscalYear  objects).
     */
    split(granularity: UnitOfTimeGranularity): Array<UnitOfTime>

    /**
     * Converts the the specified reporting period into the most
     * granular possible, but equivalent, reporting period.
     * @returns
     * A reporting period that addresses the same set of time as @paramref reportingPeriod ,
     * but is the most granular version possible of that reporting period.
     */
    // toMostGranular(): ReportingPeriod

    /**
     * Converts the the specified reporting period into the least
     * granular possible, but equivalent, reporting period.
     * @param reportingPeriod The reporting period to operate on.
     * @returns
     * A reporting period that addresses the same set of time as @paramref reportingPeriod ,
     * but is the least granular version possible of that reporting period.
     * Any reporting period with one unbounded and one bounded component will be returned
     * as-is (e.g. Unbounded to 12/31/2017 will not be converted to Unbounded to CalendarYear 2017).
     */
    // toLeastGranular(): ReportingPeriod

    // tslint:enable: max-line-length
  }
}

// tslint:disable-next-line: only-arrow-functions
ReportingPeriod.prototype.cloneWithAdjustment = function(
  component: ReportingPeriodComponent,
  unitsToAdd: number,
  granularityOfUnitsToAdd: UnitOfTimeGranularity,
): ReportingPeriod {
  if (!Object.values(ReportingPeriodComponent).includes(component)) {
    throw new RangeError(`component, '${component}', must be a valid ReportingPeriodComponent.`)
  }
  if (component === ReportingPeriodComponent.Invalid) {
    throw new RangeError('component cannot have value Invalid.')
  }
  if (!Object.values(UnitOfTimeGranularity).includes(granularityOfUnitsToAdd)) {
    throw new RangeError(
      `granularityOfUnitsToAdd, '${granularityOfUnitsToAdd}', must be a valid UnitOfTimeGranularity.`,
    )
  }
  if (granularityOfUnitsToAdd === UnitOfTimeGranularity.Invalid) {
    throw new RangeError('granularityOfUnitsToAdd cannot have value Invalid.')
  }

  let start = this.start
  let end = this.end

  if (component === ReportingPeriodComponent.Start || component === ReportingPeriodComponent.Both) {
    start = start.plus(unitsToAdd, granularityOfUnitsToAdd)
  }

  if (component === ReportingPeriodComponent.End || component === ReportingPeriodComponent.Both) {
    end = end.plus(unitsToAdd, granularityOfUnitsToAdd)
  }

  const result = new ReportingPeriod(start, end)
  return result
}

// tslint:disable-next-line: only-arrow-functions
ReportingPeriod.prototype.createPermutations = function(maxUnitsInAnyReportingPeriod: number): Array<ReportingPeriod> {
  if (!maxUnitsInAnyReportingPeriod || !(maxUnitsInAnyReportingPeriod > 0)) {
    throw new RangeError(`maxUnitsInAnyReportingPeriod, '${maxUnitsInAnyReportingPeriod}', must be greater than 0.`)
  }

  const allUnits = this.getUnitsWithin()
  const result: Array<ReportingPeriod> = []

  for (let unitOfTimeIndex = 0; unitOfTimeIndex < allUnits.length; unitOfTimeIndex++) {
    for (let numberOfUnits = 1; numberOfUnits <= maxUnitsInAnyReportingPeriod; numberOfUnits++) {
      if (unitOfTimeIndex + numberOfUnits - 1 < allUnits.length) {
        const subReportingPeriod = new ReportingPeriod(
          allUnits[unitOfTimeIndex],
          allUnits[unitOfTimeIndex + numberOfUnits - 1],
        )
        result.push(subReportingPeriod)
      }
    }
  }

  return result
}

// tslint:disable-next-line: only-arrow-functions
ReportingPeriod.prototype.split = function(granularity: UnitOfTimeGranularity): Array<UnitOfTime> {
  if (!Object.values(UnitOfTimeGranularity).includes(granularity)) {
    throw new RangeError(`component, '${granularity}', must be a valid UnitOfTimeGranularity.`)
  }
  if (granularity === UnitOfTimeGranularity.Invalid || granularity === UnitOfTimeGranularity.Unbounded) {
    throw new RangeError('granularity must not be Invalid or Unbounded.')
  }

  const reportingPeriodGranularity = this.getUnitOfTimeGranularity()

  let result: Array<UnitOfTime> = []
  if (reportingPeriodGranularity === granularity) {
    result = this.getUnitsWithin()
  }
  else if (UnitOfTimeGranularityExtensions.isLessGranularThan(reportingPeriodGranularity, granularity)) {
    result = makeMoreGranular(this, granularity).getUnitsWithin()
  }
  else {
    result = makeLessGranular(this, granularity).getUnitsWithin()
  }

  return result
}

const makeMoreGranular = (reportingPeriod: ReportingPeriod, granularity: UnitOfTimeGranularity): ReportingPeriod => {
  if (
    UnitOfTimeGranularityExtensions.isAsGranularOrMoreGranularThan(
      reportingPeriod.getUnitOfTimeGranularity(),
      granularity,
    )
  ) {
    throw new Error('reporting is as granular or more granular than granularity.')
  }

  const moreGranularStart = makeMoreGranularUnitOfTime(reportingPeriod.start, granularity)
  const moreGranularEnd = makeMoreGranularUnitOfTime(reportingPeriod.end, granularity)

  const result = new ReportingPeriod(moreGranularStart.start, moreGranularEnd.end)
  return result
}

const makeMoreGranularUnitOfTime = (unitOfTime: UnitOfTime, granularity: UnitOfTimeGranularity): ReportingPeriod => {
  if (!unitOfTime) {
    throw new Error('unitOfTime must be defined')
  }

  if (unitOfTime.unitOfTimeGranularity === UnitOfTimeGranularity.Unbounded) {
    throw new RangeError('unitOfTime granularity is UnitOfTimeGranularity.Unbounded.')
  }

  if (granularity === UnitOfTimeGranularity.Invalid || granularity === UnitOfTimeGranularity.Unbounded) {
    throw new RangeError('granularity must not be Invalid or Unbounded.')
  }

  if (UnitOfTimeGranularityExtensions.isAsGranularOrMoreGranularThan(unitOfTime.unitOfTimeGranularity, granularity)) {
    throw new Error(
      // tslint:disable-next-line: max-line-length
      `unitOfTime, '${unitOfTime.unitOfTimeGranularity}', is as granular or more granular than granularity, '${granularity}`,
    )
  }

  let moreGranularReportingPeriod: ReportingPeriod
  if (unitOfTime.unitOfTimeGranularity === UnitOfTimeGranularity.Year) {
    const unitOfTimeAsYear = (unitOfTime as unknown) as IHaveAYear
    const startQuarter = QuarterNumber.Q1
    const endQuarter = QuarterNumber.Q4

    if (unitOfTime.unitOfTimeKind === UnitOfTimeKind.Calendar) {
      moreGranularReportingPeriod = new ReportingPeriod(
        new CalendarQuarter(unitOfTimeAsYear.year, startQuarter),
        new CalendarQuarter(unitOfTimeAsYear.year, endQuarter),
      )
    }
    else if (unitOfTime.unitOfTimeKind === UnitOfTimeKind.Fiscal) {
      moreGranularReportingPeriod = new ReportingPeriod(
        new FiscalQuarter(unitOfTimeAsYear.year, startQuarter),
        new FiscalQuarter(unitOfTimeAsYear.year, endQuarter),
      )
    }
    else if (unitOfTime.unitOfTimeKind === UnitOfTimeKind.Generic) {
      moreGranularReportingPeriod = new ReportingPeriod(
        new GenericQuarter(unitOfTimeAsYear.year, startQuarter),
        new GenericQuarter(unitOfTimeAsYear.year, endQuarter),
      )
    }
    else {
      throw new RangeError('This kind of unit-of-time is not supported: ' + unitOfTime.unitOfTimeKind)
    }
  }
  else if (unitOfTime.unitOfTimeGranularity === UnitOfTimeGranularity.Quarter) {
    const unitOfTimeAsQuarter = (unitOfTime as unknown) as IHaveAQuarter

    const startMonth = (unitOfTimeAsQuarter.quarterNumber - 1) * 3 + 1
    const endMonth = unitOfTimeAsQuarter.quarterNumber * 3

    if (unitOfTime.unitOfTimeKind === UnitOfTimeKind.Calendar) {
      moreGranularReportingPeriod = new ReportingPeriod(
        new CalendarMonth(unitOfTimeAsQuarter.year, startMonth),
        new CalendarMonth(unitOfTimeAsQuarter.year, endMonth),
      )
    }
    else if (unitOfTime.unitOfTimeKind === UnitOfTimeKind.Fiscal) {
      moreGranularReportingPeriod = new ReportingPeriod(
        new FiscalMonth(unitOfTimeAsQuarter.year, startMonth),
        new FiscalMonth(unitOfTimeAsQuarter.year, endMonth),
      )
    }
    else if (unitOfTime.unitOfTimeKind === UnitOfTimeKind.Generic) {
      moreGranularReportingPeriod = new ReportingPeriod(
        new GenericMonth(unitOfTimeAsQuarter.year, startMonth),
        new GenericMonth(unitOfTimeAsQuarter.year, endMonth),
      )
    }
    else {
      throw new RangeError('This kind of unit-of-time is not supported: ' + unitOfTime.unitOfTimeKind)
    }
  }
  else if (unitOfTime.unitOfTimeGranularity === UnitOfTimeGranularity.Month) {
    if (unitOfTime.unitOfTimeKind === UnitOfTimeKind.Calendar) {
      const calendarUnitOfTime = unitOfTime as CalendarUnitOfTime
      moreGranularReportingPeriod = new ReportingPeriod(
        calendarUnitOfTime.getFirstCalendarDay(),
        calendarUnitOfTime.getLastCalendarDay(),
      )
    }
    else if (unitOfTime.unitOfTimeKind === UnitOfTimeKind.Fiscal) {
      throw new Error('The Fiscal kind cannot be made more granular than Month.')
    }
    else if (unitOfTime.unitOfTimeKind === UnitOfTimeKind.Generic) {
      throw new Error('The Generic kind cannot be made more granular than Month.')
    }
    else {
      throw new RangeError('This kind of unit-of-time is not supported: ' + unitOfTime.unitOfTimeKind)
    }
  }
  else {
    throw new RangeError('This granularity is not supported: ' + unitOfTime.unitOfTimeGranularity)
  }

  if (moreGranularReportingPeriod.getUnitOfTimeGranularity() === granularity) {
    return moreGranularReportingPeriod
  }

  const result = makeMoreGranular(moreGranularReportingPeriod, granularity)

  return result
}

const makeLessGranular = (reportingPeriod: ReportingPeriod, granularity: UnitOfTimeGranularity): ReportingPeriod => {
  if (!reportingPeriod) {
    throw new Error('reportingPeriod must not be null.')
  }

  if (granularity === UnitOfTimeGranularity.Invalid || granularity === UnitOfTimeGranularity.Unbounded) {
    throw new RangeError('granularity must not be Invalid or Unbounded.')
  }

  const reportingPeriodGranularity = reportingPeriod.getUnitOfTimeGranularity()
  if (UnitOfTimeGranularityExtensions.isAsGranularOrLessGranularThan(reportingPeriodGranularity, granularity)) {
    // tslint:disable-next-line: max-line-length
    throw new Error(
      `reportingPeriod, '${reportingPeriod}', is as granular or less granular than granularity, '${granularity}'.`,
    )
  }

  let lessGranularReportingPeriod: ReportingPeriod
  const unitOfTimeKind = reportingPeriod.getUnitOfTimeKind()
  if (reportingPeriodGranularity === UnitOfTimeGranularity.Day) {
    throw new Error('Not implemented')
  }
  else if (reportingPeriodGranularity === UnitOfTimeGranularity.Month) {
    const startAsMonth = (reportingPeriod.start as unknown) as IHaveAMonth
    const endAsMonth = (reportingPeriod.end as unknown) as IHaveAMonth

    const quarterByStartMonth = new Map([
      [1, QuarterNumber.Q1],
      [4, QuarterNumber.Q2],
      [7, QuarterNumber.Q3],
      [10, QuarterNumber.Q4],
    ])

    const quarterByEndMonth = new Map([
      [3, QuarterNumber.Q1],
      [6, QuarterNumber.Q2],
      [9, QuarterNumber.Q3],
      [12, QuarterNumber.Q4],
    ])

    if (!quarterByStartMonth.has(startAsMonth.monthNumber)) {
      throw new Error(
        // tslint:disable-next-line: max-line-length
        'Cannot convert a monthly reporting period to a quarterly reporting period when the reporting period start time is not the first month of a recognized quarter.',
      )
    }

    if (!quarterByEndMonth.has(endAsMonth.monthNumber)) {
      throw new Error(
        // tslint:disable-next-line: max-line-length
        'Cannot convert a monthly reporting period to a quarterly reporting period when the reporting period end time is not the last month of a recognized quarter.',
      )
    }

    if (unitOfTimeKind === UnitOfTimeKind.Calendar) {
      const startQuarter = new CalendarQuarter(startAsMonth.year, quarterByStartMonth.get(startAsMonth.monthNumber)!)
      const endQuarter = new CalendarQuarter(endAsMonth.year, quarterByEndMonth.get(endAsMonth.monthNumber)!)
      lessGranularReportingPeriod = new ReportingPeriod(startQuarter, endQuarter)
    }
    else if (unitOfTimeKind === UnitOfTimeKind.Fiscal) {
      const startQuarter = new FiscalQuarter(startAsMonth.year, quarterByStartMonth.get(startAsMonth.monthNumber)!)
      const endQuarter = new FiscalQuarter(endAsMonth.year, quarterByEndMonth.get(endAsMonth.monthNumber)!)
      lessGranularReportingPeriod = new ReportingPeriod(startQuarter, endQuarter)
    }
    else if (unitOfTimeKind === UnitOfTimeKind.Generic) {
      const startQuarter = new GenericQuarter(startAsMonth.year, quarterByStartMonth.get(startAsMonth.monthNumber)!)
      const endQuarter = new GenericQuarter(endAsMonth.year, quarterByEndMonth.get(endAsMonth.monthNumber)!)
      lessGranularReportingPeriod = new ReportingPeriod(startQuarter, endQuarter)
    }
    else {
      throw new RangeError('This kind of unit-of-time is not supported: ' + unitOfTimeKind)
    }
  }
  else if (reportingPeriodGranularity === UnitOfTimeGranularity.Quarter) {
    const startAsQuarter = (reportingPeriod.start as unknown) as IHaveAQuarter
    const endAsQuarter = (reportingPeriod.end as unknown) as IHaveAQuarter

    if (startAsQuarter.quarterNumber !== QuarterNumber.Q1) {
      throw new Error(
        // tslint:disable-next-line: max-line-length
        'Cannot convert a quarterly reporting period to a yearly reporting period when the reporting period start time is not Q1.',
      )
    }

    if (endAsQuarter.quarterNumber !== QuarterNumber.Q4) {
      throw new Error(
        // tslint:disable-next-line: max-line-length
        'Cannot convert a quarterly reporting period to a yearly reporting period when the reporting period end is not Q4.',
      )
    }

    if (unitOfTimeKind === UnitOfTimeKind.Calendar) {
      const startYear = new CalendarYear(startAsQuarter.year)
      const endYear = new CalendarYear(endAsQuarter.year)
      lessGranularReportingPeriod = new ReportingPeriod(startYear, endYear)
    }
    else if (unitOfTimeKind === UnitOfTimeKind.Fiscal) {
      const startYear = new FiscalYear(startAsQuarter.year)
      const endYear = new FiscalYear(endAsQuarter.year)
      lessGranularReportingPeriod = new ReportingPeriod(startYear, endYear)
    }
    else if (unitOfTimeKind === UnitOfTimeKind.Generic) {
      const startYear = new GenericYear(startAsQuarter.year)
      const endYear = new GenericYear(endAsQuarter.year)
      lessGranularReportingPeriod = new ReportingPeriod(startYear, endYear)
    }
    else {
      throw new RangeError('This kind of unit-of-time is not supported: ' + unitOfTimeKind)
    }
  }
  else {
    throw new RangeError('This granularity is not supported: ' + reportingPeriodGranularity)
  }

  if (lessGranularReportingPeriod.getUnitOfTimeGranularity() === granularity) {
    return lessGranularReportingPeriod
  }

  const result = makeLessGranular(lessGranularReportingPeriod, granularity)
  return result
}
