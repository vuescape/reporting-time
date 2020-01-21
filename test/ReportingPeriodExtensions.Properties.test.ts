import expect from 'expect'

import { CalendarMonth } from '../src/CalendarMonth'
import { CalendarQuarter } from '../src/CalendarQuarter'
import { CalendarYear } from '../src/CalendarYear'
import { FiscalMonth } from '../src/FiscalMonth'
import { FiscalQuarter } from '../src/FiscalQuarter'
import { FiscalYear } from '../src/FiscalYear'
import { MonthNumber } from '../src/MonthNumber'
import { MonthOfYear } from '../src/MonthOfYear'
import { QuarterNumber } from '../src/QuarterNumber'
import { ReportingPeriod } from '../src/ReportingPeriod'
import { UnitOfTimeGranularity } from '../src/UnitOfTimeGranularity'
import { UnitOfTimeKind } from '../src/UnitOfTimeKind'

import '../src/extensions/ReportingPeriodExtensions.Properties'

describe('ReportingPeriodExtensions.Properties --', () => {
  describe('getUnitOfTimeGranularity --', () => {
    it('should return the granularity of the UnitOfTime used in the reportingPeriod', () => {
      // Arrange
      const reportingPeriods = [
        {
          reportingPeriod: new ReportingPeriod(
            new CalendarMonth(2017, MonthOfYear.May),
            new CalendarMonth(2018, MonthOfYear.December),
          ),
          expectedGranularity: UnitOfTimeGranularity.Month,
        },
        {
          reportingPeriod: new ReportingPeriod(
            new FiscalMonth(2017, MonthNumber.Five),
            new FiscalMonth(2018, MonthNumber.Twelve),
          ),
          expectedGranularity: UnitOfTimeGranularity.Month,
        },
        {
          reportingPeriod: new ReportingPeriod(
            new CalendarQuarter(2017, QuarterNumber.Q2),
            new CalendarQuarter(2018, QuarterNumber.Q4),
          ),
          expectedGranularity: UnitOfTimeGranularity.Quarter,
        },
        {
          reportingPeriod: new ReportingPeriod(
            new FiscalQuarter(2017, QuarterNumber.Q2),
            new FiscalQuarter(2018, QuarterNumber.Q4),
          ),
          expectedGranularity: UnitOfTimeGranularity.Quarter,
        },
        {
          reportingPeriod: new ReportingPeriod(new CalendarYear(2017), new CalendarYear(2018)),
          expectedGranularity: UnitOfTimeGranularity.Year,
        },
        {
          reportingPeriod: new ReportingPeriod(new FiscalYear(2017), new FiscalYear(2018)),
          expectedGranularity: UnitOfTimeGranularity.Year,
        },
      ]

      // Act, Assert
      reportingPeriods.forEach(_ => {
        expect(_.reportingPeriod.getUnitOfTimeGranularity()).toBe(_.expectedGranularity)
      })
    })
  })
  describe('getUnitOfTimeKind --', () => {
    it('should return the UnitOfTimeKind of the UnitOfTime used in the reportingPeriod', () => {
      // Arrange
      const reportingPeriods = [
        {
          reportingPeriod: new ReportingPeriod(
            new CalendarMonth(2017, MonthOfYear.May),
            new CalendarMonth(2018, MonthOfYear.December),
          ),
          expectedKind: UnitOfTimeKind.Calendar,
        },
        {
          reportingPeriod: new ReportingPeriod(
            new FiscalMonth(2017, MonthNumber.Five),
            new FiscalMonth(2018, MonthNumber.Twelve),
          ),
          expectedKind: UnitOfTimeKind.Fiscal,
        },
        {
          reportingPeriod: new ReportingPeriod(
            new CalendarQuarter(2017, QuarterNumber.Q2),
            new CalendarQuarter(2018, QuarterNumber.Q4),
          ),
          expectedKind: UnitOfTimeKind.Calendar,
        },
        {
          reportingPeriod: new ReportingPeriod(
            new FiscalQuarter(2017, QuarterNumber.Q2),
            new FiscalQuarter(2018, QuarterNumber.Q4),
          ),
          expectedKind: UnitOfTimeKind.Fiscal,
        },
        {
          reportingPeriod: new ReportingPeriod(new CalendarYear(2017), new CalendarYear(2018)),
          expectedKind: UnitOfTimeKind.Calendar,
        },
        {
          reportingPeriod: new ReportingPeriod(new FiscalYear(2017), new FiscalYear(2018)),
          expectedKind: UnitOfTimeKind.Fiscal,
        },
      ]

      // Act, Assert
      reportingPeriods.forEach(_ => {
        expect(_.reportingPeriod.getUnitOfTimeKind()).toBe(_.expectedKind)
      })
    })
  })
  describe('getUnitsWithin --', () => {
    it('should return number of units contained within reportingPeriod when reportingPeriod is FiscalMonth ', () => {
      // Arrange
      const reportingPeriod1 = new ReportingPeriod(
        new FiscalMonth(2016, MonthNumber.Two),
        new FiscalMonth(2016, MonthNumber.Two),
      )
      const reportingPeriod2 = new ReportingPeriod(
        new FiscalMonth(2016, MonthNumber.Two),
        new FiscalMonth(2016, MonthNumber.Three),
      )
      const reportingPeriod3 = new ReportingPeriod(
        new FiscalMonth(2016, MonthNumber.Two),
        new FiscalMonth(2017, MonthNumber.One),
      )

      // Act
      const actualUnits1 = reportingPeriod1.getUnitsWithin()
      const actualUnits2 = reportingPeriod2.getUnitsWithin()
      const actualUnits3 = reportingPeriod3.getUnitsWithin()

      // Assert
      expect(actualUnits1).toEqual([new FiscalMonth(2016, MonthNumber.Two)])
      expect(actualUnits2).toEqual([new FiscalMonth(2016, MonthNumber.Two), new FiscalMonth(2016, MonthNumber.Three)])
      expect(actualUnits3).toEqual([
        new FiscalMonth(2016, MonthNumber.Two),
        new FiscalMonth(2016, MonthNumber.Three),
        new FiscalMonth(2016, MonthNumber.Four),
        new FiscalMonth(2016, MonthNumber.Five),
        new FiscalMonth(2016, MonthNumber.Six),
        new FiscalMonth(2016, MonthNumber.Seven),
        new FiscalMonth(2016, MonthNumber.Eight),
        new FiscalMonth(2016, MonthNumber.Nine),
        new FiscalMonth(2016, MonthNumber.Ten),
        new FiscalMonth(2016, MonthNumber.Eleven),
        new FiscalMonth(2016, MonthNumber.Twelve),
        new FiscalMonth(2017, MonthNumber.One),
      ])
    })
  })
})
