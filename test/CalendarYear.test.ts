import expect from 'expect'

import { CalendarYear } from '../src/CalendarYear'
import { FiscalYear } from '../src/FiscalYear'
import { UnitOfTimeGranularity } from '../src/UnitOfTimeGranularity'
import { UnitOfTimeKind } from '../src/UnitOfTimeKind'

describe('CalendarYear --', () => {
  describe('equals --', () => {
    it('should return true when testing the same instance', () => {
      // Arrange
      const year1 = new CalendarYear(2000)

      // Act
      const result = year1.equals(year1)

      // Assert
      expect(result).toBe(true)
    })

    it('should return true when different instances have the same year', () => {
      // Arrange
      const year1 = new CalendarYear(2000)
      const year2 = new CalendarYear(2000)

      // Act
      const result = year1.equals(year2)

      // Assert
      expect(result).toBe(true)
    })

    it('should return false when years are different', () => {
      // Arrange
      const year1 = new CalendarYear(2020)
      const year2 = new CalendarYear(2000)

      // Act
      const result = year1.equals(year2)

      // Assert
      expect(result).toBe(false)
    })

    it('should return false when year is undefined', () => {
      // Arrange
      const year1 = new CalendarYear(2020)
      const year2 = (undefined as any) as CalendarYear

      // Act
      const result = year1.equals(year2)

      // Assert
      expect(result).toBe(false)
    })

    it('should return false when year is null', () => {
      // Arrange
      const year1 = new CalendarYear(2020)
      const year2 = (null as any) as CalendarYear

      // Act
      const result = year1.equals(year2)

      // Assert
      expect(result).toBe(false)
    })

    it('should return false when type to test is not a CalendarYear', () => {
      // Arrange
      const year1 = new CalendarYear(2020)
      const year2 = new FiscalYear(2020) as any

      // Act
      const result = year1.equals(year2)

      // Assert
      expect(result).toBe(false)
    })
  })

  describe('greater than operator --', () => {
    it('should return true when left side is greater than right side', () => {
      // Arrange
      const year1 = new CalendarYear(2000)
      const year2 = new CalendarYear(1999)

      // Act
      const result = year1 > year2

      // Assert
      expect(result).toBe(true)
    })

    it('should return false when left side is less than right side', () => {
      // Arrange
      const year1 = new CalendarYear(2000)
      const year2 = new CalendarYear(2020)

      // Act
      const result = year1 > year2

      // Assert
      expect(result).toBe(false)
    })

    it('should return false when left side is equal to right side', () => {
      // Arrange
      const year1 = new CalendarYear(2000)
      const year2 = new CalendarYear(2000)

      // Act
      const result = year1 > year2

      // Assert
      expect(result).toBe(false)
    })
  })
  describe('less than operator --', () => {
    it('should return false when left side is greater than right side', () => {
      // Arrange
      const year1 = new CalendarYear(2000)
      const year2 = new CalendarYear(1999)

      // Act
      const result = year1 < year2

      // Assert
      expect(result).toBe(false)
    })

    it('should return true when left side is less than right side', () => {
      // Arrange
      const year1 = new CalendarYear(2000)
      const year2 = new CalendarYear(2020)

      // Act
      const result = year1 < year2

      // Assert
      expect(result).toBe(true)
    })

    it('should return false when left side is equal to right side', () => {
      // Arrange
      const year1 = new CalendarYear(2000)
      const year2 = new CalendarYear(2000)

      // Act
      const result = year1 < year2

      // Assert
      expect(result).toBe(false)
    })
  })
  describe('constructor --', () => {
    it('should return same value passed to constructor when getting', () => {
      // Arrange
      const validYear    = 2000
      const calendarYear = new CalendarYear(validYear)

      // Act
      const year = calendarYear.year

      // Assert
      expect(year).toBe(validYear)
    })

    it('should return UnitOfTimeGranularity with value of Year when getting', () => {
      // Arrange
      const year         = 2000
      const calendarYear = new CalendarYear(year)

      // Act
      const unitOfTimeGranularity = calendarYear.unitOfTimeGranularity

      // Assert
      expect(unitOfTimeGranularity).toBe(UnitOfTimeGranularity.Year)
    })

    it('should return UnitOfTimeKind with value of Calendar when getting', () => {
      // Arrange
      const year         = 2000
      const calendarYear = new CalendarYear(year)

      // Act
      const unitOfTimeKind = calendarYear.unitOfTimeKind

      // Assert
      expect(unitOfTimeKind).toBe(UnitOfTimeKind.Calendar)
    })

    it('should throw error when parameter year is undefined', () => {
      // Arrange
      const year = undefined as any

      // Act
      const constructor = () => new CalendarYear(year)

      // Assert
      expect(constructor).toThrow(/must be a positive integer/)
    })

    it('should throw error when parameter year is NaN', () => {
      // Arrange
      const year = NaN

      // Act
      const constructor = () => new CalendarYear(year)

      // Assert
      expect(constructor).toThrow(/must be a positive integer/)
    })

    it('should throw error when parameter year is less than 1', () => {
      // Arrange
      const year = 0

      // Act
      const constructor = () => new CalendarYear(year)

      // Assert
      expect(constructor).toThrow(/must be a positive integer/)
    })

    it('should throw error when parameter year is greater than 9999', () => {
      // Arrange
      const year = 10000

      // Act
      const constructor = () => new CalendarYear(year)

      // Assert
      expect(constructor).toThrow(/must be a positive integer/)
    })
  })
  describe('toString --', () => {
    it('should return friendly string representation when called', () => {
      // Arrange
      const year         = 2000
      const calendarYear = new CalendarYear(year)

      // Act
      const result = calendarYear.toString()

      // Assert
      expect(result).toBe(`CY${year}`)
    })

    it('should return friendly string representation with a length of 4 characters when year is less than 1000', () => {
      // Arrange
      const year         = 515
      const calendarYear = new CalendarYear(year)

      // Act
      const result = calendarYear.toString()

      // Assert
      expect(result).toBe(`CY0${year}`)
    })
  })
})
