import expect from 'expect'

import { CalendarYear } from '../src/CalendarYear'
import { FiscalYear } from '../src/FiscalYear'
import { UnitOfTimeGranularity } from '../src/UnitOfTimeGranularity'
import { UnitOfTimeKind } from '../src/UnitOfTimeKind'

describe('FiscalYear --', () => {
  describe('equals --', () => {
    it('should return true when testing the same instance', () => {
      // Arrange
      const year1 = new FiscalYear(2000)

      // Act
      const result = year1.equals(year1)

      // Assert
      expect(result).toBe(true)
    })

    it('should return true when different instances have the same year', () => {
      // Arrange
      const year1 = new FiscalYear(2000)
      const year2 = new FiscalYear(2000)

      // Act
      const result = year1.equals(year2)

      // Assert
      expect(result).toBe(true)
    })

    it('should return false when years are different', () => {
      // Arrange
      const year1 = new FiscalYear(2020)
      const year2 = new FiscalYear(2000)

      // Act
      const result = year1.equals(year2)

      // Assert
      expect(result).toBe(false)
    })

    it('should return false when year is undefined', () => {
      // Arrange
      const year1 = new FiscalYear(2020)
      const year2 = (undefined as any) as FiscalYear

      // Act
      const result = year1.equals(year2)

      // Assert
      expect(result).toBe(false)
    })

    it('should return false when year is null', () => {
      // Arrange
      const year1 = new FiscalYear(2020)
      const year2 = (null as any) as FiscalYear

      // Act
      const result = year1.equals(year2)

      // Assert
      expect(result).toBe(false)
    })

    it('should return false when type to test is not a FiscalYear', () => {
      // Arrange
      const year1 = new FiscalYear(2020)
      const year2 = new CalendarYear(2020) as any

      // Act
      const result = year1.equals(year2)

      // Assert
      expect(result).toBe(false)
    })
  })

  describe('greater than operator --', () => {
    it('should return true when left side is greater than right side', () => {
      // Arrange
      const year1 = new FiscalYear(2000)
      const year2 = new FiscalYear(1999)

      // Act
      const result = year1 > year2

      // Assert
      expect(result).toBe(true)
    })

    it('should return false when left side is less than right side', () => {
      // Arrange
      const year1 = new FiscalYear(2000)
      const year2 = new FiscalYear(2020)

      // Act
      const result = year1 > year2

      // Assert
      expect(result).toBe(false)
    })

    it('should return false when left side is equal to right side', () => {
      // Arrange
      const year1 = new FiscalYear(2000)
      const year2 = new FiscalYear(2000)

      // Act
      const result = year1 > year2

      // Assert
      expect(result).toBe(false)
    })
  })
  describe('less than operator --', () => {
    it('should return false when left side is greater than right side', () => {
      // Arrange
      const year1 = new FiscalYear(2000)
      const year2 = new FiscalYear(1999)

      // Act
      const result = year1 < year2

      // Assert
      expect(result).toBe(false)
    })

    it('should return true when left side is less than right side', () => {
      // Arrange
      const year1 = new FiscalYear(2000)
      const year2 = new FiscalYear(2020)

      // Act
      const result = year1 < year2

      // Assert
      expect(result).toBe(true)
    })

    it('should return false when left side is equal to right side', () => {
      // Arrange
      const year1 = new FiscalYear(2000)
      const year2 = new FiscalYear(2000)

      // Act
      const result = year1 < year2

      // Assert
      expect(result).toBe(false)
    })
  })
  describe('constructor --', () => {
    it('should return same value passed to constructor when getting', () => {
      // Arrange
      const validYear  = 2000
      const fiscalYear = new FiscalYear(validYear)

      // Act
      const year = fiscalYear.year

      // Assert
      expect(year).toBe(validYear)
    })

    it('should return UnitOfTimeGranularity with value of Year when getting', () => {
      // Arrange
      const year       = 2000
      const fiscalYear = new FiscalYear(year)

      // Act
      const unitOfTimeGranularity = fiscalYear.unitOfTimeGranularity

      // Assert
      expect(unitOfTimeGranularity).toBe(UnitOfTimeGranularity.Year)
    })

    it('should return UnitOfTimeKind with value of Fiscal when getting', () => {
      // Arrange
      const year       = 2000
      const fiscalYear = new FiscalYear(year)

      // Act
      const unitOfTimeKind = fiscalYear.unitOfTimeKind

      // Assert
      expect(unitOfTimeKind).toBe(UnitOfTimeKind.Fiscal)
    })

    it('should throw error when parameter year is undefined', () => {
      // Arrange
      const year = undefined as any

      // Act
      const constructor = () => new FiscalYear(year)

      // Assert
      expect(constructor).toThrow(/must be a positive integer/)
    })

    it('should throw error when parameter year is NaN', () => {
      // Arrange
      const year = NaN

      // Act
      const constructor = () => new FiscalYear(year)

      // Assert
      expect(constructor).toThrow(/must be a positive integer/)
    })

    it('should throw error when parameter year is less than 1', () => {
      // Arrange
      const year = 0

      // Act
      const constructor = () => new FiscalYear(year)

      // Assert
      expect(constructor).toThrow(/must be a positive integer/)
    })

    it('should throw error when parameter year is greater than 9999', () => {
      // Arrange
      const year = 10000

      // Act
      const constructor = () => new FiscalYear(year)

      // Assert
      expect(constructor).toThrow(/must be a positive integer/)
    })
  })
  describe('toString --', () => {
    it('should return friendly string representation when called', () => {
      // Arrange
      const year       = 2000
      const fiscalYear = new FiscalYear(year)

      // Act
      const result = fiscalYear.toString()

      // Assert
      expect(result).toBe(`FY${year}`)
    })

    it('should return friendly string representation with a length of 4 characters when year is less than 1000', () => {
      // Arrange
      const year       = 515
      const fiscalYear = new FiscalYear(year)

      // Act
      const result = fiscalYear.toString()

      // Assert
      expect(result).toBe(`FY0${year}`)
    })
  })
})
