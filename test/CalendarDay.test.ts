import expect from 'expect'

import { CalendarDay } from '../src/CalendarDay'
import { CalendarYear } from '../src/CalendarYear'
import { DayOfMonth } from '../src/DayOfMonth'
import { MonthNumber } from '../src/MonthNumber'
import { UnitOfTimeGranularity } from '../src/UnitOfTimeGranularity'
import { UnitOfTimeKind } from '../src/UnitOfTimeKind'

describe('CalendarDay --', () => {
  describe('equals --', () => {
    it('should return true when testing the same instance', () => {
      // Arrange
      const calendarDay = new CalendarDay(2000, MonthNumber.Eight, DayOfMonth.Seven)

      // Act
      const result = calendarDay.equals(calendarDay)

      // Assert
      expect(result).toBe(true)
    })

    it('should return true when different instances have the same properties', () => {
      // Arrange
      const calendarDay1 = new CalendarDay(2000, MonthNumber.Eleven, DayOfMonth.Thirteen)
      const calendarDay2 = new CalendarDay(2000, MonthNumber.Eleven, DayOfMonth.Thirteen)

      // Act
      const result = calendarDay1.equals(calendarDay2)

      // Assert
      expect(result).toBe(true)
    })

    it('should return false when days are different', () => {
      // Arrange
      const calendarDay1 = new CalendarDay(2000, MonthNumber.Eleven, DayOfMonth.One)
      const calendarDay2 = new CalendarDay(2000, MonthNumber.Eleven, DayOfMonth.Thirteen)

      // Act
      const result = calendarDay1.equals(calendarDay2)

      // Assert
      expect(result).toBe(false)
    })

    it('should return false when MonthNumbers are different and years and days are the same', () => {
      // Arrange
      const calendarDay1 = new CalendarDay(2000, MonthNumber.Eleven, DayOfMonth.One)
      const calendarDay2 = new CalendarDay(2000, MonthNumber.Twelve, DayOfMonth.One)

      // Act
      const result = calendarDay1.equals(calendarDay2)

      // Assert
      expect(result).toBe(false)
    })

    it('should return false when years are different and MonthNumber and days are the same', () => {
      // Arrange
      const calendarDay1 = new CalendarDay(2001, MonthNumber.Twelve, DayOfMonth.One)
      const calendarDay2 = new CalendarDay(2000, MonthNumber.Twelve, DayOfMonth.One)

      // Act
      const result = calendarDay1.equals(calendarDay2)

      // Assert
      expect(result).toBe(false)
    })

    it('should return false when CalendarDay is undefined', () => {
      // Arrange
      const calendarDay1 = new CalendarDay(2001, MonthNumber.Twelve, DayOfMonth.One)
      const calendarDay2 = (undefined as any) as CalendarDay

      // Act
      const result = calendarDay1.equals(calendarDay2)

      // Assert
      expect(result).toBe(false)
    })

    it('should return false when CalendarDay is null', () => {
      // Arrange
      const calendarDay1 = new CalendarDay(2020, MonthNumber.Six, DayOfMonth.Six)
      const calendarDay2 = (null as any) as CalendarDay

      // Act
      const result = calendarDay1.equals(calendarDay2)

      // Assert
      expect(result).toBe(false)
    })

    it('should return false when type to test is not a CalendarDay', () => {
      // Arrange
      const calendarDay1 = new CalendarDay(2020, MonthNumber.Ten, DayOfMonth.Thirty)
      const calendarDay2 = new CalendarYear(2020) as any

      // Act
      const result = calendarDay1.equals(calendarDay2)

      // Assert
      expect(result).toBe(false)
    })
  })

  describe('greater than operator --', () => {
    it('should return true when left side is greater than right side and they differ by only DayOfMonth', () => {
      // Arrange
      const calendarDay1 = new CalendarDay(2020, MonthNumber.Ten, DayOfMonth.Thirty)
      const calendarDay2 = new CalendarDay(2020, MonthNumber.Ten, DayOfMonth.Ten)

      // Act
      const result = calendarDay1 > calendarDay2

      // Assert
      expect(result).toBe(true)
    })

    it('should return true when left side is greater than right side and they differ by only MonthNumber', () => {
      // Arrange
      const calendarDay1 = new CalendarDay(2020, MonthNumber.Twelve, DayOfMonth.Thirty)
      const calendarDay2 = new CalendarDay(2020, MonthNumber.Ten, DayOfMonth.Thirty)

      // Act
      const result = calendarDay1 > calendarDay2

      // Assert
      expect(result).toBe(true)
    })

    it('should return true when left side is greater than right side and they differ by only Year', () => {
      // Arrange
      const calendarDay1 = new CalendarDay(2022, MonthNumber.Ten, DayOfMonth.Thirty)
      const calendarDay2 = new CalendarDay(2020, MonthNumber.Ten, DayOfMonth.Thirty)

      // Act
      const result = calendarDay1 > calendarDay2

      // Assert
      expect(result).toBe(true)
    })

    it('should return false when left side is less than right side', () => {
      // Arrange
      const calendarDay1 = new CalendarDay(2001, MonthNumber.Ten, DayOfMonth.Thirty)
      const calendarDay2 = new CalendarDay(2020, MonthNumber.Ten, DayOfMonth.Thirty)

      // Act
      const result = calendarDay1 > calendarDay2

      // Assert
      expect(result).toBe(false)
    })

    it('should return false when left side is equal to right side', () => {
      // Arrange
      const calendarDay1 = new CalendarDay(2020, MonthNumber.Ten, DayOfMonth.Thirty)
      const calendarDay2 = new CalendarDay(2020, MonthNumber.Ten, DayOfMonth.Thirty)

      // Act
      const result = calendarDay1 > calendarDay2

      // Assert
      expect(result).toBe(false)
    })
  })
  describe('less than operator --', () => {
    it('should return false when left side is greater than right side', () => {
      // Arrange
      const calendarDay1 = new CalendarDay(2020, MonthNumber.Three, DayOfMonth.ThirtyOne)
      const calendarDay2 = new CalendarDay(2020, MonthNumber.Three, DayOfMonth.Thirty)

      // Act
      const result = calendarDay1 < calendarDay2

      // Assert
      expect(result).toBe(false)
    })

    it('should return true when left side is less than right side', () => {
      // Arrange
      const calendarDay1 = new CalendarDay(2020, MonthNumber.Three, DayOfMonth.TwentyThree)
      const calendarDay2 = new CalendarDay(2020, MonthNumber.Three, DayOfMonth.Thirty)

      // Act
      const result = calendarDay1 < calendarDay2

      // Assert
      expect(result).toBe(true)
    })

    it('should return false when left side is equal to right side', () => {
      // Arrange
      const calendarDay1 = new CalendarDay(2020, MonthNumber.Three, DayOfMonth.TwentyThree)
      const calendarDay2 = new CalendarDay(2020, MonthNumber.Three, DayOfMonth.TwentyThree)

      // Act
      const result = calendarDay1 < calendarDay1

      // Assert
      expect(result).toBe(false)
    })
  })
  describe('constructor --', () => {
    it('should return same value passed to constructor when getting', () => {
      // Arrange
      const validYear   = 2000
      const validMonth  = MonthNumber.Seven
      const validDay    = DayOfMonth.Seven
      const calendarDay = new CalendarDay(validYear, validMonth, validDay)

      // Act
      const year  = calendarDay.year
      const month = calendarDay.monthNumber
      const day   = calendarDay.dayOfMonth

      // Assert
      expect(year).toBe(validYear)
      expect(month).toBe(validMonth)
      expect(day).toBe(validDay)
    })

    it('should return UnitOfTimeGranularity with value of Day when getting', () => {
      // Arrange
      const year        = 2000
      const month       = MonthNumber.Six
      const day         = DayOfMonth.TwentyFive
      const calendarDay = new CalendarDay(year, month, day)

      // Act
      const unitOfTimeGranularity = calendarDay.unitOfTimeGranularity

      // Assert
      expect(unitOfTimeGranularity).toBe(UnitOfTimeGranularity.Day)
    })

    it('should return UnitOfTimeKind with value of Calendar when getting', () => {
      const year        = 2000
      const month       = MonthNumber.Six
      const day         = DayOfMonth.TwentyFive
      const calendarDay = new CalendarDay(year, month, day)

      // Act
      const unitOfTimeKind = calendarDay.unitOfTimeKind

      // Assert
      expect(unitOfTimeKind).toBe(UnitOfTimeKind.Calendar)
    })

    it('should throw error when parameter year is undefined', () => {
      // Arrange
      const year  = undefined as any
      const month = MonthNumber.Three
      const day   = DayOfMonth.TwentyFive

      // Act
      const constructor = () => new CalendarDay(year, month, day)

      // Assert
      expect(constructor).toThrow(/must be a positive integer/)
    })

    it('should throw error when parameter year is NaN', () => {
      // Arrange
      const year  = NaN
      const month = MonthNumber.Twelve
      const day   = DayOfMonth.TwentyFive

      // Act
      const constructor = () => new CalendarDay(year, month, day)

      // Assert
      expect(constructor).toThrow(/must be a positive integer/)
    })

    it('should throw error when parameter year is less than 1', () => {
      // Arrange
      const year  = 0
      const month = MonthNumber.Two
      const day   = DayOfMonth.TwentyFive

      // Act
      const constructor = () => new CalendarDay(year, month, day)

      // Assert
      expect(constructor).toThrow(/must be a positive integer/)
    })

    it('should throw error when parameter year is greater than 9999', () => {
      // Arrange
      const year  = 10000
      const month = MonthNumber.Two
      const day   = DayOfMonth.TwentyFive

      // Act
      const constructor = () => new CalendarDay(year, month, day)

      // Assert
      expect(constructor).toThrow(/must be a positive integer/)
    })

    it('should throw error when parameter monthNumber is undefined', () => {
      // Arrange
      const year  = 2000
      const month = undefined as any
      const day   = DayOfMonth.TwentyFive

      // Act
      const constructor = () => new CalendarDay(year, month, day)

      // Assert
      expect(constructor).toThrow(/must be a valid MonthNumber/)
    })

    it('should throw error when parameter monthNumber is out of range', () => {
      // Arrange
      const year  = 2000
      const month = 22 as MonthNumber
      const day   = DayOfMonth.TwentyFour

      // Act
      const constructor = () => new CalendarDay(year, month, day)

      // Assert
      expect(constructor).toThrow(/must be a valid MonthNumber/)
    })

    it('should throw error when parameter dayOfMonth is undefined', () => {
      // Arrange
      const year       = 2000
      const month      = MonthNumber.Seven
      const dayOfMonth = undefined as any

      // Act
      const constructor = () => new CalendarDay(year, month, dayOfMonth)

      // Assert
      expect(constructor).toThrow(/must be a valid DayOfMonth/)
    })

    it('should throw error when parameter dayOfMonth is out of range', () => {
      // Arrange
      const year       = 2000
      const month      = MonthNumber.Seven
      const dayOfMonth = 99 as DayOfMonth

      // Act
      const constructor = () => new CalendarDay(year, month, dayOfMonth)

      // Assert
      expect(constructor).toThrow(/must be a valid DayOfMonth/)
    })

    it('should throw error when parameter dayOfMonth is Invalid', () => {
      // Arrange
      const year       = 2000
      const month      = MonthNumber.Seven
      const dayOfMonth = DayOfMonth.Invalid

      // Act
      const constructor = () => new CalendarDay(year, month, dayOfMonth)

      // Assert
      expect(constructor).toThrow(/must not be Invalid/)
    })
  })
  describe('toString --', () => {
    it('should return friendly string representation when called', () => {
      // Arrange
      const year        = 2000
      const month       = MonthNumber.One
      const day         = DayOfMonth.One
      const calendarDay = new CalendarDay(year, month, day)

      // Act
      const result = calendarDay.toString()

      // Assert
      expect(result).toBe(`${year}-0${month}-0${day}`)
    })

    it('should return friendly string representation with 4 characters in year when year is less than 1000', () => {
      // Arrange
      const year        = 515
      const month       = MonthNumber.Two
      const day         = DayOfMonth.One
      const calendarDay = new CalendarDay(year, month, day)

      // Act
      const result = calendarDay.toString()

      // Assert
      expect(result).toBe(`0${year}-0${month}-0${day}`)
    })

    // tslint:disable-next-line: max-line-length
    it(
      'should return friendly string representation with correct 2 characters in month when MonthNumber is less than 10',
      () => {
        const year        = 2112
        const month       = MonthNumber.Two
        const day         = DayOfMonth.TwentyThree
        const calendarDay = new CalendarDay(year, month, day)

        // Act
        const result = calendarDay.toString()

        // Assert
        expect(result).toBe(`${year}-0${month}-${day}`)
      },
    )

    // tslint:disable-next-line: max-line-length
    it(
      'should return friendly string representation with correct 2 characters in day when DayOfMonth is less than 10',
      () => {
        const year        = 2112
        const month       = MonthNumber.Twelve
        const day         = DayOfMonth.One
        const calendarDay = new CalendarDay(year, month, day)

        // Act
        const result = calendarDay.toString()

        // Assert
        expect(result).toBe(`${year}-${month}-0${day}`)
      },
    )
  })
})
