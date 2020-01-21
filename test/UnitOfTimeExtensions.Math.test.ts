import expect from 'expect'

import { CalendarMonth } from '../src/CalendarMonth'
import { CalendarQuarter } from '../src/CalendarQuarter'
import { CalendarYear } from '../src/CalendarYear'
import { FiscalMonth } from '../src/FiscalMonth'
import { FiscalQuarter } from '../src/FiscalQuarter'
import { FiscalUnitOfTime } from '../src/FiscalUnitOfTime'
import { FiscalYear } from '../src/FiscalYear'
import { GenericMonth } from '../src/GenericMonth'
import { GenericQuarter } from '../src/GenericQuarter'
import { GenericYear } from '../src/GenericYear'
import { MonthNumber } from '../src/MonthNumber'
import { MonthOfYear } from '../src/MonthOfYear'
import { QuarterNumber } from '../src/QuarterNumber'
import { UnitOfTime } from '../src/UnitOfTime'
import { UnitOfTimeGranularity } from '../src/UnitOfTimeGranularity'

import '../src/extensions/UnitOfTimeExtensions.Math'

describe('UnitOfTimeExtensions.Math --', () => {
  describe('plus --', () => {
    it('should throw Error when granularityOfUnitsToAdd is not an enum value', () => {
      // Arrange
      const invalidUnitOfTimeGranularity = 99
      const calendarMonth = new CalendarMonth(2020, MonthNumber.Nine)

      // Act
      const plus = () => calendarMonth.plus(1, invalidUnitOfTimeGranularity)

      // Assert
      expect(plus).toThrow(`This UnitOfTimeGranularity is not supported: ${invalidUnitOfTimeGranularity}`)
    })
    it('should throw Error when granularityOfUnitsToAdd is Invalid', () => {
      // Arrange
      const unitOfTimeGranularity = UnitOfTimeGranularity.Invalid
      const calendarMonth = new CalendarMonth(2020, MonthNumber.Nine)

      // Act
      const plus = () => calendarMonth.plus(1, unitOfTimeGranularity)

      // Assert
      expect(plus).toThrow('UnitOfTimeGranularity cannot be Invalid or Unbounded')
    })
    it('should throw Error when granularityOfUnitsToAdd is Unbounded', () => {
      // Arrange
      const unitOfTimeGranularity = UnitOfTimeGranularity.Unbounded
      const calendarMonth = new CalendarMonth(2020, MonthNumber.Nine)

      // Act
      const plus = () => calendarMonth.plus(1, unitOfTimeGranularity)

      // Assert
      expect(plus).toThrow('UnitOfTimeGranularity cannot be Invalid or Unbounded')
    })
    // tslint:disable-next-line: max-line-length
    it('should return same UnitOfTime when parameter UnitOfTimeGranularity is explicitly specified or uses UnitOfTime default ', () => {
      // Arrange
      const unitOfTimeGranularity = UnitOfTimeGranularity.Month
      const calendarMonth = new CalendarMonth(2020, MonthNumber.Nine)

      // Act
      const newCalendarMonth1 = calendarMonth.plus(1)
      const newCalendarMonth2 = calendarMonth.plus(1, unitOfTimeGranularity)

      // Assert
      expect(newCalendarMonth1.equals(newCalendarMonth2)).toBe(true)
    })
    it('should return same CalendarMonth when unitOfTime is a CalendarMonth and parameter unitsToAdd is 0', () => {
      // Arrange
      const expectedUnitOfTime = new CalendarMonth(2020, MonthNumber.Nine)

      // Act
      const actualUnitOfTime = expectedUnitOfTime.plus(0)

      // Assert
      expect(actualUnitOfTime.equals(expectedUnitOfTime)).toBe(true)
    })
    it('should add CalendarMonths when unitOfTime is a CalendarMonth and parameter unitsToAdd is positive', () => {
      // Arrange
      const systemUnderTest = new CalendarMonth(2016, MonthOfYear.November)

      const expectedUnitOfTime1 = new CalendarMonth(2016, MonthOfYear.December)
      const expectedUnitOfTime2 = new CalendarMonth(2017, MonthOfYear.January)
      const expectedUnitOfTime3 = new CalendarMonth(2017, MonthOfYear.May)
      const expectedUnitOfTime4 = new CalendarMonth(2018, MonthOfYear.February)

      // Act
      const actualUnitOfTime1 = systemUnderTest.plus(1)
      const actualUnitOfTime2 = systemUnderTest.plus(2)
      const actualUnitOfTime3 = systemUnderTest.plus(6)
      const actualUnitOfTime4 = systemUnderTest.plus(15)

      // Assert
      expect(actualUnitOfTime1.equals(expectedUnitOfTime1)).toBe(true)
      expect(actualUnitOfTime2.equals(expectedUnitOfTime2)).toBe(true)
      expect(actualUnitOfTime3.equals(expectedUnitOfTime3)).toBe(true)
      expect(actualUnitOfTime4.equals(expectedUnitOfTime4)).toBe(true)
    })
    it('should subtract CalendarMonths when unitOfTime is a CalendarMonth and parameter unitsToAdd is negative', () => {
      // Arrange
      const systemUnderTest = new CalendarMonth(2016, MonthOfYear.November)

      const expectedUnitOfTime1 = new CalendarMonth(2016, MonthOfYear.October)
      const expectedUnitOfTime2 = new CalendarMonth(2016, MonthOfYear.September)
      const expectedUnitOfTime3 = new CalendarMonth(2015, MonthOfYear.December)
      const expectedUnitOfTime4 = new CalendarMonth(2015, MonthOfYear.August)

      // Act
      const actualUnitOfTime1 = systemUnderTest.plus(-1)
      const actualUnitOfTime2 = systemUnderTest.plus(-2)
      const actualUnitOfTime3 = systemUnderTest.plus(-11)
      const actualUnitOfTime4 = systemUnderTest.plus(-15)

      // Assert
      expect(actualUnitOfTime1.equals(expectedUnitOfTime1)).toBe(true)
      expect(actualUnitOfTime2.equals(expectedUnitOfTime2)).toBe(true)
      expect(actualUnitOfTime3.equals(expectedUnitOfTime3)).toBe(true)
      expect(actualUnitOfTime4.equals(expectedUnitOfTime4)).toBe(true)
    })
    it('should return same FiscalMonth when unitOfTime is a FiscalMonth and parameter unitsToAdd is 0', () => {
      // Arrange
      const expectedUnitOfTime = new FiscalMonth(2020, MonthNumber.Nine)

      // Act
      const actualUnitOfTime = expectedUnitOfTime.plus(0)

      // Assert
      expect(actualUnitOfTime.equals(expectedUnitOfTime)).toBe(true)
    })
    it('should add FiscalMonths when unitOfTime is a FiscalMonth and parameter unitsToAdd is positive', () => {
      // Arrange
      const systemUnderTest = new FiscalMonth(2016, MonthOfYear.November)

      const expectedUnitOfTime1 = new FiscalMonth(2016, MonthOfYear.December)
      const expectedUnitOfTime2 = new FiscalMonth(2017, MonthOfYear.January)
      const expectedUnitOfTime3 = new FiscalMonth(2017, MonthOfYear.May)
      const expectedUnitOfTime4 = new FiscalMonth(2018, MonthOfYear.February)

      // Act
      const actualUnitOfTime1 = systemUnderTest.plus(1)
      const actualUnitOfTime2 = systemUnderTest.plus(2)
      const actualUnitOfTime3 = systemUnderTest.plus(6)
      const actualUnitOfTime4 = systemUnderTest.plus(15)

      // Assert
      expect(actualUnitOfTime1.equals(expectedUnitOfTime1)).toBe(true)
      expect(actualUnitOfTime2.equals(expectedUnitOfTime2)).toBe(true)
      expect(actualUnitOfTime3.equals(expectedUnitOfTime3)).toBe(true)
      expect(actualUnitOfTime4.equals(expectedUnitOfTime4)).toBe(true)
    })
    it('should subtract FiscalMonths when unitOfTime is a FiscalMonth and parameter unitsToAdd is negative', () => {
      // Arrange
      const systemUnderTest = new FiscalMonth(2016, MonthOfYear.November)

      const expectedUnitOfTime1 = new FiscalMonth(2016, MonthOfYear.October)
      const expectedUnitOfTime2 = new FiscalMonth(2016, MonthOfYear.September)
      const expectedUnitOfTime3 = new FiscalMonth(2015, MonthOfYear.December)
      const expectedUnitOfTime4 = new FiscalMonth(2015, MonthOfYear.August)

      // Act
      const actualUnitOfTime1 = systemUnderTest.plus(-1)
      const actualUnitOfTime2 = systemUnderTest.plus(-2)
      const actualUnitOfTime3 = systemUnderTest.plus(-11)
      const actualUnitOfTime4 = systemUnderTest.plus(-15)

      // Assert
      expect(actualUnitOfTime1.equals(expectedUnitOfTime1)).toBe(true)
      expect(actualUnitOfTime2.equals(expectedUnitOfTime2)).toBe(true)
      expect(actualUnitOfTime3.equals(expectedUnitOfTime3)).toBe(true)
      expect(actualUnitOfTime4.equals(expectedUnitOfTime4)).toBe(true)
    })
    it('should return same GenericMonth when unitOfTime is a GenericMonth and parameter unitsToAdd is 0', () => {
      // Arrange
      const expectedUnitOfTime = new GenericMonth(2020, MonthNumber.Nine)

      // Act
      const actualUnitOfTime = expectedUnitOfTime.plus(0)

      // Assert
      expect(actualUnitOfTime.equals(expectedUnitOfTime)).toBe(true)
    })
    it('should add GenericMonths when unitOfTime is a GenericMonth and parameter unitsToAdd is positive', () => {
      // Arrange
      const systemUnderTest = new GenericMonth(2016, MonthOfYear.November)

      const expectedUnitOfTime1 = new GenericMonth(2016, MonthOfYear.December)
      const expectedUnitOfTime2 = new GenericMonth(2017, MonthOfYear.January)
      const expectedUnitOfTime3 = new GenericMonth(2017, MonthOfYear.May)
      const expectedUnitOfTime4 = new GenericMonth(2018, MonthOfYear.February)

      // Act
      const actualUnitOfTime1 = systemUnderTest.plus(1)
      const actualUnitOfTime2 = systemUnderTest.plus(2)
      const actualUnitOfTime3 = systemUnderTest.plus(6)
      const actualUnitOfTime4 = systemUnderTest.plus(15)

      // Assert
      expect(actualUnitOfTime1.equals(expectedUnitOfTime1)).toBe(true)
      expect(actualUnitOfTime2.equals(expectedUnitOfTime2)).toBe(true)
      expect(actualUnitOfTime3.equals(expectedUnitOfTime3)).toBe(true)
      expect(actualUnitOfTime4.equals(expectedUnitOfTime4)).toBe(true)
    })
    it('should subtract GenericMonths when unitOfTime is a GenericMonth and parameter unitsToAdd is negative', () => {
      // Arrange
      const systemUnderTest = new GenericMonth(2016, MonthOfYear.November)

      const expectedUnitOfTime1 = new GenericMonth(2016, MonthOfYear.October)
      const expectedUnitOfTime2 = new GenericMonth(2016, MonthOfYear.September)
      const expectedUnitOfTime3 = new GenericMonth(2015, MonthNumber.Twelve)
      const expectedUnitOfTime4 = new GenericMonth(2015, MonthNumber.Eight)

      // Act
      const actualUnitOfTime1 = systemUnderTest.plus(-1)
      const actualUnitOfTime2 = systemUnderTest.plus(-2)
      const actualUnitOfTime3 = systemUnderTest.plus(-11)
      const actualUnitOfTime4 = systemUnderTest.plus(-15)

      // Assert
      expect(actualUnitOfTime1.equals(expectedUnitOfTime1)).toBe(true)
      expect(actualUnitOfTime2.equals(expectedUnitOfTime2)).toBe(true)
      expect(actualUnitOfTime3.equals(expectedUnitOfTime3)).toBe(true)
      expect(actualUnitOfTime4.equals(expectedUnitOfTime4)).toBe(true)
    })
    it('should add CalendarQuarter when unitOfTime is a CalendarQuarter and parameter unitsToAdd is 0', () => {
      // Arrange
      const expectedUnitOfTime = new CalendarQuarter(2020, QuarterNumber.Q3)

      // Act
      const actualUnitOfTime = expectedUnitOfTime.plus(0)

      // Assert
      expect(actualUnitOfTime.equals(expectedUnitOfTime)).toBe(true)
    })
    // tslint:disable-next-line: max-line-length
    it('should add CalendarQuarter when unitOfTime is a CalendarQuarter and parameter unitsToAdd is positive', () => {
      // Arrange
      const systemUnderTest = new CalendarQuarter(2016, QuarterNumber.Q2)

      const expectedUnitOfTime1 = new CalendarQuarter(2016, QuarterNumber.Q3)
      const expectedUnitOfTime2 = new CalendarQuarter(2016, QuarterNumber.Q4)
      const expectedUnitOfTime3 = new CalendarQuarter(2017, QuarterNumber.Q1)
      const expectedUnitOfTime4 = new CalendarQuarter(2017, QuarterNumber.Q2)
      const expectedUnitOfTime5 = new CalendarQuarter(2017, QuarterNumber.Q3)
      const expectedUnitOfTime6 = new CalendarQuarter(2017, QuarterNumber.Q4)
      const expectedUnitOfTime7 = new CalendarQuarter(2018, QuarterNumber.Q1)
      const expectedUnitOfTime8 = new CalendarQuarter(2018, QuarterNumber.Q2)

      // Act
      const actualUnitOfTime1 = systemUnderTest.plus(1)
      const actualUnitOfTime2 = systemUnderTest.plus(2)
      const actualUnitOfTime3 = systemUnderTest.plus(3)
      const actualUnitOfTime4 = systemUnderTest.plus(4)
      const actualUnitOfTime5 = systemUnderTest.plus(5)
      const actualUnitOfTime6 = systemUnderTest.plus(6)
      const actualUnitOfTime7 = systemUnderTest.plus(7)
      const actualUnitOfTime8 = systemUnderTest.plus(8)

      // Assert
      expect(actualUnitOfTime1.equals(expectedUnitOfTime1)).toBe(true)
      expect(actualUnitOfTime2.equals(expectedUnitOfTime2)).toBe(true)
      expect(actualUnitOfTime3.equals(expectedUnitOfTime3)).toBe(true)
      expect(actualUnitOfTime4.equals(expectedUnitOfTime4)).toBe(true)
      expect(actualUnitOfTime5.equals(expectedUnitOfTime5)).toBe(true)
      expect(actualUnitOfTime6.equals(expectedUnitOfTime6)).toBe(true)
      expect(actualUnitOfTime7.equals(expectedUnitOfTime7)).toBe(true)
      expect(actualUnitOfTime8.equals(expectedUnitOfTime8)).toBe(true)
    })
    // tslint:disable-next-line: max-line-length
    it('should subtract CalendarQuarter when unitOfTime is a CalendarQuarter and parameter unitsToAdd is negative', () => {
      // Arrange
      const systemUnderTest = new CalendarQuarter(2016, QuarterNumber.Q2)

      const expectedUnitOfTime1 = new CalendarQuarter(2016, QuarterNumber.Q1)
      const expectedUnitOfTime2 = new CalendarQuarter(2015, QuarterNumber.Q4)
      const expectedUnitOfTime3 = new CalendarQuarter(2015, QuarterNumber.Q3)
      const expectedUnitOfTime4 = new CalendarQuarter(2015, QuarterNumber.Q2)
      const expectedUnitOfTime5 = new CalendarQuarter(2015, QuarterNumber.Q1)
      const expectedUnitOfTime6 = new CalendarQuarter(2014, QuarterNumber.Q4)
      const expectedUnitOfTime7 = new CalendarQuarter(2014, QuarterNumber.Q3)
      const expectedUnitOfTime8 = new CalendarQuarter(2014, QuarterNumber.Q2)

      // Act
      const actualUnitOfTime1 = systemUnderTest.plus(-1)
      const actualUnitOfTime2 = systemUnderTest.plus(-2)
      const actualUnitOfTime3 = systemUnderTest.plus(-3)
      const actualUnitOfTime4 = systemUnderTest.plus(-4)
      const actualUnitOfTime5 = systemUnderTest.plus(-5)
      const actualUnitOfTime6 = systemUnderTest.plus(-6)
      const actualUnitOfTime7 = systemUnderTest.plus(-7)
      const actualUnitOfTime8 = systemUnderTest.plus(-8)

      // Assert
      expect(actualUnitOfTime1.equals(expectedUnitOfTime1)).toBe(true)
      expect(actualUnitOfTime2.equals(expectedUnitOfTime2)).toBe(true)
      expect(actualUnitOfTime3.equals(expectedUnitOfTime3)).toBe(true)
      expect(actualUnitOfTime4.equals(expectedUnitOfTime4)).toBe(true)
      expect(actualUnitOfTime5.equals(expectedUnitOfTime5)).toBe(true)
      expect(actualUnitOfTime6.equals(expectedUnitOfTime6)).toBe(true)
      expect(actualUnitOfTime7.equals(expectedUnitOfTime7)).toBe(true)
      expect(actualUnitOfTime8.equals(expectedUnitOfTime8)).toBe(true)
    })
    it('should return same FiscalQuarter when unitOfTime is a FiscalQuarter and parameter unitsToAdd is 0', () => {
      // Arrange
      const expectedUnitOfTime = new FiscalQuarter(2020, QuarterNumber.Q3)

      // Act
      const actualUnitOfTime = expectedUnitOfTime.plus(0)

      // Assert
      expect(actualUnitOfTime.equals(expectedUnitOfTime)).toBe(true)
    })
    // tslint:disable-next-line: max-line-length
    it('should add FiscalQuarter when unitOfTime is a FiscalQuarter and parameter unitsToAdd is positive', () => {
      // Arrange
      const systemUnderTest = new FiscalQuarter(2016, QuarterNumber.Q2)

      const expectedUnitOfTime1 = new FiscalQuarter(2016, QuarterNumber.Q3)
      const expectedUnitOfTime2 = new FiscalQuarter(2016, QuarterNumber.Q4)
      const expectedUnitOfTime3 = new FiscalQuarter(2017, QuarterNumber.Q1)
      const expectedUnitOfTime4 = new FiscalQuarter(2017, QuarterNumber.Q2)
      const expectedUnitOfTime5 = new FiscalQuarter(2017, QuarterNumber.Q3)
      const expectedUnitOfTime6 = new FiscalQuarter(2017, QuarterNumber.Q4)
      const expectedUnitOfTime7 = new FiscalQuarter(2018, QuarterNumber.Q1)
      const expectedUnitOfTime8 = new FiscalQuarter(2018, QuarterNumber.Q2)

      // Act
      const actualUnitOfTime1 = systemUnderTest.plus(1)
      const actualUnitOfTime2 = systemUnderTest.plus(2)
      const actualUnitOfTime3 = systemUnderTest.plus(3)
      const actualUnitOfTime4 = systemUnderTest.plus(4)
      const actualUnitOfTime5 = systemUnderTest.plus(5)
      const actualUnitOfTime6 = systemUnderTest.plus(6)
      const actualUnitOfTime7 = systemUnderTest.plus(7)
      const actualUnitOfTime8 = systemUnderTest.plus(8)

      // Assert
      expect(actualUnitOfTime1.equals(expectedUnitOfTime1)).toBe(true)
      expect(actualUnitOfTime2.equals(expectedUnitOfTime2)).toBe(true)
      expect(actualUnitOfTime3.equals(expectedUnitOfTime3)).toBe(true)
      expect(actualUnitOfTime4.equals(expectedUnitOfTime4)).toBe(true)
      expect(actualUnitOfTime5.equals(expectedUnitOfTime5)).toBe(true)
      expect(actualUnitOfTime6.equals(expectedUnitOfTime6)).toBe(true)
      expect(actualUnitOfTime7.equals(expectedUnitOfTime7)).toBe(true)
      expect(actualUnitOfTime8.equals(expectedUnitOfTime8)).toBe(true)
    })
    it('should subtract FiscalQuarter when unitOfTime is a FiscalQuarter and parameter unitsToAdd is negative', () => {
      const systemUnderTest = new FiscalQuarter(2016, QuarterNumber.Q2)

      const expectedUnitOfTime1 = new FiscalQuarter(2016, QuarterNumber.Q1)
      const expectedUnitOfTime2 = new FiscalQuarter(2015, QuarterNumber.Q4)
      const expectedUnitOfTime3 = new FiscalQuarter(2015, QuarterNumber.Q3)
      const expectedUnitOfTime4 = new FiscalQuarter(2015, QuarterNumber.Q2)
      const expectedUnitOfTime5 = new FiscalQuarter(2015, QuarterNumber.Q1)
      const expectedUnitOfTime6 = new FiscalQuarter(2014, QuarterNumber.Q4)
      const expectedUnitOfTime7 = new FiscalQuarter(2014, QuarterNumber.Q3)
      const expectedUnitOfTime8 = new FiscalQuarter(2014, QuarterNumber.Q2)

      // Act
      const actualUnitOfTime1 = systemUnderTest.plus(-1)
      const actualUnitOfTime2 = systemUnderTest.plus(-2)
      const actualUnitOfTime3 = systemUnderTest.plus(-3)
      const actualUnitOfTime4 = systemUnderTest.plus(-4)
      const actualUnitOfTime5 = systemUnderTest.plus(-5)
      const actualUnitOfTime6 = systemUnderTest.plus(-6)
      const actualUnitOfTime7 = systemUnderTest.plus(-7)
      const actualUnitOfTime8 = systemUnderTest.plus(-8)

      // Assert
      expect(actualUnitOfTime1.equals(expectedUnitOfTime1)).toBe(true)
      expect(actualUnitOfTime2.equals(expectedUnitOfTime2)).toBe(true)
      expect(actualUnitOfTime3.equals(expectedUnitOfTime3)).toBe(true)
      expect(actualUnitOfTime4.equals(expectedUnitOfTime4)).toBe(true)
      expect(actualUnitOfTime5.equals(expectedUnitOfTime5)).toBe(true)
      expect(actualUnitOfTime6.equals(expectedUnitOfTime6)).toBe(true)
      expect(actualUnitOfTime7.equals(expectedUnitOfTime7)).toBe(true)
      expect(actualUnitOfTime8.equals(expectedUnitOfTime8)).toBe(true)
    })
    it('should return same GenericQuarter when unitOfTime is a GenericQuarter and parameter unitsToAdd is 0', () => {
      // Arrange
      const expectedUnitOfTime = new GenericQuarter(2020, QuarterNumber.Q3)

      // Act
      const actualUnitOfTime = expectedUnitOfTime.plus(0)

      // Assert
      expect(actualUnitOfTime.equals(expectedUnitOfTime)).toBe(true)
    })
    // tslint:disable-next-line: max-line-length
    it('should add GenericQuarter when unitOfTime is a GenericQuarter and parameter unitsToAdd is positive', () => {
      // Arrange
      const systemUnderTest = new GenericQuarter(2016, QuarterNumber.Q2)

      const expectedUnitOfTime1 = new GenericQuarter(2016, QuarterNumber.Q3)
      const expectedUnitOfTime2 = new GenericQuarter(2016, QuarterNumber.Q4)
      const expectedUnitOfTime3 = new GenericQuarter(2017, QuarterNumber.Q1)
      const expectedUnitOfTime4 = new GenericQuarter(2017, QuarterNumber.Q2)
      const expectedUnitOfTime5 = new GenericQuarter(2017, QuarterNumber.Q3)
      const expectedUnitOfTime6 = new GenericQuarter(2017, QuarterNumber.Q4)
      const expectedUnitOfTime7 = new GenericQuarter(2018, QuarterNumber.Q1)
      const expectedUnitOfTime8 = new GenericQuarter(2018, QuarterNumber.Q2)

      // Act
      const actualUnitOfTime1 = systemUnderTest.plus(1)
      const actualUnitOfTime2 = systemUnderTest.plus(2)
      const actualUnitOfTime3 = systemUnderTest.plus(3)
      const actualUnitOfTime4 = systemUnderTest.plus(4)
      const actualUnitOfTime5 = systemUnderTest.plus(5)
      const actualUnitOfTime6 = systemUnderTest.plus(6)
      const actualUnitOfTime7 = systemUnderTest.plus(7)
      const actualUnitOfTime8 = systemUnderTest.plus(8)

      // Assert
      expect(actualUnitOfTime1.equals(expectedUnitOfTime1)).toBe(true)
      expect(actualUnitOfTime2.equals(expectedUnitOfTime2)).toBe(true)
      expect(actualUnitOfTime3.equals(expectedUnitOfTime3)).toBe(true)
      expect(actualUnitOfTime4.equals(expectedUnitOfTime4)).toBe(true)
      expect(actualUnitOfTime5.equals(expectedUnitOfTime5)).toBe(true)
      expect(actualUnitOfTime6.equals(expectedUnitOfTime6)).toBe(true)
      expect(actualUnitOfTime7.equals(expectedUnitOfTime7)).toBe(true)
      expect(actualUnitOfTime8.equals(expectedUnitOfTime8)).toBe(true)
    })
    // tslint:disable-next-line: max-line-length
    it('should subtract GenericQuarter when unitOfTime is a GenericQuarter and parameter unitsToAdd is negative', () => {
      // Arrange
      const systemUnderTest = new GenericQuarter(2016, QuarterNumber.Q2)

      const expectedUnitOfTime1 = new GenericQuarter(2016, QuarterNumber.Q1)
      const expectedUnitOfTime2 = new GenericQuarter(2015, QuarterNumber.Q4)
      const expectedUnitOfTime3 = new GenericQuarter(2015, QuarterNumber.Q3)
      const expectedUnitOfTime4 = new GenericQuarter(2015, QuarterNumber.Q2)
      const expectedUnitOfTime5 = new GenericQuarter(2015, QuarterNumber.Q1)
      const expectedUnitOfTime6 = new GenericQuarter(2014, QuarterNumber.Q4)
      const expectedUnitOfTime7 = new GenericQuarter(2014, QuarterNumber.Q3)
      const expectedUnitOfTime8 = new GenericQuarter(2014, QuarterNumber.Q2)

      // Act
      const actualUnitOfTime1 = systemUnderTest.plus(-1)
      const actualUnitOfTime2 = systemUnderTest.plus(-2)
      const actualUnitOfTime3 = systemUnderTest.plus(-3)
      const actualUnitOfTime4 = systemUnderTest.plus(-4)
      const actualUnitOfTime5 = systemUnderTest.plus(-5)
      const actualUnitOfTime6 = systemUnderTest.plus(-6)
      const actualUnitOfTime7 = systemUnderTest.plus(-7)
      const actualUnitOfTime8 = systemUnderTest.plus(-8)

      // Assert
      expect(actualUnitOfTime1.equals(expectedUnitOfTime1)).toBe(true)
      expect(actualUnitOfTime2.equals(expectedUnitOfTime2)).toBe(true)
      expect(actualUnitOfTime3.equals(expectedUnitOfTime3)).toBe(true)
      expect(actualUnitOfTime4.equals(expectedUnitOfTime4)).toBe(true)
      expect(actualUnitOfTime5.equals(expectedUnitOfTime5)).toBe(true)
      expect(actualUnitOfTime6.equals(expectedUnitOfTime6)).toBe(true)
      expect(actualUnitOfTime7.equals(expectedUnitOfTime7)).toBe(true)
      expect(actualUnitOfTime8.equals(expectedUnitOfTime8)).toBe(true)
    })
    it('should return same CalendarYear when unitOfTime is a CalendarYear and parameter unitsToAdd is 0', () => {
      // Arrange
      const expectedUnitOfTime = new CalendarYear(2020)

      // Act
      const actualUnitOfTime = expectedUnitOfTime.plus(0)

      // Assert
      expect(actualUnitOfTime.equals(expectedUnitOfTime)).toBe(true)
    })
    // tslint:disable-next-line: max-line-length
    it('should add CalendarYear when unitOfTime is a CalendarYear and parameter unitsToAdd is positive', () => {
      // Arrange
      const systemUnderTest = new CalendarYear(2016)

      const expectedUnitOfTime1 = new CalendarYear(2017)
      const expectedUnitOfTime2 = new CalendarYear(2018)
      const expectedUnitOfTime3 = new CalendarYear(2019)

      // Act
      const actualUnitOfTime1 = systemUnderTest.plus(1)
      const actualUnitOfTime2 = systemUnderTest.plus(2)
      const actualUnitOfTime3 = systemUnderTest.plus(3)

      // Assert
      expect(actualUnitOfTime1.equals(expectedUnitOfTime1)).toBe(true)
      expect(actualUnitOfTime2.equals(expectedUnitOfTime2)).toBe(true)
      expect(actualUnitOfTime3.equals(expectedUnitOfTime3)).toBe(true)
    })
    // tslint:disable-next-line: max-line-length
    it('should subtract CalendarYear when unitOfTime is a CalendarYear and parameter unitsToAdd is negative', () => {
      // Arrange
      const systemUnderTest = new CalendarYear(2016)

      const expectedUnitOfTime1 = new CalendarYear(2015)
      const expectedUnitOfTime2 = new CalendarYear(2014)
      const expectedUnitOfTime3 = new CalendarYear(2013)

      // Act
      const actualUnitOfTime1 = systemUnderTest.plus(-1)
      const actualUnitOfTime2 = systemUnderTest.plus(-2)
      const actualUnitOfTime3 = systemUnderTest.plus(-3)

      // Assert
      expect(actualUnitOfTime1.equals(expectedUnitOfTime1)).toBe(true)
      expect(actualUnitOfTime2.equals(expectedUnitOfTime2)).toBe(true)
      expect(actualUnitOfTime3.equals(expectedUnitOfTime3)).toBe(true)
    })
    it('should return same FiscalYear when unitOfTime is a FiscalYear and parameter unitsToAdd is 0', () => {
      // Arrange
      const expectedUnitOfTime = new FiscalYear(2020)

      // Act
      const actualUnitOfTime = expectedUnitOfTime.plus(0)

      // Assert
      expect(actualUnitOfTime.equals(expectedUnitOfTime)).toBe(true)
    })
    // tslint:disable-next-line: max-line-length
    it('should add FiscalYear when unitOfTime is a FiscalYear and parameter unitsToAdd is positive', () => {
      // Arrange
      const systemUnderTest = new FiscalYear(2016)

      const expectedUnitOfTime1 = new FiscalYear(2017)
      const expectedUnitOfTime2 = new FiscalYear(2018)
      const expectedUnitOfTime3 = new FiscalYear(2019)

      // Act
      const actualUnitOfTime1 = systemUnderTest.plus(1)
      const actualUnitOfTime2 = systemUnderTest.plus(2)
      const actualUnitOfTime3 = systemUnderTest.plus(3)

      // Assert
      expect(actualUnitOfTime1.equals(expectedUnitOfTime1)).toBe(true)
      expect(actualUnitOfTime2.equals(expectedUnitOfTime2)).toBe(true)
      expect(actualUnitOfTime3.equals(expectedUnitOfTime3)).toBe(true)
    })
    // tslint:disable-next-line: max-line-length
    it('should subtract FiscalYear when unitOfTime is a FiscalYear and parameter unitsToAdd is negative', () => {
      // Arrange
      const systemUnderTest = new FiscalYear(2016)

      const expectedUnitOfTime1 = new FiscalYear(2015)
      const expectedUnitOfTime2 = new FiscalYear(2014)
      const expectedUnitOfTime3 = new FiscalYear(2013)

      // Act
      const actualUnitOfTime1 = systemUnderTest.plus(-1)
      const actualUnitOfTime2 = systemUnderTest.plus(-2)
      const actualUnitOfTime3 = systemUnderTest.plus(-3)

      // Assert
      expect(actualUnitOfTime1.equals(expectedUnitOfTime1)).toBe(true)
      expect(actualUnitOfTime2.equals(expectedUnitOfTime2)).toBe(true)
      expect(actualUnitOfTime3.equals(expectedUnitOfTime3)).toBe(true)
    })
    it('should return same GenericYear when unitOfTime is a GenericYear and parameter unitsToAdd is 0', () => {
      // Arrange
      const expectedUnitOfTime = new GenericYear(2020)

      // Act
      const actualUnitOfTime = expectedUnitOfTime.plus(0)

      // Assert
      expect(actualUnitOfTime.equals(expectedUnitOfTime)).toBe(true)
    })
    // tslint:disable-next-line: max-line-length
    it('should add GenericYear when unitOfTime is a GenericYear and parameter unitsToAdd is positive', () => {
      // Arrange
      const systemUnderTest = new GenericYear(2016)

      const expectedUnitOfTime1 = new GenericYear(2017)
      const expectedUnitOfTime2 = new GenericYear(2018)
      const expectedUnitOfTime3 = new GenericYear(2019)

      // Act
      const actualUnitOfTime1 = systemUnderTest.plus(1)
      const actualUnitOfTime2 = systemUnderTest.plus(2)
      const actualUnitOfTime3 = systemUnderTest.plus(3)

      // Assert
      expect(actualUnitOfTime1.equals(expectedUnitOfTime1)).toBe(true)
      expect(actualUnitOfTime2.equals(expectedUnitOfTime2)).toBe(true)
      expect(actualUnitOfTime3.equals(expectedUnitOfTime3)).toBe(true)
    })
    // tslint:disable-next-line: max-line-length
    it('should subtract GenericYear when unitOfTime is a GenericYear and parameter unitsToAdd is negative', () => {
      // Arrange
      const systemUnderTest = new GenericYear(2016)

      const expectedUnitOfTime1 = new GenericYear(2015)
      const expectedUnitOfTime2 = new GenericYear(2014)
      const expectedUnitOfTime3 = new GenericYear(2013)

      // Act
      const actualUnitOfTime1 = systemUnderTest.plus(-1)
      const actualUnitOfTime2 = systemUnderTest.plus(-2)
      const actualUnitOfTime3 = systemUnderTest.plus(-3)

      // Assert
      expect(actualUnitOfTime1.equals(expectedUnitOfTime1)).toBe(true)
      expect(actualUnitOfTime2.equals(expectedUnitOfTime2)).toBe(true)
      expect(actualUnitOfTime3.equals(expectedUnitOfTime3)).toBe(true)
    })
    it('should throw Error when parameter granularityOfUnitsToAdd is more granular than unitOfTime', () => {
      // Arrange
      const tests = [
        { unitOfTime: new CalendarMonth(2019, MonthOfYear.July), granularityOfUnitsToAdd: [UnitOfTimeGranularity.Day] },
        {
          unitOfTime: new CalendarQuarter(2013, QuarterNumber.Q3),
          granularityOfUnitsToAdd: [UnitOfTimeGranularity.Day, UnitOfTimeGranularity.Month],
        },
        {
          unitOfTime: new CalendarYear(2015),
          granularityOfUnitsToAdd: [
            UnitOfTimeGranularity.Day,
            UnitOfTimeGranularity.Month,
            UnitOfTimeGranularity.Quarter,
          ],
        },
        { unitOfTime: new FiscalMonth(2019, MonthOfYear.July), granularityOfUnitsToAdd: [UnitOfTimeGranularity.Day] },
        {
          unitOfTime: new FiscalQuarter(2013, QuarterNumber.Q3),
          granularityOfUnitsToAdd: [UnitOfTimeGranularity.Day, UnitOfTimeGranularity.Month],
        },
        {
          unitOfTime: new FiscalYear(2015),
          granularityOfUnitsToAdd: [
            UnitOfTimeGranularity.Day,
            UnitOfTimeGranularity.Month,
            UnitOfTimeGranularity.Quarter,
          ],
        },
        { unitOfTime: new GenericMonth(2019, MonthOfYear.July), granularityOfUnitsToAdd: [UnitOfTimeGranularity.Day] },
        {
          unitOfTime: new GenericQuarter(2013, QuarterNumber.Q3),
          granularityOfUnitsToAdd: [UnitOfTimeGranularity.Day, UnitOfTimeGranularity.Month],
        },
        {
          unitOfTime: new GenericYear(2015),
          granularityOfUnitsToAdd: [
            UnitOfTimeGranularity.Day,
            UnitOfTimeGranularity.Month,
            UnitOfTimeGranularity.Quarter,
          ],
        },
      ]

      // Act
      for (const test of tests) {
        for (const granularityOfUnitsToAdd of test.granularityOfUnitsToAdd) {
          expect(() => test.unitOfTime.plus(getRandomInt(), granularityOfUnitsToAdd)).toThrow()
        }
      }
    })
    it('should return same unitOfTime when parameter unitsToAdd is 0', () => {
      // Arrange
      const tests = [
        {
          unitOfTime: new CalendarMonth(2019, MonthOfYear.July),
          granularityOfUnitsToAdd: [
            UnitOfTimeGranularity.Month,
            UnitOfTimeGranularity.Quarter,
            UnitOfTimeGranularity.Year,
          ],
        },
        {
          unitOfTime: new CalendarQuarter(2013, QuarterNumber.Q3),
          granularityOfUnitsToAdd: [UnitOfTimeGranularity.Quarter, UnitOfTimeGranularity.Year],
        },
        {
          unitOfTime: new CalendarYear(2015),
          granularityOfUnitsToAdd: [UnitOfTimeGranularity.Year],
        },
        {
          unitOfTime: new FiscalMonth(2019, MonthOfYear.July),
          granularityOfUnitsToAdd: [
            UnitOfTimeGranularity.Month,
            UnitOfTimeGranularity.Quarter,
            UnitOfTimeGranularity.Year,
          ],
        },
        {
          unitOfTime: new FiscalQuarter(2013, QuarterNumber.Q3),
          granularityOfUnitsToAdd: [UnitOfTimeGranularity.Quarter, UnitOfTimeGranularity.Year],
        },
        {
          unitOfTime: new FiscalYear(2015),
          granularityOfUnitsToAdd: [UnitOfTimeGranularity.Year],
        },
        {
          unitOfTime: new GenericMonth(2019, MonthOfYear.July),
          granularityOfUnitsToAdd: [
            UnitOfTimeGranularity.Month,
            UnitOfTimeGranularity.Quarter,
            UnitOfTimeGranularity.Year,
          ],
        },
        {
          unitOfTime: new GenericQuarter(2013, QuarterNumber.Q3),
          granularityOfUnitsToAdd: [UnitOfTimeGranularity.Quarter, UnitOfTimeGranularity.Year],
        },
        {
          unitOfTime: new GenericYear(2015),
          granularityOfUnitsToAdd: [UnitOfTimeGranularity.Year],
        },
      ]

      // Act
      for (const test of tests) {
        for (const granularityOfUnitsToAdd of test.granularityOfUnitsToAdd) {
          expect(test.unitOfTime.plus(0, granularityOfUnitsToAdd).equals(test.unitOfTime)).toBe(true)
        }
      }
    })
    it('should adjust unitOfTime when granularityOfUnitsToAdd is less granular than granularity of unitOfTime', () => {
      // Arrange
      const tests = [
        {
          unitOfTime: new CalendarMonth(2016, MonthOfYear.February),
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Quarter,
          unitsToAdd: 1,
          expected: new CalendarMonth(2016, MonthOfYear.May),
        },
        {
          unitOfTime: new CalendarMonth(2016, MonthOfYear.December),
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Quarter,
          unitsToAdd: 2,
          expected: new CalendarMonth(2017, MonthOfYear.June),
        },
        {
          unitOfTime: new CalendarMonth(2016, MonthOfYear.January),
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Quarter,
          unitsToAdd: -1,
          expected: new CalendarMonth(2015, MonthOfYear.October),
        },
        {
          unitOfTime: new CalendarMonth(2016, MonthOfYear.December),
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Quarter,
          unitsToAdd: -2,
          expected: new CalendarMonth(2016, MonthOfYear.June),
        },
        {
          unitOfTime: new CalendarMonth(2016, MonthOfYear.September),
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Year,
          unitsToAdd: 1,
          expected: new CalendarMonth(2017, MonthOfYear.September),
        },
        {
          unitOfTime: new CalendarMonth(2016, MonthOfYear.September),
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Year,
          unitsToAdd: 2,
          expected: new CalendarMonth(2018, MonthOfYear.September),
        },
        {
          unitOfTime: new CalendarMonth(2016, MonthOfYear.September),
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Year,
          unitsToAdd: -1,
          expected: new CalendarMonth(2015, MonthOfYear.September),
        },
        {
          unitOfTime: new CalendarMonth(2016, MonthOfYear.September),
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Year,
          unitsToAdd: -2,
          expected: new CalendarMonth(2014, MonthOfYear.September),
        },
        {
          unitOfTime: new FiscalMonth(2016, MonthNumber.Five),
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Quarter,
          unitsToAdd: 1,
          expected: new FiscalMonth(2016, MonthNumber.Eight),
        },
        {
          unitOfTime: new FiscalMonth(2016, MonthNumber.Eleven),
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Quarter,
          unitsToAdd: 2,
          expected: new FiscalMonth(2017, MonthNumber.Five),
        },
        {
          unitOfTime: new FiscalMonth(2016, MonthNumber.Five),
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Quarter,
          unitsToAdd: -1,
          expected: new FiscalMonth(2016, MonthNumber.Two),
        },
        {
          unitOfTime: new FiscalMonth(2016, MonthNumber.Eleven),
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Quarter,
          unitsToAdd: -2,
          expected: new FiscalMonth(2016, MonthNumber.Five),
        },
        {
          unitOfTime: new FiscalMonth(2016, MonthNumber.Five),
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Year,
          unitsToAdd: 1,
          expected: new FiscalMonth(2017, MonthNumber.Five),
        },
        {
          unitOfTime: new FiscalMonth(2016, MonthNumber.Eleven),
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Year,
          unitsToAdd: 2,
          expected: new FiscalMonth(2018, MonthNumber.Eleven),
        },
        {
          unitOfTime: new FiscalMonth(2016, MonthNumber.Five),
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Year,
          unitsToAdd: -1,
          expected: new FiscalMonth(2015, MonthNumber.Five),
        },
        {
          unitOfTime: new FiscalMonth(2016, MonthNumber.Eleven),
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Year,
          unitsToAdd: -2,
          expected: new FiscalMonth(2014, MonthNumber.Eleven),
        },
        {
          unitOfTime: new GenericMonth(2016, MonthNumber.Five),
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Quarter,
          unitsToAdd: 1,
          expected: new GenericMonth(2016, MonthNumber.Eight),
        },
        {
          unitOfTime: new GenericMonth(2016, MonthNumber.Eleven),
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Quarter,
          unitsToAdd: 2,
          expected: new GenericMonth(2017, MonthNumber.Five),
        },
        {
          unitOfTime: new GenericMonth(2016, MonthNumber.Five),
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Quarter,
          unitsToAdd: -1,
          expected: new GenericMonth(2016, MonthNumber.Two),
        },
        {
          unitOfTime: new GenericMonth(2016, MonthNumber.Eleven),
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Quarter,
          unitsToAdd: -2,
          expected: new GenericMonth(2016, MonthNumber.Five),
        },
        {
          unitOfTime: new GenericMonth(2016, MonthNumber.Five),
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Year,
          unitsToAdd: 1,
          expected: new GenericMonth(2017, MonthNumber.Five),
        },
        {
          unitOfTime: new GenericMonth(2016, MonthNumber.Eleven),
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Year,
          unitsToAdd: 2,
          expected: new GenericMonth(2018, MonthNumber.Eleven),
        },
        {
          unitOfTime: new GenericMonth(2016, MonthNumber.Five),
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Year,
          unitsToAdd: -1,
          expected: new GenericMonth(2015, MonthNumber.Five),
        },
        {
          unitOfTime: new GenericMonth(2016, MonthNumber.Eleven),
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Year,
          unitsToAdd: -2,
          expected: new GenericMonth(2014, MonthNumber.Eleven),
        },
        {
          unitOfTime: new CalendarQuarter(2016, QuarterNumber.Q3),
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Year,
          unitsToAdd: 1,
          expected: new CalendarQuarter(2017, QuarterNumber.Q3),
        },
        {
          unitOfTime: new CalendarQuarter(2016, QuarterNumber.Q3),
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Year,
          unitsToAdd: 2,
          expected: new CalendarQuarter(2018, QuarterNumber.Q3),
        },
        {
          unitOfTime: new CalendarQuarter(2016, QuarterNumber.Q2),
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Year,
          unitsToAdd: -1,
          expected: new CalendarQuarter(2015, QuarterNumber.Q2),
        },
        {
          unitOfTime: new CalendarQuarter(2016, QuarterNumber.Q1),
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Year,
          unitsToAdd: -2,
          expected: new CalendarQuarter(2014, QuarterNumber.Q1),
        },
        {
          unitOfTime: new FiscalQuarter(2016, QuarterNumber.Q3),
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Year,
          unitsToAdd: 1,
          expected: new FiscalQuarter(2017, QuarterNumber.Q3),
        },
        {
          unitOfTime: new FiscalQuarter(2016, QuarterNumber.Q3),
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Year,
          unitsToAdd: 2,
          expected: new FiscalQuarter(2018, QuarterNumber.Q3),
        },
        {
          unitOfTime: new FiscalQuarter(2016, QuarterNumber.Q2),
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Year,
          unitsToAdd: -1,
          expected: new FiscalQuarter(2015, QuarterNumber.Q2),
        },
        {
          unitOfTime: new FiscalQuarter(2016, QuarterNumber.Q1),
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Year,
          unitsToAdd: -2,
          expected: new FiscalQuarter(2014, QuarterNumber.Q1),
        },
        {
          unitOfTime: new GenericQuarter(2016, QuarterNumber.Q3),
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Year,
          unitsToAdd: 1,
          expected: new GenericQuarter(2017, QuarterNumber.Q3),
        },
        {
          unitOfTime: new GenericQuarter(2016, QuarterNumber.Q3),
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Year,
          unitsToAdd: 2,
          expected: new GenericQuarter(2018, QuarterNumber.Q3),
        },
        {
          unitOfTime: new GenericQuarter(2016, QuarterNumber.Q2),
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Year,
          unitsToAdd: -1,
          expected: new GenericQuarter(2015, QuarterNumber.Q2),
        },
        {
          unitOfTime: new GenericQuarter(2016, QuarterNumber.Q1),
          granularityOfUnitsToAdd: UnitOfTimeGranularity.Year,
          unitsToAdd: -2,
          expected: new GenericQuarter(2014, QuarterNumber.Q1),
        },
      ]

      // Act, Assert
      for (const test of tests) {
        const actual = test.unitOfTime.plus(test.unitsToAdd, test.granularityOfUnitsToAdd)
        expect(actual.equals(test.expected)).toBe(true)
      }
    })
  })
})

const getRandomInt = () => {
  const min = Math.ceil(1)
  const max = Math.floor(999)
  const int = Math.floor(Math.random() * (max - min)) + min
  return int * positiveOrNegative()
}

const positiveOrNegative = () => {
  return Math.random() < 0.5 ? -1 : 1
}
