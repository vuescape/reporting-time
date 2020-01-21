import expect from 'expect'

import { CalendarMonth } from '../src/CalendarMonth'
import { CalendarYear } from '../src/CalendarYear'
import { MonthNumber } from '../src/MonthNumber'
import { UnitOfTimeGranularity } from '../src/UnitOfTimeGranularity'
import { UnitOfTimeKind } from '../src/UnitOfTimeKind'

describe('CalendarMonth --', () => {
  describe('equals --', () => {
    it('should return true when testing the same instance', () => {
      // Arrange
      const calendarMonth = new CalendarMonth(2000, MonthNumber.Eight)

      // Act
      const result = calendarMonth.equals(calendarMonth)

      // Assert
      expect(result).toBe(true)
    })

    it('should return true when different instances have the same year', () => {
      // Arrange
      const calendarMonth1 = new CalendarMonth(2000, MonthNumber.Eleven)
      const calendarMonth2 = new CalendarMonth(2000, MonthNumber.Eleven)

      // Act
      const result = calendarMonth1.equals(calendarMonth2)

      // Assert
      expect(result).toBe(true)
    })

    it('should return false when years are different', () => {
      // Arrange
      const calendarMonth1 = new CalendarMonth(2020, MonthNumber.Five)
      const calendarMonth2 = new CalendarMonth(2000, MonthNumber.Five)

      // Act
      const result = calendarMonth1.equals(calendarMonth2)

      // Assert
      expect(result).toBe(false)
    })

    it('should return false when MonthNumbers are different and years are the same', () => {
      // Arrange
      const calendarMonth1 = new CalendarMonth(2020, MonthNumber.Nine)
      const calendarMonth2 = new CalendarMonth(2020, MonthNumber.Four)

      // Act
      const result = calendarMonth1.equals(calendarMonth2)

      // Assert
      expect(result).toBe(false)
    })

    it('should return false when CalendarMonth is undefined', () => {
      // Arrange
      const calendarMonth1 = new CalendarMonth(2020, MonthNumber.Seven)
      const calendarMonth2 = (undefined as any) as CalendarMonth

      // Act
      const result = calendarMonth1.equals(calendarMonth2)

      // Assert
      expect(result).toBe(false)
    })

    it('should return false when CalendarMonth is null', () => {
      // Arrange
      const calendarMonth1 = new CalendarMonth(2020, MonthNumber.Six)
      const calendarMonth2 = (null as any) as CalendarMonth

      // Act
      const result = calendarMonth1.equals(calendarMonth2)

      // Assert
      expect(result).toBe(false)
    })

    it('should return false when type to test is not a CalendarMonth', () => {
      // Arrange
      const calendarMonth1 = new CalendarMonth(2020, MonthNumber.Ten)
      const calendarMonth2 = new CalendarYear(2020) as any

      // Act
      const result = calendarMonth1.equals(calendarMonth2)

      // Assert
      expect(result).toBe(false)
    })
  })

  describe('greater than operator --', () => {
    it('should return true when left side is greater than right side and they differ by only MonthNumber', () => {
      // Arrange
      const calendarMonth1 = new CalendarMonth(2000, MonthNumber.Twelve)
      const calendarMonth2 = new CalendarMonth(2000, MonthNumber.Three)

      // Act
      const result = calendarMonth1 > calendarMonth2

      // Assert
      expect(result).toBe(true)
    })

    it('should return true when left side is greater than right side and they differ by only Year', () => {
      // Arrange
      const calendarMonth1 = new CalendarMonth(2001, MonthNumber.Two)
      const calendarMonth2 = new CalendarMonth(2000, MonthNumber.Two)

      // Act
      const result = calendarMonth1 > calendarMonth2

      // Assert
      expect(result).toBe(true)
    })

    it('should return false when left side is less than right side', () => {
      // Arrange
      const calendarMonth1 = new CalendarMonth(2000, MonthNumber.Eight)
      const calendarMonth2 = new CalendarMonth(2020, MonthNumber.Eight)

      // Act
      const result = calendarMonth1 > calendarMonth2

      // Assert
      expect(result).toBe(false)
    })

    it('should return false when left side is equal to right side', () => {
      // Arrange
      const calendarMonth1 = new CalendarMonth(2000, MonthNumber.Eight)
      const calendarMonth2 = new CalendarMonth(2000, MonthNumber.Eight)

      // Act
      const result = calendarMonth1 > calendarMonth2

      // Assert
      expect(result).toBe(false)
    })
  })
  describe('less than operator --', () => {
    it('should return false when left side is greater than right side', () => {
      // Arrange
      const calendarMonth1 = new CalendarMonth(2000, MonthNumber.Eleven)
      const calendarMonth2 = new CalendarMonth(1999, MonthNumber.Five)

      // Act
      const result = calendarMonth1 < calendarMonth2

      // Assert
      expect(result).toBe(false)
    })

    it('should return true when left side is less than right side', () => {
      // Arrange
      const calendarMonth1 = new CalendarMonth(2000, MonthNumber.Four)
      const calendarMonth2 = new CalendarMonth(2020, MonthNumber.Nine)

      // Act
      const result = calendarMonth1 < calendarMonth2

      // Assert
      expect(result).toBe(true)
    })

    it('should return false when left side is equal to right side', () => {
      // Arrange
      const calendarMonth1 = new CalendarMonth(2000, MonthNumber.One)
      const calendarMonth2 = new CalendarMonth(2000, MonthNumber.One)

      // Act
      const result = calendarMonth1 < calendarMonth2

      // Assert
      expect(result).toBe(false)
    })
  })
  describe('constructor --', () => {
    it('should return same value passed to constructor when getting', () => {
      // Arrange
      const validYear = 2000
      const validMonth = MonthNumber.Seven
      const calendarMonth = new CalendarMonth(validYear, validMonth)

      // Act
      const year = calendarMonth.year
      const month = calendarMonth.monthNumber

      // Assert
      expect(year).toBe(validYear)
      expect(month).toBe(validMonth)
    })

    it('should return UnitOfTimeGranularity with value of Month when getting', () => {
      // Arrange
      const year = 2000
      const month = MonthNumber.Six
      const calendarMonth = new CalendarMonth(year, month)

      // Act
      const unitOfTimeGranularity = calendarMonth.unitOfTimeGranularity

      // Assert
      expect(unitOfTimeGranularity).toBe(UnitOfTimeGranularity.Month)
    })

    it('should return UnitOfTimeKind with value of Calendar when getting', () => {
      // Arrange
      const year = 2000
      const month = MonthNumber.Ten
      const calendarMonth = new CalendarMonth(year, month)

      // Act
      const unitOfTimeKind = calendarMonth.unitOfTimeKind

      // Assert
      expect(unitOfTimeKind).toBe(UnitOfTimeKind.Calendar)
    })

    it('should throw error when parameter year is undefined', () => {
      // Arrange
      const year = undefined as any
      const month = MonthNumber.Three

      // Act
      const constructor = () => new CalendarMonth(year, month)

      // Assert
      expect(constructor).toThrow(/must be a positive integer/)
    })

    it('should throw error when parameter year is NaN', () => {
      // Arrange
      const year = NaN
      const month = MonthNumber.Twelve

      // Act
      const constructor = () => new CalendarMonth(year, month)

      // Assert
      expect(constructor).toThrow(/must be a positive integer/)
    })

    it('should throw error when parameter year is less than 1', () => {
      // Arrange
      const year = 0
      const month = MonthNumber.Two

      // Act
      const constructor = () => new CalendarMonth(year, month)

      // Assert
      expect(constructor).toThrow(/must be a positive integer/)
    })

    it('should throw error when parameter year is greater than 9999', () => {
      // Arrange
      const year = 10000
      const month = MonthNumber.Two

      // Act
      const constructor = () => new CalendarMonth(year, month)

      // Assert
      expect(constructor).toThrow(/must be a positive integer/)
    })

    it('should throw error when parameter monthNumber is undefined', () => {
      // Arrange
      const year = 2000
      const monthNumber = undefined as any

      // Act
      const constructor = () => new CalendarMonth(year, monthNumber)

      // Assert
      expect(constructor).toThrow(/must be a valid MonthNumber/)
    })

    it('should throw error when parameter monthNumber is out of range', () => {
      // Arrange
      const year = 2000
      const month = 22 as MonthNumber

      // Act
      const constructor = () => new CalendarMonth(year, month)

      // Assert
      expect(constructor).toThrow(/must be a valid MonthNumber/)
    })
  })
  describe('toString --', () => {
    it('should return friendly string representation when called', () => {
      // Arrange
      const year = 2000
      const month = MonthNumber.One
      const calendarMonth = new CalendarMonth(year, month)

      // Act
      const result = calendarMonth.toString()

      // Assert
      expect(result).toBe(`${month}st month of CY${year}`)
    })

    it('should return friendly string representation with 4 characters in year when year is less than 1000', () => {
      // Arrange
      const year = 515
      const month = MonthNumber.Two
      const calendarMonth = new CalendarMonth(year, month)

      // Act
      const result = calendarMonth.toString()

      // Assert
      expect(result).toBe(`${month}nd month of CY0${year}`)
    })

    it('should return friendly string representation with correct month suffix when MonthNumber is Three', () => {
      // Arrange
      const year = 2020
      const month = MonthNumber.Three
      const calendarMonth = new CalendarMonth(year, month)

      // Act
      const result = calendarMonth.toString()

      // Assert
      expect(result).toBe(`${month}rd month of CY${year}`)
    })

    // tslint:disable-next-line: max-line-length
    it('should return friendly string representation with correct month suffix when MonthNumber is greater than Three', () => {
      // Arrange
      const year = 2020
      const month = MonthNumber.Eleven
      const calendarMonth = new CalendarMonth(year, month)

      // Act
      const result = calendarMonth.toString()

      // Assert
      expect(result).toBe(`${month}th month of CY${year}`)
    })
  })
})
