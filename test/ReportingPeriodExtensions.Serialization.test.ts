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

import '../src/extensions/ReportingPeriodExtensions.Serialization'
import '../src/extensions/UnitOfTimeExtensions.Math'

describe('ReportingPeriodExtensions.Serialization --', () => {
  describe('round trip ReportingPeriod --', () => {
    it('should be serialized/deserialized correctly when UnitOfTime is a CalendarMonth', () => {
      // Arrange
      const startUnitOfTime = new CalendarMonth(2020, MonthNumber.Nine)
      const endUnitOfTime   = startUnitOfTime.plus(12)
      const reportingPeriod = new ReportingPeriod(startUnitOfTime, endUnitOfTime)

      // Act
      const reportingPeriodString       = reportingPeriod.serializeToString()
      const deserializedReportingPeriod = ReportingPeriod.deserializeFromString(reportingPeriodString)

      // Assert
      expect(deserializedReportingPeriod).toBeTruthy()
      expect(reportingPeriod.start.equals(startUnitOfTime)).toBe(true)
      expect(reportingPeriod.end.equals(endUnitOfTime)).toBe(true)
    })
    it('should be serialized/deserialized correctly when UnitOfTime is a CalendarQuarter', () => {
      // Arrange
      const startUnitOfTime = new CalendarQuarter(2020, QuarterNumber.Q4)
      const endUnitOfTime   = startUnitOfTime.plus(1)
      const reportingPeriod = new ReportingPeriod(startUnitOfTime, endUnitOfTime)

      // Act
      const reportingPeriodString       = reportingPeriod.serializeToString()
      const deserializedReportingPeriod = ReportingPeriod.deserializeFromString(reportingPeriodString)

      // Assert
      expect(deserializedReportingPeriod).toBeTruthy()
      expect(reportingPeriod.start.equals(startUnitOfTime)).toBe(true)
      expect(reportingPeriod.end.equals(endUnitOfTime)).toBe(true)
    })
    it('should be serialized/deserialized correctly when UnitOfTime is a CalendarYear', () => {
      // Arrange
      const startUnitOfTime = new CalendarYear(2020)
      const endUnitOfTime   = startUnitOfTime.plus(10)
      const reportingPeriod = new ReportingPeriod(startUnitOfTime, endUnitOfTime)

      // Act
      const reportingPeriodString       = reportingPeriod.serializeToString()
      const deserializedReportingPeriod = ReportingPeriod.deserializeFromString(reportingPeriodString)

      // Assert
      expect(deserializedReportingPeriod).toBeTruthy()
      expect(reportingPeriod.start.equals(startUnitOfTime)).toBe(true)
      expect(reportingPeriod.end.equals(endUnitOfTime)).toBe(true)
    })
    it('should be serialized/deserialized correctly when UnitOfTime is a FiscalMonth', () => {
      // Arrange
      const startUnitOfTime = new FiscalMonth(2020, MonthOfYear.June)
      const endUnitOfTime   = startUnitOfTime.plus(13)
      const reportingPeriod = new ReportingPeriod(startUnitOfTime, endUnitOfTime)

      // Act
      const reportingPeriodString       = reportingPeriod.serializeToString()
      const deserializedReportingPeriod = ReportingPeriod.deserializeFromString(reportingPeriodString)

      // Assert
      expect(deserializedReportingPeriod).toBeTruthy()
      expect(reportingPeriod.start.equals(startUnitOfTime)).toBe(true)
      expect(reportingPeriod.end.equals(endUnitOfTime)).toBe(true)
    })
    it('should be serialized/deserialized correctly when UnitOfTime is a FiscalQuarter', () => {
      // Arrange
      const startUnitOfTime = new FiscalQuarter(2020, QuarterNumber.Q4)
      const endUnitOfTime   = startUnitOfTime.plus(1)
      const reportingPeriod = new ReportingPeriod(startUnitOfTime, endUnitOfTime)

      // Act
      const reportingPeriodString       = reportingPeriod.serializeToString()
      const deserializedReportingPeriod = ReportingPeriod.deserializeFromString(reportingPeriodString)

      // Assert
      expect(deserializedReportingPeriod).toBeTruthy()
      expect(reportingPeriod.start.equals(startUnitOfTime)).toBe(true)
      expect(reportingPeriod.end.equals(endUnitOfTime)).toBe(true)
    })
    it('should be serialized/deserialized correctly when UnitOfTime is a FiscalYear', () => {
      // Arrange
      const startUnitOfTime = new FiscalYear(2020)
      const endUnitOfTime   = startUnitOfTime.plus(3)
      const reportingPeriod = new ReportingPeriod(startUnitOfTime, endUnitOfTime)

      // Act
      const reportingPeriodString       = reportingPeriod.serializeToString()
      const deserializedReportingPeriod = ReportingPeriod.deserializeFromString(reportingPeriodString)

      // Assert
      expect(deserializedReportingPeriod).toBeTruthy()
      expect(reportingPeriod.start.equals(startUnitOfTime)).toBe(true)
      expect(reportingPeriod.end.equals(endUnitOfTime)).toBe(true)
    })
  })
  describe('deserializeFromString --', () => {
    it('should throw an Error when serialized string is not defined or empty', () => {
      // Arrange
      const reportingPeriodStrings = ['', '   ', // spaces
        '   ', // tabs
        null, undefined]

      // Act, Assert
      for (const reportingPeriodString of reportingPeriodStrings) {
        const reportingPeriod = () => ReportingPeriod.deserializeFromString(reportingPeriodString as string)
        expect(reportingPeriod).toThrow()
      }
    })
    it('should throw an Error when start and end UnitOfTime are different concrete types', () => {
      // Arrange
      const reportingPeriodStrings = ['c-2010-01,c-2010-Q4', 'c-2000-01,c-2000', 'c-2000-Q1,c-2000', 'c-2000-01,f-2001-01', 'f-2000-01,c-2001-01']

      // Act, Assert
      for (const reportingPeriodString of reportingPeriodStrings) {
        const reportingPeriod = () => ReportingPeriod.deserializeFromString(reportingPeriodString)
        expect(reportingPeriod).toThrow(/start and end are different concrete types of units-of-time/)
      }
    })
    it('should throw an Error when serialized reportingPeriod has the wrong number of tokens', () => {
      // Arrange
      const reportingPeriodStrings = [',', 'c-2017-04', ',c-2017-04', 'c-2017-04,', 'c-2017-03,,', ',c-2017-03,', 'c-2017-03,c-2017-04,', 'c-2017-03,c-2017-04,c-2017-04']

      // Act, Assert
      for (const reportingPeriodString of reportingPeriodStrings) {
        const reportingPeriod = () => ReportingPeriod.deserializeFromString(reportingPeriodString)
        expect(reportingPeriod).toThrow()
      }
    })
    // tslint:disable-next-line: max-line-length
    it(
      'should throw an Error when the serialized reportingPeriod has a malformed token representing the start of reportingPeriod',
      () => {
        // Arrange
        const reportingPeriodStrings = ['c-201a-11,c-2017-10', 'c-xxxx-11,c-2017-10', 'c-10000-11,c-2017-10', 'c-T001-11,c-2017-10', 'c-0-11,c-2017-10', 'c-200-11,c-2017-10', 'c-0000-11,c-2017-10', 'c-999-11,c-2017-10', 'c-2007-1,c-2017-10', 'c-2007-9,c-2017-10', 'c-2007-13,c-2017-10', 'c-2007-99,c-2017-10', 'c-2007-00,c-2017-10', 'c-2007-001,c-2017-10', 'c-2007-012,c-2017-10']

        // Act, Assert
        for (const reportingPeriodString of reportingPeriodStrings) {
          const reportingPeriod = () => ReportingPeriod.deserializeFromString(reportingPeriodString)
          expect(reportingPeriod).toThrow()
        }
      },
    )
    // tslint:disable-next-line: max-line-length
    it(
      'should throw an Error when the serialized reportingPeriod has a malformed token representing the end  of reportingPeriod',
      () => {
        // Arrange
        const reportingPeriodStrings = ['c-2017-04,c-201a-11', 'c-2017-04,c-xxxx-11', 'c-2017-04,c-10000-11', 'c-2017-04,c-T001-11', 'c-2017-04,c-0-11', 'c-2017-04,c-200-11', 'c-2017-04,c-0000-11', 'c-2017-04,c-999-11', 'c-2017-04,c-2007-1', 'c-2017-04,c-2007-9', 'c-2017-04,c-2007-13', 'c-2017-04,c-2007-99', 'c-2017-04,c-2007-00', 'c-2017-04,c-2007-001', 'c-2017-04,c-2007-012']

        // Act, Assert
        for (const reportingPeriodString of reportingPeriodStrings) {
          const reportingPeriod = () => ReportingPeriod.deserializeFromString(reportingPeriodString)
          expect(reportingPeriod).toThrow()
        }
      },
    )
    // tslint:disable-next-line: max-line-length
    it('should throw an Error when the serialized reportingPeriod has the start greater than the end', () => {
      // Arrange
      const reportingPeriodStrings = ['c-2017-04,c-2016-04', 'c-2017-Q3,c-2017-Q2', 'f-2017,f-2016']

      // Act, Assert
      for (const reportingPeriodString of reportingPeriodStrings) {
        const reportingPeriod = () => ReportingPeriod.deserializeFromString(reportingPeriodString)
        expect(reportingPeriod).toThrow(/start is greater than end/)
      }
    })
    // tslint:disable-next-line: max-line-length
    it(
      'should be deserialized correctly when reportingPeriod is a well formed ReportingPeriod of CalendarMonth string',
      () => {
        // Arrange
        const reportingPeriodString = 'c-2001-01,c-2001-02'
        const expected              = new ReportingPeriod(new CalendarMonth(2001, MonthNumber.One),
          new CalendarMonth(2001, MonthNumber.Two),
        )

        // Act
        const reportingPeriod = ReportingPeriod.deserializeFromString(reportingPeriodString)

        // Assert
        expect(reportingPeriod).toBeTruthy()
        expect(reportingPeriod.equals(expected)).toBe(true)
      },
    )
    // tslint:disable-next-line: max-line-length
    it(
      'should be deserialized correctly when reportingPeriod is a well formed ReportingPeriod of CalendarQuarter string',
      () => {
        // Arrange
        const reportingPeriodString = 'c-2001-Q1,c-2001-Q2'
        const expected              = new ReportingPeriod(new CalendarQuarter(2001, QuarterNumber.Q1),
          new CalendarQuarter(2001, QuarterNumber.Q2),
        )

        // Act
        const reportingPeriod = ReportingPeriod.deserializeFromString(reportingPeriodString)

        // Assert
        expect(reportingPeriod).toBeTruthy()
        expect(reportingPeriod.equals(expected)).toBe(true)
      },
    )
    // tslint:disable-next-line: max-line-length
    it(
      'should be deserialized correctly when reportingPeriod is a well formed ReportingPeriod of CalendarYear string',
      () => {
        // Arrange
        const reportingPeriodString = 'c-2001,c-2001'
        const expected              = new ReportingPeriod(new CalendarYear(2001), new CalendarYear(2001))

        // Act
        const reportingPeriod = ReportingPeriod.deserializeFromString(reportingPeriodString)

        // Assert
        expect(reportingPeriod).toBeTruthy()
        expect(reportingPeriod.equals(expected)).toBe(true)
      },
    )

    // tslint:disable-next-line: max-line-length
    it(
      'should be deserialized correctly when reportingPeriod is a well formed ReportingPeriod of FiscalMonth string',
      () => {
        // Arrange
        const reportingPeriodString = 'f-2001-01,f-2001-02'
        const expected              = new ReportingPeriod(new FiscalMonth(2001, MonthNumber.One),
          new FiscalMonth(2001, MonthNumber.Two),
        )

        // Act
        const reportingPeriod = ReportingPeriod.deserializeFromString(reportingPeriodString)

        // Assert
        expect(reportingPeriod).toBeTruthy()
        expect(reportingPeriod.equals(expected)).toBe(true)
      },
    )
    // tslint:disable-next-line: max-line-length
    it(
      'should be deserialized correctly when reportingPeriod is a well formed ReportingPeriod of FiscalQuarter string',
      () => {
        // Arrange
        const reportingPeriodString = 'f-2001-Q1,f-2001-Q2'
        const expected              = new ReportingPeriod(new FiscalQuarter(2001, QuarterNumber.Q1),
          new FiscalQuarter(2001, QuarterNumber.Q2),
        )

        // Act
        const reportingPeriod = ReportingPeriod.deserializeFromString(reportingPeriodString)

        // Assert
        expect(reportingPeriod).toBeTruthy()
        expect(reportingPeriod.equals(expected)).toBe(true)
      },
    )
    // tslint:disable-next-line: max-line-length
    it(
      'should be deserialized correctly when reportingPeriod is a well formed ReportingPeriod of FiscalYear string',
      () => {
        // Arrange
        const reportingPeriodString = 'f-2001,f-2001'
        const expected              = new ReportingPeriod(new FiscalYear(2001), new FiscalYear(2001))

        // Act
        const reportingPeriod = ReportingPeriod.deserializeFromString(reportingPeriodString)

        // Assert
        expect(reportingPeriod).toBeTruthy()
        expect(reportingPeriod.equals(expected)).toBe(true)
      },
    )
  })
  describe('serializeToString --', () => {
    it('should return expected serialized string representation of reportingPeriod', () => {
      // Arrange
      const reportingPeriods: Map<string, ReportingPeriod> = new Map([['c-2017-05,c-2018-12', new ReportingPeriod(new CalendarMonth(
        2017,
        MonthOfYear.May,
      ), new CalendarMonth(2018, MonthOfYear.December))], ['f-2017-05,f-2018-12', new ReportingPeriod(new FiscalMonth(
        2017,
        MonthNumber.Five,
      ), new FiscalMonth(2018, MonthNumber.Twelve))], ['c-2017-Q2,c-2018-Q4', new ReportingPeriod(new CalendarQuarter(
        2017,
        QuarterNumber.Q2,
      ), new CalendarQuarter(2018, QuarterNumber.Q4))], ['f-2017-Q2,f-2018-Q4', new ReportingPeriod(new FiscalQuarter(
        2017,
        QuarterNumber.Q2,
      ), new FiscalQuarter(2018, QuarterNumber.Q4))], ['c-2017,c-2018', new ReportingPeriod(
        new CalendarYear(2017),
        new CalendarYear(2018),
      )], ['f-2017,f-2018', new ReportingPeriod(new FiscalYear(2017), new FiscalYear(2018))]])

      // Act
      reportingPeriods.forEach((value, key) => {
        expect(value.serializeToString()).toBe(key)
      })
    })
  })
})
