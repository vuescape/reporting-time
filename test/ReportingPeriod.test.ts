import expect from 'expect'

import { CalendarYear, FiscalQuarter, QuarterNumber, UnitOfTimeGranularity, UnitOfTimeKind  } from '../src/index'

describe('Reporting Period --', () => {
  describe('equals --', () => {
    it('should return true when testing the same instance', () => {
      // Arrange
      const fiscalQuarter = new FiscalQuarter(2000, QuarterNumber.Q1)

      // Act
      const result = fiscalQuarter.equals(fiscalQuarter)

      // Assert
      expect(result).toBe(true)
    })

    it('should return true when different instances have the same year', () => {
      // Arrange
      const fiscalQuarter1 = new FiscalQuarter(2000, QuarterNumber.Q1)
      const fiscalQuarter2 = new FiscalQuarter(2000, QuarterNumber.Q1)

      // Act
      const result = fiscalQuarter1.equals(fiscalQuarter2)

      // Assert
      expect(result).toBe(true)
    })

    it('should return false when years are different', () => {
      // Arrange
      const fiscalQuarter1 = new FiscalQuarter(2020, QuarterNumber.Q1)
      const fiscalQuarter2 = new FiscalQuarter(2000, QuarterNumber.Q1)

      // Act
      const result = fiscalQuarter1.equals(fiscalQuarter2)

      // Assert
      expect(result).toBe(false)
    })

    it('should return false when QuarterNumbers are different and years are the same', () => {
      // Arrange
      const fiscalQuarter1 = new FiscalQuarter(2020, QuarterNumber.Q1)
      const fiscalQuarter2 = new FiscalQuarter(2020, QuarterNumber.Q4)

      // Act
      const result = fiscalQuarter1.equals(fiscalQuarter2)

      // Assert
      expect(result).toBe(false)
    })

    it('should return false when FiscalQuarter is undefined', () => {
      // Arrange
      const fiscalQuarter1 = new FiscalQuarter(2020, QuarterNumber.Q2)
      const fiscalQuarter2 = (undefined as any) as FiscalQuarter

      // Act
      const result = fiscalQuarter1.equals(fiscalQuarter2)

      // Assert
      expect(result).toBe(false)
    })

    it('should return false when FiscalQuarter is null', () => {
      // Arrange
      const fiscalQuarter1 = new FiscalQuarter(2020, QuarterNumber.Q3)
      const fiscalQuarter2 = (null as any) as FiscalQuarter

      // Act
      const result = fiscalQuarter1.equals(fiscalQuarter2)

      // Assert
      expect(result).toBe(false)
    })

    it('should return false when type to test is not a FiscalQuarter', () => {
      // Arrange
      const fiscalQuarter1 = new FiscalQuarter(2020, QuarterNumber.Q4)
      const fiscalQuarter2 = new CalendarYear(2020) as any

      // Act
      const result = fiscalQuarter1.equals(fiscalQuarter2)

      // Assert
      expect(result).toBe(false)
    })
  })

  describe('greater than operator --', () => {
    it('should return true when left side is greater than right side and they differ by only QuarterNumber', () => {
      // Arrange
      const fiscalQuarter1 = new FiscalQuarter(2000, QuarterNumber.Q2)
      const fiscalQuarter2 = new FiscalQuarter(2000, QuarterNumber.Q1)

      // Act
      const result = fiscalQuarter1 > fiscalQuarter2

      // Assert
      expect(result).toBe(true)
    })

    it('should return true when left side is greater than right side and they differ by only Year', () => {
      // Arrange
      const fiscalQuarter1 = new FiscalQuarter(2001, QuarterNumber.Q1)
      const fiscalQuarter2 = new FiscalQuarter(2000, QuarterNumber.Q1)

      // Act
      const result = fiscalQuarter1 > fiscalQuarter2

      // Assert
      expect(result).toBe(true)
    })

    it('should return false when left side is less than right side', () => {
      // Arrange
      const fiscalQuarter1 = new FiscalQuarter(2000, QuarterNumber.Q2)
      const fiscalQuarter2 = new FiscalQuarter(2020, QuarterNumber.Q1)

      // Act
      const result = fiscalQuarter1 > fiscalQuarter2

      // Assert
      expect(result).toBe(false)
    })

    it('should return false when left side is equal to right side', () => {
      // Arrange
      const fiscalQuarter1 = new FiscalQuarter(2000, QuarterNumber.Q3)
      const fiscalQuarter2 = new FiscalQuarter(2000, QuarterNumber.Q3)

      // Act
      const result = fiscalQuarter1 > fiscalQuarter2

      // Assert
      expect(result).toBe(false)
    })
  })
  describe('less than operator --', () => {
    it('should return false when left side is greater than right side', () => {
      // Arrange
      const fiscalQuarter1 = new FiscalQuarter(2000, QuarterNumber.Q2)
      const fiscalQuarter2 = new FiscalQuarter(1999, QuarterNumber.Q2)

      // Act
      const result = fiscalQuarter1 < fiscalQuarter2

      // Assert
      expect(result).toBe(false)
    })

    it('should return true when left side is less than right side', () => {
      // Arrange
      const fiscalQuarter1 = new FiscalQuarter(2000, QuarterNumber.Q2)
      const fiscalQuarter2 = new FiscalQuarter(2020, QuarterNumber.Q2)

      // Act
      const result = fiscalQuarter1 < fiscalQuarter2

      // Assert
      expect(result).toBe(true)
    })

    it('should return false when left side is equal to right side', () => {
      // Arrange
      const fiscalQuarter1 = new FiscalQuarter(2000, QuarterNumber.Q2)
      const fiscalQuarter2 = new FiscalQuarter(2000, QuarterNumber.Q2)

      // Act
      const result = fiscalQuarter1 < fiscalQuarter2

      // Assert
      expect(result).toBe(false)
    })
  })
  describe('constructor --', () => {
    it('should return same value passed to constructor when getting', () => {
      // Arrange
      const validYear = 2000
      const validQuarter = QuarterNumber.Q2
      const fiscalQuarter = new FiscalQuarter(validYear, validQuarter)

      // Act
      const year = fiscalQuarter.year
      const quarter = fiscalQuarter.quarterNumber

      // Assert
      expect(year).toBe(validYear)
      expect(quarter).toBe(validQuarter)
    })

    it('should return UnitOfTimeGranularity with value of Quarter when getting', () => {
      // Arrange
      const year = 2000
      const quarter = QuarterNumber.Q3
      const fiscalQuarter = new FiscalQuarter(year, quarter)

      // Act
      const unitOfTimeGranularity = fiscalQuarter.unitOfTimeGranularity

      // Assert
      expect(unitOfTimeGranularity).toBe(UnitOfTimeGranularity.Quarter)
    })

    it('should return UnitOfTimeKind with value of Fiscal when getting', () => {
      // Arrange
      const year = 2000
      const quarter = QuarterNumber.Q3
      const fiscalQuarter = new FiscalQuarter(year, quarter)

      // Act
      const unitOfTimeKind = fiscalQuarter.unitOfTimeKind

      // Assert
      expect(unitOfTimeKind).toBe(UnitOfTimeKind.Fiscal)
    })

    it('should throw error when parameter year is undefined', () => {
      // Arrange
      const year = undefined as any
      const quarter = QuarterNumber.Q3

      // Act
      const constructor = () => new FiscalQuarter(year, quarter)

      // Assert
      expect(constructor).toThrow(/must be a positive integer/)
    })

    it('should throw error when parameter year is NaN', () => {
      // Arrange
      const year = NaN
      const quarter = QuarterNumber.Q3

      // Act
      const constructor = () => new FiscalQuarter(year, quarter)

      // Assert
      expect(constructor).toThrow(/must be a positive integer/)
    })

    it('should throw error when parameter year is less than 1', () => {
      // Arrange
      const year = 0
      const quarter = QuarterNumber.Q3

      // Act
      const constructor = () => new FiscalQuarter(year, quarter)

      // Assert
      expect(constructor).toThrow(/must be a positive integer/)
    })

    it('should throw error when parameter year is greater than 9999', () => {
      // Arrange
      const year = 10000
      const quarter = QuarterNumber.Q3

      // Act
      const constructor = () => new FiscalQuarter(year, quarter)

      // Assert
      expect(constructor).toThrow(/must be a positive integer/)
    })

    it('should throw error when parameter quarterNumber is undefined', () => {
      // Arrange
      const year = 2000
      const quarterNumber = undefined as any

      // Act
      const constructor = () => new FiscalQuarter(year, quarterNumber)

      // Assert
      expect(constructor).toThrow(/must be a valid QuarterNumber/)
    })

    it('should throw error when parameter quarterNumber is out of range', () => {
      // Arrange
      const year = 2000
      const quarterNumber = 22 as QuarterNumber

      // Act
      const constructor = () => new FiscalQuarter(year, quarterNumber)

      // Assert
      expect(constructor).toThrow(/must be a valid QuarterNumber/)
    })
  })
  describe('toString --', () => {
    it('should return friendly string representation when called', () => {
      // Arrange
      const year = 2000
      const quarter = QuarterNumber.Q4
      const fiscalQuarter = new FiscalQuarter(year, quarter)

      // Act
      const result = fiscalQuarter.toString()

      // Assert
      expect(result).toBe(`${quarter}Q${year}`)
    })

    it('should return friendly string representation with a length of 4 characters when year is less than 1000', () => {
      // Arrange
      const year = 515
      const quarter = QuarterNumber.Q4
      const fiscalQuarter = new FiscalQuarter(year, quarter)

      // Act
      const result = fiscalQuarter.toString()

      // Assert
      expect(result).toBe(`${quarter}Q0${year}`)
    })
  })
})
