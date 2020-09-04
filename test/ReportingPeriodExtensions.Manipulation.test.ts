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
import { ReportingPeriodComponent } from '../src/ReportingPeriodComponent'
import { UnitOfTimeGranularity } from '../src/UnitOfTimeGranularity'

import '../src/extensions/ReportingPeriodExtensions.Manipulation'

describe('ReportingPeriodExtensions.Manipulation --', () => {
  describe('cloneWithAdjustment --', () => {
    it('should throw Error when component is undefined', () => {
      // Arrange
      const component = (undefined as unknown) as ReportingPeriodComponent
      const reportingPeriod = new ReportingPeriod(new FiscalYear(2011), new FiscalYear(2012))

      // Act
      const cloneWithAdjustment = () => reportingPeriod.cloneWithAdjustment(component, 1, UnitOfTimeGranularity.Year)

      // Assert
      expect(cloneWithAdjustment).toThrow(/must be a valid ReportingPeriodComponent/)
    })
    it('should throw Error when component is invalid value', () => {
      // Arrange
      const component = 22 as ReportingPeriodComponent
      const reportingPeriod = new ReportingPeriod(new FiscalYear(2011), new FiscalYear(2012))

      // Act
      const cloneWithAdjustment = () => reportingPeriod.cloneWithAdjustment(component, 1, UnitOfTimeGranularity.Year)

      // Assert
      expect(cloneWithAdjustment).toThrow(/must be a valid ReportingPeriodComponent/)
    })
    it('should throw Error when component is ReportingPeriodComponent.Invalid', () => {
      // Arrange
      const component = ReportingPeriodComponent.Invalid
      const reportingPeriod = new ReportingPeriod(new FiscalYear(2011), new FiscalYear(2012))

      // Act
      const cloneWithAdjustment = () => reportingPeriod.cloneWithAdjustment(component, 1, UnitOfTimeGranularity.Year)

      // Assert
      expect(cloneWithAdjustment).toThrow(/component cannot have value Invalid/)
    })
    it('should throw Error when granularityOfUnitsToAdd is UnitOfTimeGranularity.Invalid', () => {
      // Arrange
      const component = ReportingPeriodComponent.Both
      const granularityOfUnitsToAdd = UnitOfTimeGranularity.Invalid
      const reportingPeriod = new ReportingPeriod(new FiscalYear(2011), new FiscalYear(2012))

      // Act
      const cloneWithAdjustment = () => reportingPeriod.cloneWithAdjustment(component, 1, granularityOfUnitsToAdd)

      // Assert
      expect(cloneWithAdjustment).toThrow(/granularityOfUnitsToAdd cannot have value Invalid/)
    })
    it('should throw Error when granularityOfUnitsToAdd is undefined', () => {
      // Arrange
      const component = ReportingPeriodComponent.Both
      const granularityOfUnitsToAdd = (undefined as unknown) as UnitOfTimeGranularity
      const reportingPeriod = new ReportingPeriod(new FiscalYear(2011), new FiscalYear(2012))

      // Act
      const cloneWithAdjustment = () => reportingPeriod.cloneWithAdjustment(component, 1, granularityOfUnitsToAdd)

      // Assert
      expect(cloneWithAdjustment).toThrow(/must be a valid UnitOfTimeGranularity/)
    })
    it('should throw Error when granularityOfUnitsToAdd is invalid', () => {
      // Arrange
      const component = ReportingPeriodComponent.Both
      const granularityOfUnitsToAdd = 22
      const reportingPeriod = new ReportingPeriod(new FiscalYear(2011), new FiscalYear(2012))

      // Act
      const cloneWithAdjustment = () => reportingPeriod.cloneWithAdjustment(component, 1, granularityOfUnitsToAdd)

      // Assert
      expect(cloneWithAdjustment).toThrow(/must be a valid UnitOfTimeGranularity/)
    })
    it('should throw Error when granularityOfUnitsToAdd is more granular than component being adjusted', () => {
      // Arrange
      const tests = [
        {
          reportingPeriod: new ReportingPeriod(
            new CalendarMonth(2019, MonthOfYear.July),
            new CalendarMonth(2019, MonthOfYear.July),
          ),
          granularityOfUnitsToAdd: [UnitOfTimeGranularity.Day],
        },
        {
          reportingPeriod: new ReportingPeriod(
            new CalendarQuarter(2013, QuarterNumber.Q3),
            new CalendarQuarter(2013, QuarterNumber.Q3),
          ),
          granularityOfUnitsToAdd: [UnitOfTimeGranularity.Day, UnitOfTimeGranularity.Month],
        },
        {
          reportingPeriod: new ReportingPeriod(new CalendarYear(2015), new CalendarYear(2015)),
          granularityOfUnitsToAdd: [
            UnitOfTimeGranularity.Day,
            UnitOfTimeGranularity.Month,
            UnitOfTimeGranularity.Quarter,
          ],
        },
        {
          reportingPeriod: new ReportingPeriod(
            new FiscalMonth(2019, MonthOfYear.July),
            new FiscalMonth(2019, MonthOfYear.July),
          ),
          granularityOfUnitsToAdd: [UnitOfTimeGranularity.Day],
        },
        {
          reportingPeriod: new ReportingPeriod(
            new FiscalQuarter(2013, QuarterNumber.Q3),
            new FiscalQuarter(2013, QuarterNumber.Q3),
          ),
          granularityOfUnitsToAdd: [UnitOfTimeGranularity.Day, UnitOfTimeGranularity.Month],
        },
        {
          reportingPeriod: new ReportingPeriod(new FiscalYear(2015), new FiscalYear(2015)),
          granularityOfUnitsToAdd: [
            UnitOfTimeGranularity.Day,
            UnitOfTimeGranularity.Month,
            UnitOfTimeGranularity.Quarter,
          ],
        },
      ]

      // Act
      tests.forEach(_ => {
        _.granularityOfUnitsToAdd.forEach(granularity => {
          // Assert
          expect(() => _.reportingPeriod.cloneWithAdjustment(ReportingPeriodComponent.Both, 1, granularity)).toThrow(
            /granularityOfUnitsToAdd is more granular than unitOfTime/,
          )
        })
      })
    })
    it('should adjust start of reportingPeriod when ReportingPeriodComponent is Start', () => {
      // Arrange
      const tests = [
        {
          reportingPeriod: new ReportingPeriod(
            new FiscalMonth(2016, MonthNumber.Four),
            new FiscalMonth(2017, MonthNumber.Eleven),
          ),
          unitsToAdd: 1,
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Month,
          expectedReportingPeriod: new ReportingPeriod(
            new FiscalMonth(2016, MonthNumber.Five),
            new FiscalMonth(2017, MonthNumber.Eleven),
          ),
        },
        {
          reportingPeriod: new ReportingPeriod(
            new FiscalMonth(2016, MonthNumber.Four),
            new FiscalMonth(2017, MonthNumber.Eleven),
          ),
          unitsToAdd: -2,
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Quarter,
          expectedReportingPeriod: new ReportingPeriod(
            new FiscalMonth(2015, MonthNumber.Ten),
            new FiscalMonth(2017, MonthNumber.Eleven),
          ),
        },
        {
          reportingPeriod: new ReportingPeriod(
            new FiscalMonth(2014, MonthNumber.Four),
            new FiscalMonth(2017, MonthNumber.Eleven),
          ),
          unitsToAdd: 2,
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Year,
          expectedReportingPeriod: new ReportingPeriod(
            new FiscalMonth(2016, MonthNumber.Four),
            new FiscalMonth(2017, MonthNumber.Eleven),
          ),
        },
      ]

      // Act, Assert
      for (const test of tests) {
        const actualReportingPeriod = test.reportingPeriod.cloneWithAdjustment(
          ReportingPeriodComponent.Start,
          test.unitsToAdd,
          test.granularityOfUnitsToAdd,
        )
        expect(actualReportingPeriod.equals(test.expectedReportingPeriod)).toBe(true)
      }
    })
    it('should adjust start of reportingPeriod when ReportingPeriodComponent is End', () => {
      // Arrange
      const tests = [
        {
          reportingPeriod: new ReportingPeriod(
            new FiscalMonth(2016, MonthNumber.Four),
            new FiscalMonth(2017, MonthNumber.Eleven),
          ),
          unitsToAdd: 1,
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Month,
          expectedReportingPeriod: new ReportingPeriod(
            new FiscalMonth(2016, MonthNumber.Four),
            new FiscalMonth(2017, MonthNumber.Twelve),
          ),
        },
        {
          reportingPeriod: new ReportingPeriod(
            new FiscalMonth(2016, MonthNumber.Four),
            new FiscalMonth(2017, MonthNumber.Eleven),
          ),
          unitsToAdd: -2,
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Quarter,
          expectedReportingPeriod: new ReportingPeriod(
            new FiscalMonth(2016, MonthNumber.Four),
            new FiscalMonth(2017, MonthNumber.Five),
          ),
        },
        {
          reportingPeriod: new ReportingPeriod(
            new FiscalMonth(2016, MonthNumber.Four),
            new FiscalMonth(2017, MonthNumber.Eleven),
          ),
          unitsToAdd: 2,
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Year,
          expectedReportingPeriod: new ReportingPeriod(
            new FiscalMonth(2016, MonthNumber.Four),
            new FiscalMonth(2019, MonthNumber.Eleven),
          ),
        },
      ]

      // Act, Assert
      for (const test of tests) {
        const actualReportingPeriod = test.reportingPeriod.cloneWithAdjustment(
          ReportingPeriodComponent.End,
          test.unitsToAdd,
          test.granularityOfUnitsToAdd,
        )
        expect(actualReportingPeriod.equals(test.expectedReportingPeriod)).toBe(true)
      }
    })
    it('should adjust start of reportingPeriod when ReportingPeriodComponent is Both', () => {
      // Arrange
      const tests = [
        {
          reportingPeriod: new ReportingPeriod(
            new FiscalMonth(2016, MonthNumber.Four),
            new FiscalMonth(2017, MonthNumber.Eleven),
          ),
          unitsToAdd: 1,
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Month,
          expectedReportingPeriod: new ReportingPeriod(
            new FiscalMonth(2016, MonthNumber.Five),
            new FiscalMonth(2017, MonthNumber.Twelve),
          ),
        },
        {
          reportingPeriod: new ReportingPeriod(
            new FiscalMonth(2016, MonthNumber.Four),
            new FiscalMonth(2017, MonthNumber.Eleven),
          ),
          unitsToAdd: -2,
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Quarter,
          expectedReportingPeriod: new ReportingPeriod(
            new FiscalMonth(2015, MonthNumber.Ten),
            new FiscalMonth(2017, MonthNumber.Five),
          ),
        },
        {
          reportingPeriod: new ReportingPeriod(
            new FiscalMonth(2016, MonthNumber.Four),
            new FiscalMonth(2017, MonthNumber.Eleven),
          ),
          unitsToAdd: 2,
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Year,
          expectedReportingPeriod: new ReportingPeriod(
            new FiscalMonth(2018, MonthNumber.Four),
            new FiscalMonth(2019, MonthNumber.Eleven),
          ),
        },
      ]

      // Act, Assert
      for (const test of tests) {
        const actualReportingPeriod = test.reportingPeriod.cloneWithAdjustment(
          ReportingPeriodComponent.Both,
          test.unitsToAdd,
          test.granularityOfUnitsToAdd,
        )
        expect(actualReportingPeriod.equals(test.expectedReportingPeriod)).toBe(true)
      }
    })
    // tslint:disable-next-line: max-line-length
    it('should throw Error when adjusting Start and adjusting reportingPeriod causes Start to be greater than End', () => {
      // Arrange
      const tests = [
        {
          reportingPeriod: new ReportingPeriod(
            new FiscalMonth(2016, MonthNumber.Four),
            new FiscalMonth(2017, MonthNumber.Eleven),
          ),
          unitsToAdd: 20,
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Month,
        },
        {
          reportingPeriod: new ReportingPeriod(
            new FiscalMonth(2016, MonthNumber.Four),
            new FiscalMonth(2017, MonthNumber.Eleven),
          ),
          unitsToAdd: 7,
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Quarter,
        },
        {
          reportingPeriod: new ReportingPeriod(
            new FiscalMonth(2016, MonthNumber.Four),
            new FiscalMonth(2017, MonthNumber.Eleven),
          ),
          unitsToAdd: 2,
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Year,
        },
      ]

      // Act, Assert
      for (const test of tests) {
        const actualReportingPeriod = () =>
          test.reportingPeriod.cloneWithAdjustment(
            ReportingPeriodComponent.Start,
            test.unitsToAdd,
            test.granularityOfUnitsToAdd,
          )
        expect(actualReportingPeriod).toThrow()
      }
    })
    // tslint:disable-next-line: max-line-length
    it('should throw Error when adjusting End and adjusting reportingPeriod causes End to be less than Start', () => {
      // Arrange
      const tests = [
        {
          reportingPeriod: new ReportingPeriod(
            new FiscalMonth(2016, MonthNumber.Four),
            new FiscalMonth(2017, MonthNumber.Eleven),
          ),
          unitsToAdd: -20,
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Month,
        },
        {
          reportingPeriod: new ReportingPeriod(
            new FiscalMonth(2016, MonthNumber.Four),
            new FiscalMonth(2017, MonthNumber.Eleven),
          ),
          unitsToAdd: -7,
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Quarter,
        },
        {
          reportingPeriod: new ReportingPeriod(
            new FiscalMonth(2016, MonthNumber.Four),
            new FiscalMonth(2017, MonthNumber.Eleven),
          ),
          unitsToAdd: -2,
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Year,
        },
      ]

      // Act, Assert
      for (const test of tests) {
        const actualReportingPeriod = () =>
          test.reportingPeriod.cloneWithAdjustment(
            ReportingPeriodComponent.End,
            test.unitsToAdd,
            test.granularityOfUnitsToAdd,
          )
        expect(actualReportingPeriod).toThrow()
      }
    })
  })
  describe('createPermutations --', () => {
    it('should throw Error when maxUnitsInAnyReportingPeriod is undefined', () => {
      // Arrange
      const reportingPeriod = new ReportingPeriod(new CalendarYear(2000), new CalendarYear(2020))

      // Act
      const createPermutations = () => reportingPeriod.createPermutations((undefined as unknown) as number)

      // Assert
      expect(createPermutations).toThrow(/ must be greater than 0/)
    })
    it('should throw Error when maxUnitsInAnyReportingPeriod is 0', () => {
      // Arrange
      const reportingPeriod = new ReportingPeriod(new CalendarYear(2000), new CalendarYear(2020))

      // Act
      const createPermutations = () => reportingPeriod.createPermutations(0)

      // Assert
      expect(createPermutations).toThrow(/ must be greater than 0/)
    })
    it('should throw Error when maxUnitsInAnyReportingPeriod is negative', () => {
      // Arrange
      const reportingPeriod = new ReportingPeriod(new CalendarYear(2000), new CalendarYear(2020))

      // Act
      const createPermutations = () => reportingPeriod.createPermutations(-20)

      // Assert
      expect(createPermutations).toThrow(/ must be greater than 0/)
    })
    it('should return permutations when call for reportingPeriod of CalendarMonth', () => {
      // Arrange
      const reportingPeriod1 = new ReportingPeriod(
        new CalendarMonth(2016, MonthOfYear.February),
        new CalendarMonth(2016, MonthOfYear.February),
      )
      const reportingPeriod2 = new ReportingPeriod(
        new CalendarMonth(2016, MonthOfYear.February),
        new CalendarMonth(2016, MonthOfYear.June),
      )

      // Act
      const permutations1a = reportingPeriod1.createPermutations(1)
      const permutations1b = reportingPeriod1.createPermutations(5)

      const permutations2a = reportingPeriod2.createPermutations(1)
      const permutations2b = reportingPeriod2.createPermutations(3)

      // Assert
      expect(permutations1a).toEqual([reportingPeriod1])
      expect(permutations1b).toEqual([reportingPeriod1])
      expect(permutations2a).toEqual([
        new ReportingPeriod(
          new CalendarMonth(2016, MonthOfYear.February),
          new CalendarMonth(2016, MonthOfYear.February),
        ),
        new ReportingPeriod(new CalendarMonth(2016, MonthOfYear.March), new CalendarMonth(2016, MonthOfYear.March)),
        new ReportingPeriod(new CalendarMonth(2016, MonthOfYear.April), new CalendarMonth(2016, MonthOfYear.April)),
        new ReportingPeriod(new CalendarMonth(2016, MonthOfYear.May), new CalendarMonth(2016, MonthOfYear.May)),
        new ReportingPeriod(new CalendarMonth(2016, MonthOfYear.June), new CalendarMonth(2016, MonthOfYear.June)),
      ])

      expect(permutations2b).toEqual([
        new ReportingPeriod(
          new CalendarMonth(2016, MonthOfYear.February),
          new CalendarMonth(2016, MonthOfYear.February),
        ),
        new ReportingPeriod(new CalendarMonth(2016, MonthOfYear.February), new CalendarMonth(2016, MonthOfYear.March)),
        new ReportingPeriod(new CalendarMonth(2016, MonthOfYear.February), new CalendarMonth(2016, MonthOfYear.April)),
        new ReportingPeriod(new CalendarMonth(2016, MonthOfYear.March), new CalendarMonth(2016, MonthOfYear.March)),
        new ReportingPeriod(new CalendarMonth(2016, MonthOfYear.March), new CalendarMonth(2016, MonthOfYear.April)),
        new ReportingPeriod(new CalendarMonth(2016, MonthOfYear.March), new CalendarMonth(2016, MonthOfYear.May)),
        new ReportingPeriod(new CalendarMonth(2016, MonthOfYear.April), new CalendarMonth(2016, MonthOfYear.April)),
        new ReportingPeriod(new CalendarMonth(2016, MonthOfYear.April), new CalendarMonth(2016, MonthOfYear.May)),
        new ReportingPeriod(new CalendarMonth(2016, MonthOfYear.April), new CalendarMonth(2016, MonthOfYear.June)),
        new ReportingPeriod(new CalendarMonth(2016, MonthOfYear.May), new CalendarMonth(2016, MonthOfYear.May)),
        new ReportingPeriod(new CalendarMonth(2016, MonthOfYear.May), new CalendarMonth(2016, MonthOfYear.June)),
        new ReportingPeriod(new CalendarMonth(2016, MonthOfYear.June), new CalendarMonth(2016, MonthOfYear.June)),
      ])
    })
    it('should return permuations when call for reportingPeriod of FiscalMonth', () => {
      // Arrange
      const reportingPeriod1 = new ReportingPeriod(
        new FiscalMonth(2016, MonthNumber.Two),
        new FiscalMonth(2016, MonthNumber.Two),
      )
      const reportingPeriod2 = new ReportingPeriod(
        new FiscalMonth(2016, MonthNumber.Two),
        new FiscalMonth(2016, MonthNumber.Six),
      )

      // Act
      const permutations1a = reportingPeriod1.createPermutations(1)
      const permutations1b = reportingPeriod1.createPermutations(5)

      const permutations2a = reportingPeriod2.createPermutations(1)
      const permutations2b = reportingPeriod2.createPermutations(3)

      // Assert
      expect(permutations1a).toEqual([reportingPeriod1])
      expect(permutations1b).toEqual([reportingPeriod1])

      expect(permutations2a).toEqual([
        new ReportingPeriod(new FiscalMonth(2016, MonthNumber.Two), new FiscalMonth(2016, MonthNumber.Two)),
        new ReportingPeriod(new FiscalMonth(2016, MonthNumber.Three), new FiscalMonth(2016, MonthNumber.Three)),
        new ReportingPeriod(new FiscalMonth(2016, MonthNumber.Four), new FiscalMonth(2016, MonthNumber.Four)),
        new ReportingPeriod(new FiscalMonth(2016, MonthNumber.Five), new FiscalMonth(2016, MonthNumber.Five)),
        new ReportingPeriod(new FiscalMonth(2016, MonthNumber.Six), new FiscalMonth(2016, MonthNumber.Six)),
      ])

      expect(permutations2b).toEqual([
        new ReportingPeriod(new FiscalMonth(2016, MonthNumber.Two), new FiscalMonth(2016, MonthNumber.Two)),
        new ReportingPeriod(new FiscalMonth(2016, MonthNumber.Two), new FiscalMonth(2016, MonthNumber.Three)),
        new ReportingPeriod(new FiscalMonth(2016, MonthNumber.Two), new FiscalMonth(2016, MonthNumber.Four)),
        new ReportingPeriod(new FiscalMonth(2016, MonthNumber.Three), new FiscalMonth(2016, MonthNumber.Three)),
        new ReportingPeriod(new FiscalMonth(2016, MonthNumber.Three), new FiscalMonth(2016, MonthNumber.Four)),
        new ReportingPeriod(new FiscalMonth(2016, MonthNumber.Three), new FiscalMonth(2016, MonthNumber.Five)),
        new ReportingPeriod(new FiscalMonth(2016, MonthNumber.Four), new FiscalMonth(2016, MonthNumber.Four)),
        new ReportingPeriod(new FiscalMonth(2016, MonthNumber.Four), new FiscalMonth(2016, MonthNumber.Five)),
        new ReportingPeriod(new FiscalMonth(2016, MonthNumber.Four), new FiscalMonth(2016, MonthNumber.Six)),
        new ReportingPeriod(new FiscalMonth(2016, MonthNumber.Five), new FiscalMonth(2016, MonthNumber.Five)),
        new ReportingPeriod(new FiscalMonth(2016, MonthNumber.Five), new FiscalMonth(2016, MonthNumber.Six)),
        new ReportingPeriod(new FiscalMonth(2016, MonthNumber.Six), new FiscalMonth(2016, MonthNumber.Six)),
      ])
    })
    it('should return permuations when call for reportingPeriod of CalendarQuarter', () => {
      // Arrange
      const reportingPeriod1 = new ReportingPeriod(
        new CalendarQuarter(2016, QuarterNumber.Q2),
        new CalendarQuarter(2016, QuarterNumber.Q2),
      )
      const reportingPeriod2 = new ReportingPeriod(
        new CalendarQuarter(2016, QuarterNumber.Q2),
        new CalendarQuarter(2017, QuarterNumber.Q2),
      )

      // Act
      const permutations1a = reportingPeriod1.createPermutations(1)
      const permutations1b = reportingPeriod1.createPermutations(5)

      const permutations2a = reportingPeriod2.createPermutations(1)
      const permutations2b = reportingPeriod2.createPermutations(3)

      // Assert
      expect(permutations1a).toEqual([reportingPeriod1])
      expect(permutations1b).toEqual([reportingPeriod1])

      expect(permutations2a).toEqual([
        new ReportingPeriod(new CalendarQuarter(2016, QuarterNumber.Q2), new CalendarQuarter(2016, QuarterNumber.Q2)),
        new ReportingPeriod(new CalendarQuarter(2016, QuarterNumber.Q3), new CalendarQuarter(2016, QuarterNumber.Q3)),
        new ReportingPeriod(new CalendarQuarter(2016, QuarterNumber.Q4), new CalendarQuarter(2016, QuarterNumber.Q4)),
        new ReportingPeriod(new CalendarQuarter(2017, QuarterNumber.Q1), new CalendarQuarter(2017, QuarterNumber.Q1)),
        new ReportingPeriod(new CalendarQuarter(2017, QuarterNumber.Q2), new CalendarQuarter(2017, QuarterNumber.Q2)),
      ])

      expect(permutations2b).toEqual([
        new ReportingPeriod(new CalendarQuarter(2016, QuarterNumber.Q2), new CalendarQuarter(2016, QuarterNumber.Q2)),
        new ReportingPeriod(new CalendarQuarter(2016, QuarterNumber.Q2), new CalendarQuarter(2016, QuarterNumber.Q3)),
        new ReportingPeriod(new CalendarQuarter(2016, QuarterNumber.Q2), new CalendarQuarter(2016, QuarterNumber.Q4)),
        new ReportingPeriod(new CalendarQuarter(2016, QuarterNumber.Q3), new CalendarQuarter(2016, QuarterNumber.Q3)),
        new ReportingPeriod(new CalendarQuarter(2016, QuarterNumber.Q3), new CalendarQuarter(2016, QuarterNumber.Q4)),
        new ReportingPeriod(new CalendarQuarter(2016, QuarterNumber.Q3), new CalendarQuarter(2017, QuarterNumber.Q1)),
        new ReportingPeriod(new CalendarQuarter(2016, QuarterNumber.Q4), new CalendarQuarter(2016, QuarterNumber.Q4)),
        new ReportingPeriod(new CalendarQuarter(2016, QuarterNumber.Q4), new CalendarQuarter(2017, QuarterNumber.Q1)),
        new ReportingPeriod(new CalendarQuarter(2016, QuarterNumber.Q4), new CalendarQuarter(2017, QuarterNumber.Q2)),
        new ReportingPeriod(new CalendarQuarter(2017, QuarterNumber.Q1), new CalendarQuarter(2017, QuarterNumber.Q1)),
        new ReportingPeriod(new CalendarQuarter(2017, QuarterNumber.Q1), new CalendarQuarter(2017, QuarterNumber.Q2)),
        new ReportingPeriod(new CalendarQuarter(2017, QuarterNumber.Q2), new CalendarQuarter(2017, QuarterNumber.Q2)),
      ])
    })
    it('should return permuations when call for reportingPeriod of FiscalQuarter', () => {
      // Arrange
      const reportingPeriod1 = new ReportingPeriod(
        new FiscalQuarter(2016, QuarterNumber.Q2),
        new FiscalQuarter(2016, QuarterNumber.Q2),
      )
      const reportingPeriod2 = new ReportingPeriod(
        new FiscalQuarter(2016, QuarterNumber.Q2),
        new FiscalQuarter(2017, QuarterNumber.Q2),
      )

      // Act
      const permutations1a = reportingPeriod1.createPermutations(1)
      const permutations1b = reportingPeriod1.createPermutations(5)

      const permutations2a = reportingPeriod2.createPermutations(1)
      const permutations2b = reportingPeriod2.createPermutations(3)

      // Assert
      expect(permutations1a).toEqual([reportingPeriod1])
      expect(permutations1b).toEqual([reportingPeriod1])

      expect(permutations2a).toEqual([
        new ReportingPeriod(new FiscalQuarter(2016, QuarterNumber.Q2), new FiscalQuarter(2016, QuarterNumber.Q2)),
        new ReportingPeriod(new FiscalQuarter(2016, QuarterNumber.Q3), new FiscalQuarter(2016, QuarterNumber.Q3)),
        new ReportingPeriod(new FiscalQuarter(2016, QuarterNumber.Q4), new FiscalQuarter(2016, QuarterNumber.Q4)),
        new ReportingPeriod(new FiscalQuarter(2017, QuarterNumber.Q1), new FiscalQuarter(2017, QuarterNumber.Q1)),
        new ReportingPeriod(new FiscalQuarter(2017, QuarterNumber.Q2), new FiscalQuarter(2017, QuarterNumber.Q2)),
      ])

      expect(permutations2b).toEqual([
        new ReportingPeriod(new FiscalQuarter(2016, QuarterNumber.Q2), new FiscalQuarter(2016, QuarterNumber.Q2)),
        new ReportingPeriod(new FiscalQuarter(2016, QuarterNumber.Q2), new FiscalQuarter(2016, QuarterNumber.Q3)),
        new ReportingPeriod(new FiscalQuarter(2016, QuarterNumber.Q2), new FiscalQuarter(2016, QuarterNumber.Q4)),
        new ReportingPeriod(new FiscalQuarter(2016, QuarterNumber.Q3), new FiscalQuarter(2016, QuarterNumber.Q3)),
        new ReportingPeriod(new FiscalQuarter(2016, QuarterNumber.Q3), new FiscalQuarter(2016, QuarterNumber.Q4)),
        new ReportingPeriod(new FiscalQuarter(2016, QuarterNumber.Q3), new FiscalQuarter(2017, QuarterNumber.Q1)),
        new ReportingPeriod(new FiscalQuarter(2016, QuarterNumber.Q4), new FiscalQuarter(2016, QuarterNumber.Q4)),
        new ReportingPeriod(new FiscalQuarter(2016, QuarterNumber.Q4), new FiscalQuarter(2017, QuarterNumber.Q1)),
        new ReportingPeriod(new FiscalQuarter(2016, QuarterNumber.Q4), new FiscalQuarter(2017, QuarterNumber.Q2)),
        new ReportingPeriod(new FiscalQuarter(2017, QuarterNumber.Q1), new FiscalQuarter(2017, QuarterNumber.Q1)),
        new ReportingPeriod(new FiscalQuarter(2017, QuarterNumber.Q1), new FiscalQuarter(2017, QuarterNumber.Q2)),
        new ReportingPeriod(new FiscalQuarter(2017, QuarterNumber.Q2), new FiscalQuarter(2017, QuarterNumber.Q2)),
      ])
    })
    it('should return permuations when call for reportingPeriod of CalendarYear', () => {
      // Arrange
      const reportingPeriod1 = new ReportingPeriod(new CalendarYear(2016), new CalendarYear(2016))
      const reportingPeriod2 = new ReportingPeriod(new CalendarYear(2016), new CalendarYear(2019))

      // Act
      const permutations1a = reportingPeriod1.createPermutations(1)
      const permutations1b = reportingPeriod1.createPermutations(5)

      const permutations2a = reportingPeriod2.createPermutations(1)
      const permutations2b = reportingPeriod2.createPermutations(3)

      // Assert
      expect(permutations1a).toEqual([reportingPeriod1])
      expect(permutations1b).toEqual([reportingPeriod1])

      expect(permutations2a).toEqual([
        new ReportingPeriod(new CalendarYear(2016), new CalendarYear(2016)),
        new ReportingPeriod(new CalendarYear(2017), new CalendarYear(2017)),
        new ReportingPeriod(new CalendarYear(2018), new CalendarYear(2018)),
        new ReportingPeriod(new CalendarYear(2019), new CalendarYear(2019)),
      ])

      expect(permutations2b).toEqual([
        new ReportingPeriod(new CalendarYear(2016), new CalendarYear(2016)),
        new ReportingPeriod(new CalendarYear(2016), new CalendarYear(2017)),
        new ReportingPeriod(new CalendarYear(2016), new CalendarYear(2018)),
        new ReportingPeriod(new CalendarYear(2017), new CalendarYear(2017)),
        new ReportingPeriod(new CalendarYear(2017), new CalendarYear(2018)),
        new ReportingPeriod(new CalendarYear(2017), new CalendarYear(2019)),
        new ReportingPeriod(new CalendarYear(2018), new CalendarYear(2018)),
        new ReportingPeriod(new CalendarYear(2018), new CalendarYear(2019)),
        new ReportingPeriod(new CalendarYear(2019), new CalendarYear(2019)),
      ])
    })
    it('should return permuations when call for reportingPeriod of FiscalYear', () => {
      // Arrange
      const reportingPeriod1 = new ReportingPeriod(new FiscalYear(2016), new FiscalYear(2016))
      const reportingPeriod2 = new ReportingPeriod(new FiscalYear(2016), new FiscalYear(2019))

      // Act
      const permutations1a = reportingPeriod1.createPermutations(1)
      const permutations1b = reportingPeriod1.createPermutations(5)

      const permutations2a = reportingPeriod2.createPermutations(1)
      const permutations2b = reportingPeriod2.createPermutations(3)

      // Assert
      expect(permutations1a).toEqual([reportingPeriod1])
      expect(permutations1b).toEqual([reportingPeriod1])

      expect(permutations2a).toEqual([
        new ReportingPeriod(new FiscalYear(2016), new FiscalYear(2016)),
        new ReportingPeriod(new FiscalYear(2017), new FiscalYear(2017)),
        new ReportingPeriod(new FiscalYear(2018), new FiscalYear(2018)),
        new ReportingPeriod(new FiscalYear(2019), new FiscalYear(2019)),
      ])

      expect(permutations2b).toEqual([
        new ReportingPeriod(new FiscalYear(2016), new FiscalYear(2016)),
        new ReportingPeriod(new FiscalYear(2016), new FiscalYear(2017)),
        new ReportingPeriod(new FiscalYear(2016), new FiscalYear(2018)),
        new ReportingPeriod(new FiscalYear(2017), new FiscalYear(2017)),
        new ReportingPeriod(new FiscalYear(2017), new FiscalYear(2018)),
        new ReportingPeriod(new FiscalYear(2017), new FiscalYear(2019)),
        new ReportingPeriod(new FiscalYear(2018), new FiscalYear(2018)),
        new ReportingPeriod(new FiscalYear(2018), new FiscalYear(2019)),
        new ReportingPeriod(new FiscalYear(2019), new FiscalYear(2019)),
      ])
    })
  })
  describe('split --', () => {
    it('should throw Error when granularity is undefined', () => {
      // Arrange
      const reportingPeriod = new ReportingPeriod(new CalendarYear(2000), new CalendarYear(2020))

      // Act
      const createPermutations = () => reportingPeriod.split((undefined as unknown) as number)

      // Assert
      expect(createPermutations).toThrow(/must be a valid UnitOfTimeGranularity/)
    })
    it('should throw Error when granularity is Invalid or Unbounded', () => {
      // Arrange
      const reportingPeriod = new ReportingPeriod(new CalendarYear(2000), new CalendarYear(2020))

      // Act
      const createPermutationsInvalid = () => reportingPeriod.split(UnitOfTimeGranularity.Invalid)
      const createPermutationsUnbounded = () => reportingPeriod.split(UnitOfTimeGranularity.Unbounded)

      // Assert
      expect(createPermutationsInvalid).toThrow(/granularity must not be Invalid or Unbounded/)
      expect(createPermutationsUnbounded).toThrow(/granularity must not be Invalid or Unbounded/)
    })
    // tslint:disable-next-line: max-line-length
    it('should return reportingPeriod split into CalendarYear when reportingPeriod is in CalendarYear and granularity is Year', () => {
      // Arrange
      const reportingPeriods = [
        {
          reportingPeriod: new ReportingPeriod(new CalendarYear(2017), new CalendarYear(2017)),
          expectedUnitsOfTime: [new CalendarYear(2017)],
        },
        {
          reportingPeriod: new ReportingPeriod(new CalendarYear(2017), new CalendarYear(2018)),
          expectedUnitsOfTime: [new CalendarYear(2017), new CalendarYear(2018)],
        },
      ]

      // Act
      const results = reportingPeriods.map(_ => {
        return { actual: _.reportingPeriod.split(UnitOfTimeGranularity.Year), expected: _.expectedUnitsOfTime }
      })

      // Assert
      results.forEach(_ => expect(_.actual).toEqual(_.expected))
    })
    // tslint:disable-next-line: max-line-length
    it('should return reportingPeriod split into CalendarQuarter when reportingPeriod is in CalendarYear and granularity is Quarter', () => {
      // Arrange
      const reportingPeriods = [
        {
          reportingPeriod: new ReportingPeriod(new CalendarYear(2017), new CalendarYear(2017)),
          expectedUnitsOfTime: [
            new CalendarQuarter(2017, QuarterNumber.Q1),
            new CalendarQuarter(2017, QuarterNumber.Q2),
            new CalendarQuarter(2017, QuarterNumber.Q3),
            new CalendarQuarter(2017, QuarterNumber.Q4),
          ],
        },
        {
          reportingPeriod: new ReportingPeriod(new CalendarYear(2017), new CalendarYear(2018)),
          expectedUnitsOfTime: [
            new CalendarQuarter(2017, QuarterNumber.Q1),
            new CalendarQuarter(2017, QuarterNumber.Q2),
            new CalendarQuarter(2017, QuarterNumber.Q3),
            new CalendarQuarter(2017, QuarterNumber.Q4),
            new CalendarQuarter(2018, QuarterNumber.Q1),
            new CalendarQuarter(2018, QuarterNumber.Q2),
            new CalendarQuarter(2018, QuarterNumber.Q3),
            new CalendarQuarter(2018, QuarterNumber.Q4),
          ],
        },
      ]

      // Act
      const results = reportingPeriods.map(_ => {
        return { actual: _.reportingPeriod.split(UnitOfTimeGranularity.Quarter), expected: _.expectedUnitsOfTime }
      })

      // Assert
      results.forEach(_ => expect(_.actual).toEqual(_.expected))
    })
    // tslint:disable-next-line: max-line-length
    it('should return reportingPeriod split into CalendarMonth when reportingPeriod is in CalendarYear and granularity is Month', () => {
      // Arrange
      const reportingPeriods = [
        {
          reportingPeriod: new ReportingPeriod(new CalendarYear(2017), new CalendarYear(2017)),
          expectedUnitsOfTime: [
            new CalendarMonth(2017, MonthOfYear.January),
            new CalendarMonth(2017, MonthOfYear.February),
            new CalendarMonth(2017, MonthOfYear.March),
            new CalendarMonth(2017, MonthOfYear.April),
            new CalendarMonth(2017, MonthOfYear.May),
            new CalendarMonth(2017, MonthOfYear.June),
            new CalendarMonth(2017, MonthOfYear.July),
            new CalendarMonth(2017, MonthOfYear.August),
            new CalendarMonth(2017, MonthOfYear.September),
            new CalendarMonth(2017, MonthOfYear.October),
            new CalendarMonth(2017, MonthOfYear.November),
            new CalendarMonth(2017, MonthOfYear.December),
          ],
        },
        {
          reportingPeriod: new ReportingPeriod(new CalendarYear(2017), new CalendarYear(2018)),
          expectedUnitsOfTime: [
            new CalendarMonth(2017, MonthOfYear.January),
            new CalendarMonth(2017, MonthOfYear.February),
            new CalendarMonth(2017, MonthOfYear.March),
            new CalendarMonth(2017, MonthOfYear.April),
            new CalendarMonth(2017, MonthOfYear.May),
            new CalendarMonth(2017, MonthOfYear.June),
            new CalendarMonth(2017, MonthOfYear.July),
            new CalendarMonth(2017, MonthOfYear.August),
            new CalendarMonth(2017, MonthOfYear.September),
            new CalendarMonth(2017, MonthOfYear.October),
            new CalendarMonth(2017, MonthOfYear.November),
            new CalendarMonth(2017, MonthOfYear.December),
            new CalendarMonth(2018, MonthOfYear.January),
            new CalendarMonth(2018, MonthOfYear.February),
            new CalendarMonth(2018, MonthOfYear.March),
            new CalendarMonth(2018, MonthOfYear.April),
            new CalendarMonth(2018, MonthOfYear.May),
            new CalendarMonth(2018, MonthOfYear.June),
            new CalendarMonth(2018, MonthOfYear.July),
            new CalendarMonth(2018, MonthOfYear.August),
            new CalendarMonth(2018, MonthOfYear.September),
            new CalendarMonth(2018, MonthOfYear.October),
            new CalendarMonth(2018, MonthOfYear.November),
            new CalendarMonth(2018, MonthOfYear.December),
          ],
        },
      ]
      // Act
      const results = reportingPeriods.map(_ => {
        return { actual: _.reportingPeriod.split(UnitOfTimeGranularity.Month), expected: _.expectedUnitsOfTime }
      })

      // Assert
      results.forEach(_ => expect(_.actual).toEqual(_.expected))
    })
    // tslint:disable-next-line: max-line-length
    it('should throw Error when reportingPeriods is in CalendarQuarter and granularity is Year and there is overflow', () => {
      // Arrange
      const reportingPeriods = [
        new ReportingPeriod(new CalendarQuarter(2017, QuarterNumber.Q1), new CalendarQuarter(2019, QuarterNumber.Q3)),
        new ReportingPeriod(new CalendarQuarter(2017, QuarterNumber.Q2), new CalendarQuarter(2019, QuarterNumber.Q4)),
        new ReportingPeriod(new CalendarQuarter(2017, QuarterNumber.Q1), new CalendarQuarter(2017, QuarterNumber.Q1)),
        new ReportingPeriod(new CalendarQuarter(2017, QuarterNumber.Q4), new CalendarQuarter(2019, QuarterNumber.Q3)),
      ]

      // Act
      const splitFunctions = reportingPeriods.map(_ => () => _.split(UnitOfTimeGranularity.Year))

      // Assert
      splitFunctions.forEach(_ => {
        expect(_).toThrow()
      })
    })
    // tslint:disable-next-line: max-line-length
    it('should return reportingPeriod split into CalendarYear when reportingPeriod is in CalendarQuarter and granularity is Year', () => {
      // Arrange
      const reportingPeriods = [
        {
          reportingPeriod: new ReportingPeriod(
            new CalendarQuarter(2017, QuarterNumber.Q1),
            new CalendarQuarter(2017, QuarterNumber.Q4),
          ),
          expectedUnitsOfTime: [new CalendarYear(2017)],
        },
        {
          reportingPeriod: new ReportingPeriod(
            new CalendarQuarter(2017, QuarterNumber.Q1),
            new CalendarQuarter(2018, QuarterNumber.Q4),
          ),
          expectedUnitsOfTime: [new CalendarYear(2017), new CalendarYear(2018)],
        },
      ]

      // Act
      const results = reportingPeriods.map(_ => {
        return { actual: _.reportingPeriod.split(UnitOfTimeGranularity.Year), expected: _.expectedUnitsOfTime }
      })

      // Assert
      results.forEach(_ => expect(_.actual).toEqual(_.expected))
    })
    // tslint:disable-next-line: max-line-length
    it('should return reportingPeriod split into CalendarQuarter when reportingPeriod is in CalendarQuarter and granularity is Quarter', () => {
      // Arrange
      const reportingPeriods = [
        {
          reportingPeriod: new ReportingPeriod(
            new CalendarQuarter(2017, QuarterNumber.Q1),
            new CalendarQuarter(2017, QuarterNumber.Q1),
          ),
          expectedUnitsOfTime: [new CalendarQuarter(2017, QuarterNumber.Q1)],
        },
        {
          reportingPeriod: new ReportingPeriod(
            new CalendarQuarter(2017, QuarterNumber.Q2),
            new CalendarQuarter(2018, QuarterNumber.Q2),
          ),
          expectedUnitsOfTime: [
            new CalendarQuarter(2017, QuarterNumber.Q2),
            new CalendarQuarter(2017, QuarterNumber.Q3),
            new CalendarQuarter(2017, QuarterNumber.Q4),
            new CalendarQuarter(2018, QuarterNumber.Q1),
            new CalendarQuarter(2018, QuarterNumber.Q2),
          ],
        },
      ]

      // Act
      const results = reportingPeriods.map(_ => {
        return { actual: _.reportingPeriod.split(UnitOfTimeGranularity.Quarter), expected: _.expectedUnitsOfTime }
      })

      // Assert
      results.forEach(_ => expect(_.actual).toEqual(_.expected))
    })
    // tslint:disable-next-line: max-line-length
    it('should return reportingPeriod split into CalendarMonth when reportingPeriod is in CalendarQuarter and granularity is Month', () => {
      // Arrange
      const reportingPeriods = [
        {
          reportingPeriod: new ReportingPeriod(
            new CalendarQuarter(2017, QuarterNumber.Q1),
            new CalendarQuarter(2017, QuarterNumber.Q1),
          ),
          expectedUnitsOfTime: [
            new CalendarMonth(2017, MonthOfYear.January),
            new CalendarMonth(2017, MonthOfYear.February),
            new CalendarMonth(2017, MonthOfYear.March),
          ],
        },
        {
          reportingPeriod: new ReportingPeriod(
            new CalendarQuarter(2017, QuarterNumber.Q2),
            new CalendarQuarter(2017, QuarterNumber.Q2),
          ),
          expectedUnitsOfTime: [
            new CalendarMonth(2017, MonthOfYear.April),
            new CalendarMonth(2017, MonthOfYear.May),
            new CalendarMonth(2017, MonthOfYear.June),
          ],
        },
      ]

      // Act
      const results = reportingPeriods.map(_ => {
        return { actual: _.reportingPeriod.split(UnitOfTimeGranularity.Month), expected: _.expectedUnitsOfTime }
      })

      // Assert
      results.forEach(_ => expect(_.actual).toEqual(_.expected))
    })
  })
})
