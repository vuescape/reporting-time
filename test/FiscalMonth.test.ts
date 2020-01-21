import expect from 'expect'

import { CalendarYear } from '../src/CalendarYear'
import { FiscalMonth } from '../src/FiscalMonth'
import { MonthNumber } from '../src/MonthNumber'
import { UnitOfTimeGranularity } from '../src/UnitOfTimeGranularity'
import { UnitOfTimeKind } from '../src/UnitOfTimeKind'

describe('FiscalMonth --', () => {
  describe('equals --', () => {
    it('should return true when testing the same instance', () => {
      // Arrange
      const fiscalMonth = new FiscalMonth(2000, MonthNumber.Eight)

      // Act
      const result = fiscalMonth.equals(fiscalMonth)

      // Assert
      expect(result).toBe(true)
    })

    it('should return true when different instances have the same year', () => {
      // Arrange
      const fiscalMonth1 = new FiscalMonth(2000, MonthNumber.Eleven)
      const fiscalMonth2 = new FiscalMonth(2000, MonthNumber.Eleven)

      // Act
      const result = fiscalMonth1.equals(fiscalMonth2)

      // Assert
      expect(result).toBe(true)
    })

    it('should return false when years are different', () => {
      // Arrange
      const fiscalMonth1 = new FiscalMonth(2020, MonthNumber.Five)
      const fiscalMonth2 = new FiscalMonth(2000, MonthNumber.Five)

      // Act
      const result = fiscalMonth1.equals(fiscalMonth2)

      // Assert
      expect(result).toBe(false)
    })

    it('should return false when MonthNumbers are different and years are the same', () => {
      // Arrange
      const fiscalMonth1 = new FiscalMonth(2020, MonthNumber.Nine)
      const fiscalMonth2 = new FiscalMonth(2020, MonthNumber.Four)

      // Act
      const result = fiscalMonth1.equals(fiscalMonth2)

      // Assert
      expect(result).toBe(false)
    })

    it('should return false when FiscalMonth is undefined', () => {
      // Arrange
      const fiscalMonth1 = new FiscalMonth(2020, MonthNumber.Seven)
      const fiscalMonth2 = (undefined as any) as FiscalMonth

      // Act
      const result = fiscalMonth1.equals(fiscalMonth2)

      // Assert
      expect(result).toBe(false)
    })

    it('should return false when FiscalMonth is null', () => {
      // Arrange
      const fiscalMonth1 = new FiscalMonth(2020, MonthNumber.Six)
      const fiscalMonth2 = (null as any) as FiscalMonth

      // Act
      const result = fiscalMonth1.equals(fiscalMonth2)

      // Assert
      expect(result).toBe(false)
    })

    it('should return false when type to test is not a FiscalMonth', () => {
      // Arrange
      const fiscalMonth1 = new FiscalMonth(2020, MonthNumber.Ten)
      const fiscalMonth2 = new CalendarYear(2020) as any

      // Act
      const result = fiscalMonth1.equals(fiscalMonth2)

      // Assert
      expect(result).toBe(false)
    })
  })

  describe('greater than operator --', () => {
    it('should return true when left side is greater than right side and they differ by only MonthNumber', () => {
      // Arrange
      const fiscalMonth1 = new FiscalMonth(2000, MonthNumber.Twelve)
      const fiscalMonth2 = new FiscalMonth(2000, MonthNumber.Three)

      // Act
      const result = fiscalMonth1 > fiscalMonth2

      // Assert
      expect(result).toBe(true)
    })

    it('should return true when left side is greater than right side and they differ by only Year', () => {
      // Arrange
      const fiscalMonth1 = new FiscalMonth(2001, MonthNumber.Two)
      const fiscalMonth2 = new FiscalMonth(2000, MonthNumber.Two)

      // Act
      const result = fiscalMonth1 > fiscalMonth2

      // Assert
      expect(result).toBe(true)
    })

    it('should return false when left side is less than right side', () => {
      // Arrange
      const fiscalMonth1 = new FiscalMonth(2000, MonthNumber.Eight)
      const fiscalMonth2 = new FiscalMonth(2020, MonthNumber.Eight)

      // Act
      const result = fiscalMonth1 > fiscalMonth2

      // Assert
      expect(result).toBe(false)
    })

    it('should return false when left side is equal to right side', () => {
      // Arrange
      const fiscalMonth1 = new FiscalMonth(2000, MonthNumber.Eight)
      const fiscalMonth2 = new FiscalMonth(2000, MonthNumber.Eight)

      // Act
      const result = fiscalMonth1 > fiscalMonth2

      // Assert
      expect(result).toBe(false)
    })
  })
  describe('less than operator --', () => {
    it('should return false when left side is greater than right side', () => {
      // Arrange
      const fiscalMonth1 = new FiscalMonth(2000, MonthNumber.Eleven)
      const fiscalMonth2 = new FiscalMonth(1999, MonthNumber.Five)

      // Act
      const result = fiscalMonth1 < fiscalMonth2

      // Assert
      expect(result).toBe(false)
    })

    it('should return true when left side is less than right side', () => {
      // Arrange
      const fiscalMonth1 = new FiscalMonth(2000, MonthNumber.Four)
      const fiscalMonth2 = new FiscalMonth(2020, MonthNumber.Nine)

      // Act
      const result = fiscalMonth1 < fiscalMonth2

      // Assert
      expect(result).toBe(true)
    })

    it('should return false when left side is equal to right side', () => {
      // Arrange
      const fiscalMonth1 = new FiscalMonth(2000, MonthNumber.One)
      const fiscalMonth2 = new FiscalMonth(2000, MonthNumber.One)

      // Act
      const result = fiscalMonth1 < fiscalMonth2

      // Assert
      expect(result).toBe(false)
    })
  })
  describe('constructor --', () => {
    it('should return same value passed to constructor when getting', () => {
      // Arrange
      const validYear = 2000
      const validMonth = MonthNumber.Seven
      const fiscalMonth = new FiscalMonth(validYear, validMonth)

      // Act
      const year = fiscalMonth.year
      const month = fiscalMonth.monthNumber

      // Assert
      expect(year).toBe(validYear)
      expect(month).toBe(validMonth)
    })

    it('should return UnitOfTimeGranularity with value of Month when getting', () => {
      // Arrange
      const year = 2000
      const month = MonthNumber.Six
      const fiscalMonth = new FiscalMonth(year, month)

      // Act
      const unitOfTimeGranularity = fiscalMonth.unitOfTimeGranularity

      // Assert
      expect(unitOfTimeGranularity).toBe(UnitOfTimeGranularity.Month)
    })

    it('should return UnitOfTimeKind with value of Fiscal when getting', () => {
      // Arrange
      const year = 2000
      const month = MonthNumber.Ten
      const fiscalMonth = new FiscalMonth(year, month)

      // Act
      const unitOfTimeKind = fiscalMonth.unitOfTimeKind

      // Assert
      expect(unitOfTimeKind).toBe(UnitOfTimeKind.Fiscal)
    })

    it('should throw error when parameter year is undefined', () => {
      // Arrange
      const year = undefined as any
      const month = MonthNumber.Three

      // Act
      const constructor = () => new FiscalMonth(year, month)

      // Assert
      expect(constructor).toThrow(/must be a positive integer/)
    })

    it('should throw error when parameter year is NaN', () => {
      // Arrange
      const year = NaN
      const month = MonthNumber.Twelve

      // Act
      const constructor = () => new FiscalMonth(year, month)

      // Assert
      expect(constructor).toThrow(/must be a positive integer/)
    })

    it('should throw error when parameter year is less than 1', () => {
      // Arrange
      const year = 0
      const month = MonthNumber.Two

      // Act
      const constructor = () => new FiscalMonth(year, month)

      // Assert
      expect(constructor).toThrow(/must be a positive integer/)
    })

    it('should throw error when parameter year is greater than 9999', () => {
      // Arrange
      const year = 10000
      const month = MonthNumber.Two

      // Act
      const constructor = () => new FiscalMonth(year, month)

      // Assert
      expect(constructor).toThrow(/must be a positive integer/)
    })

    it('should throw error when parameter monthNumber is undefined', () => {
      // Arrange
      const year = 2000
      const monthNumber = undefined as any

      // Act
      const constructor = () => new FiscalMonth(year, monthNumber)

      // Assert
      expect(constructor).toThrow(/must be a valid MonthNumber/)
    })

    it('should throw error when parameter monthNumber is out of range', () => {
      // Arrange
      const year = 2000
      const month = 22 as MonthNumber

      // Act
      const constructor = () => new FiscalMonth(year, month)

      // Assert
      expect(constructor).toThrow(/must be a valid MonthNumber/)
    })
  })
  describe('toString --', () => {
    it('should return friendly string representation when called', () => {
      // Arrange
      const year = 2000
      const month = MonthNumber.One
      const fiscalMonth = new FiscalMonth(year, month)

      // Act
      const result = fiscalMonth.toString()

      // Assert
      expect(result).toBe(`${month}st month of FY${year}`)
    })

    it('should return friendly string representation with 4 characters in year when year is less than 1000', () => {
      // Arrange
      const year = 515
      const month = MonthNumber.Two
      const fiscalMonth = new FiscalMonth(year, month)

      // Act
      const result = fiscalMonth.toString()

      // Assert
      expect(result).toBe(`${month}nd month of FY0${year}`)
    })

    it('should return friendly string representation with correct month suffix when MonthNumber is Three', () => {
      // Arrange
      const year = 2020
      const month = MonthNumber.Three
      const fiscalMonth = new FiscalMonth(year, month)

      // Act
      const result = fiscalMonth.toString()

      // Assert
      expect(result).toBe(`${month}rd month of FY${year}`)
    })

    // tslint:disable-next-line: max-line-length
    it('should return friendly string representation with correct month suffix when MonthNumber is greater than Three', () => {
      // Arrange
      const year = 2020
      const month = MonthNumber.Eleven
      const fiscalMonth = new FiscalMonth(year, month)

      // Act
      const result = fiscalMonth.toString()

      // Assert
      expect(result).toBe(`${month}th month of FY${year}`)
    })
  })
})
