import expect from 'expect'

import { CalendarDay } from '../src/CalendarDay'
import { CalendarMonth } from '../src/CalendarMonth'
import { CalendarQuarter } from '../src/CalendarQuarter'
import { CalendarYear } from '../src/CalendarYear'
import { DayOfMonth } from '../src/DayOfMonth'
import { MonthNumber } from '../src/MonthNumber'
import { MonthOfYear } from '../src/MonthOfYear'
import { QuarterNumber } from '../src/QuarterNumber'

import '../src/extensions/CalendarUnitOfTimeExtensions'

describe('CalendarUnitOfTimeExtensions --', () => {
  describe('getFirstCalendarDay --', () => {
    // it('should throw RangeError when parameter unitOfTime is undefined', () => {
    //   // Arrange
    //   const unitOfTime = new FiscalYear(2000) as unknown as CalendarYear

    //   // Act
    //   const getFirstCalendarDay = () => unitOfTime!.getFirstCalendarDay()

    //   // Assert
    //   expect(getFirstCalendarDay).toThrow(/his type of unit-of-time is not supported/)
    // })
    it('should return same unitOfTime when parameter unitOfTime is of type CalendarDay', () => {
      // Arrange
      const unitOfTime = new CalendarMonth(2000, MonthNumber.One)

      // Act
      const expected = unitOfTime.getFirstCalendarDay()

      // Assert
      expect(expected).toMatchObject(unitOfTime)
    })
    it('should return first day of month when parameter unitOfTime is of type CalendarMonth', () => {
      // Arrange
      const month       = new CalendarMonth(2000, MonthNumber.Two)
      const expectedDay = new CalendarDay(month.year, month.monthNumber, DayOfMonth.One)

      // Act
      const actualDay = month.getFirstCalendarDay()

      // Assert
      expect(actualDay).toEqual(expectedDay)
    })
    it('should return first day of quarter when parameter unitOfTime is of type CalendarQuarter', () => {
      // Arrange
      const quarter1 = new CalendarQuarter(2016, QuarterNumber.Q1)
      const quarter2 = new CalendarQuarter(2016, QuarterNumber.Q2)
      const quarter3 = new CalendarQuarter(2016, QuarterNumber.Q3)
      const quarter4 = new CalendarQuarter(2016, QuarterNumber.Q4)

      const expectedDay1 = new CalendarDay(2016, MonthOfYear.January, DayOfMonth.One)
      const expectedDay2 = new CalendarDay(2016, MonthOfYear.April, DayOfMonth.One)
      const expectedDay3 = new CalendarDay(2016, MonthOfYear.July, DayOfMonth.One)
      const expectedDay4 = new CalendarDay(2016, MonthOfYear.October, DayOfMonth.One)

      // Act
      const actualDay1 = quarter1.getFirstCalendarDay()
      const actualDay2 = quarter2.getFirstCalendarDay()
      const actualDay3 = quarter3.getFirstCalendarDay()
      const actualDay4 = quarter4.getFirstCalendarDay()

      // Assert
      expect(actualDay1).toEqual(expectedDay1)
      expect(actualDay2).toEqual(expectedDay2)
      expect(actualDay3).toEqual(expectedDay3)
      expect(actualDay4).toEqual(expectedDay4)
    })
    it('should return first day of year when parameter unitOfTime is of type CalendarYear', () => {
      // Arrange
      const year1 = new CalendarYear(2016)
      const year2 = new CalendarYear(2017)

      const expectedDay1 = new CalendarDay(2016, MonthOfYear.January, DayOfMonth.One)
      const expectedDay2 = new CalendarDay(2017, MonthOfYear.January, DayOfMonth.One)

      // Act
      const actualDay1 = year1.getFirstCalendarDay()
      const actualDay2 = year2.getFirstCalendarDay()

      // Assert
      expect(actualDay1).toEqual(expectedDay1)
      expect(actualDay2).toEqual(expectedDay2)
    })
  })
  describe('getLastCalendarDay --', () => {
    // it('should throw RangeError when parameter unitOfTime is undefined', () => {
    //   // Arrange
    //   const unitOfTime = new FiscalYear(2000) as unknown as CalendarYear

    //   // Act
    //   const getFirstCalendarDay = () => unitOfTime!.getLastCalendarDay()

    //   // Assert
    //   expect(getFirstCalendarDay).toThrow(/his type of unit-of-time is not supported/)
    // })
    it('should return same unitOfTime when parameter unitOfTime is of type CalendarDay', () => {
      // Arrange
      const unitOfTime = new CalendarMonth(2000, MonthNumber.One)

      // Act
      const expected = unitOfTime.getLastCalendarDay()

      // Assert
      expect(expected).toMatchObject(unitOfTime)
    })
    it('should return last day of month when parameter unitOfTime is of type CalendarMonth', () => {
      // Arrange
      const month       = new CalendarMonth(2000, MonthNumber.Four)
      const expectedDay = new CalendarDay(month.year, month.monthNumber, DayOfMonth.Thirty)

      // Act
      const actualDay = month.getLastCalendarDay()

      // Assert
      expect(actualDay).toEqual(expectedDay)
    })
    it('should return last day of quarter when parameter unitOfTime is of type CalendarQuarter', () => {
      // Arrange
      const quarter1 = new CalendarQuarter(2016, QuarterNumber.Q1)
      const quarter2 = new CalendarQuarter(2016, QuarterNumber.Q2)
      const quarter3 = new CalendarQuarter(2016, QuarterNumber.Q3)
      const quarter4 = new CalendarQuarter(2016, QuarterNumber.Q4)

      const expectedDay1 = new CalendarDay(2016, MonthOfYear.March, DayOfMonth.ThirtyOne)
      const expectedDay2 = new CalendarDay(2016, MonthOfYear.June, DayOfMonth.Thirty)
      const expectedDay3 = new CalendarDay(2016, MonthOfYear.September, DayOfMonth.Thirty)
      const expectedDay4 = new CalendarDay(2016, MonthOfYear.December, DayOfMonth.ThirtyOne)

      // Act
      const actualDay1 = quarter1.getLastCalendarDay()
      const actualDay2 = quarter2.getLastCalendarDay()
      const actualDay3 = quarter3.getLastCalendarDay()
      const actualDay4 = quarter4.getLastCalendarDay()

      // Assert
      expect(actualDay1).toEqual(expectedDay1)
      expect(actualDay2).toEqual(expectedDay2)
      expect(actualDay3).toEqual(expectedDay3)
      expect(actualDay4).toEqual(expectedDay4)
    })
    it('should return last day of year when parameter unitOfTime is of type CalendarYear', () => {
      // Arrange
      const year1 = new CalendarYear(2016)
      const year2 = new CalendarYear(2017)

      const expectedDay1 = new CalendarDay(2016, MonthOfYear.December, DayOfMonth.ThirtyOne)
      const expectedDay2 = new CalendarDay(2017, MonthOfYear.December, DayOfMonth.ThirtyOne)

      // Act
      const actualDay1 = year1.getLastCalendarDay()
      const actualDay2 = year2.getLastCalendarDay()

      // Assert
      expect(actualDay1).toEqual(expectedDay1)
      expect(actualDay2).toEqual(expectedDay2)
    })
  })
})
