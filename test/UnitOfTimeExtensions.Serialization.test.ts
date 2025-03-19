import expect from 'expect'

import { CalendarDay } from '../src/CalendarDay'
import { CalendarMonth } from '../src/CalendarMonth'
import { CalendarQuarter } from '../src/CalendarQuarter'
import { CalendarYear } from '../src/CalendarYear'
import { DayOfMonth } from '../src/DayOfMonth'
import { FiscalMonth } from '../src/FiscalMonth'
import { FiscalQuarter } from '../src/FiscalQuarter'
import { FiscalUnitOfTime } from '../src/FiscalUnitOfTime'
import { FiscalYear } from '../src/FiscalYear'
import { MonthNumber } from '../src/MonthNumber'
import { QuarterNumber } from '../src/QuarterNumber'
import { UnitOfTime } from '../src/UnitOfTime'
import { UnitOfTimeGranularity } from '../src/UnitOfTimeGranularity'

import '../src/extensions/UnitOfTimeExtensions.Serialization'

describe('UnitOfTimeExtensions.Serialization --', () => {
  describe('round trip UnitOfTime --', () => {
    it('should be serialized/deserialized correctly when UnitOfTime is a CalendarDay', () => {
      // Arrange
      const calendarDay = new CalendarDay(2020, MonthNumber.Nine, DayOfMonth.Sixteen)

      // Act
      const unitOfTime = UnitOfTime.deserializeFromSortableString<CalendarDay>(calendarDay.serializeToSortableString())

      // Assert
      expect(unitOfTime).toBeTruthy()
      expect(unitOfTime.equals(calendarDay)).toBe(true)
    })
    it('should be serialized/deserialized correctly when UnitOfTime is a CalendarMonth', () => {
      // Arrange
      const calendarMonth = new CalendarMonth(2020, MonthNumber.Nine)

      // Act
      const unitOfTime = UnitOfTime.deserializeFromSortableString<CalendarMonth>(calendarMonth.serializeToSortableString())

      // Assert
      expect(unitOfTime).toBeTruthy()
      expect(unitOfTime.equals(calendarMonth)).toBe(true)
    })
    it('should be serialized/deserialized correctly when UnitOfTime is a CalendarQuarter', () => {
      // Arrange
      const calendarQuarter = new CalendarQuarter(2020, QuarterNumber.Q1)

      // Act
      const unitOfTime = UnitOfTime.deserializeFromSortableString<CalendarQuarter>(calendarQuarter.serializeToSortableString())

      // Assert
      expect(unitOfTime).toBeTruthy()
      expect(unitOfTime.equals(calendarQuarter)).toBe(true)
    })
    it('should be serialized/deserialized correctly when UnitOfTime is a CalendarYear', () => {
      // Arrange
      const calendarYear = new CalendarYear(2020)

      // Act
      const unitOfTime = UnitOfTime.deserializeFromSortableString<CalendarYear>(calendarYear.serializeToSortableString())

      // Assert
      expect(unitOfTime).toBeTruthy()
      expect(unitOfTime.equals(calendarYear)).toBe(true)
    })
    it('should be serialized/deserialized correctly when UnitOfTime is a FiscalMonth', () => {
      // Arrange
      const fiscalMonth = new FiscalMonth(2020, MonthNumber.Nine)

      // Act
      const unitOfTime = UnitOfTime.deserializeFromSortableString<FiscalMonth>(fiscalMonth.serializeToSortableString())

      // Assert
      expect(unitOfTime).toBeTruthy()
      expect(unitOfTime.equals(fiscalMonth)).toBe(true)
    })
    it('should be serialized/deserialized correctly when UnitOfTime is a FiscalQuarter', () => {
      // Arrange
      const fiscalQuarter = new FiscalQuarter(2020, QuarterNumber.Q1)

      // Act
      const unitOfTime = UnitOfTime.deserializeFromSortableString<FiscalQuarter>(fiscalQuarter.serializeToSortableString())

      // Assert
      expect(unitOfTime).toBeTruthy()
      expect(unitOfTime.equals(fiscalQuarter)).toBe(true)
    })
    it('should be serialized/deserialized correctly when UnitOfTime is a FiscalYear', () => {
      // Arrange
      const fiscalYear = new FiscalYear(2020)

      // Act
      const unitOfTime = UnitOfTime.deserializeFromSortableString<FiscalYear>(fiscalYear.serializeToSortableString())

      // Assert
      expect(unitOfTime).toBeTruthy()
      expect(unitOfTime.equals(fiscalYear)).toBe(true)
    })
  })
  describe('deserializeFromSortableString --', () => {
    it('should be deserialized correctly when deserializing a CalendarMonth', () => {
      // Arrange
      const year             = 2020
      const monthNumber      = MonthNumber.Nine
      const dayOfMonth       = DayOfMonth.Twelve
      const unitOfTimeString = `c-${year}-0${monthNumber}-${dayOfMonth}`

      // Act
      const unitOfTime = UnitOfTime.deserializeFromSortableString<CalendarDay>(unitOfTimeString)

      // Assert
      expect(unitOfTime).toBeTruthy()
      expect(unitOfTime.year).toBe(year)
      expect(unitOfTime.monthNumber).toBe(monthNumber)
      expect(unitOfTime.dayOfMonth).toBe(dayOfMonth)
    })
    it('should be deserialized correctly when deserializing a CalendarMonth', () => {
      // Arrange
      const year             = 2020
      const monthNumber      = MonthNumber.Nine
      const unitOfTimeString = `c-${year}-0${monthNumber}`

      // Act
      const unitOfTime = UnitOfTime.deserializeFromSortableString<CalendarMonth>(unitOfTimeString)

      // Assert
      expect(unitOfTime).toBeTruthy()
      expect(unitOfTime.year).toBe(year)
      expect(unitOfTime.monthNumber).toBe(monthNumber)
    })
    it('should be deserialized correctly when deserializing a CalendarQuarter', () => {
      // Arrange
      const year             = 2020
      const quarterNumber    = QuarterNumber.Q4
      const unitOfTimeString = `c-${year}-Q${quarterNumber}`

      // Act
      const unitOfTime = UnitOfTime.deserializeFromSortableString<CalendarQuarter>(unitOfTimeString)

      // Assert
      expect(unitOfTime).toBeTruthy()
      expect(unitOfTime.year).toBe(year)
      expect(unitOfTime.quarterNumber).toBe(quarterNumber)
    })
    it('should be deserialized correctly when deserializing a CalendarYear', () => {
      // Arrange
      const year             = 2020
      const unitOfTimeString = `c-${year}`

      // Act
      const unitOfTime = UnitOfTime.deserializeFromSortableString<CalendarYear>(unitOfTimeString)

      // Assert
      expect(unitOfTime).toBeTruthy()
      expect(unitOfTime.year).toBe(year)
    })
    it('should be deserialized correctly when deserializing a FiscalMonth', () => {
      // Arrange
      const year             = 2020
      const monthNumber      = MonthNumber.Nine
      const unitOfTimeString = `f-${year}-0${monthNumber}`

      // Act
      const unitOfTime = UnitOfTime.deserializeFromSortableString<FiscalMonth>(unitOfTimeString)

      // Assert
      expect(unitOfTime).toBeTruthy()
      expect(unitOfTime.year).toBe(year)
      expect(unitOfTime.monthNumber).toBe(monthNumber)
    })
    it('should be deserialized correctly when deserializing a FiscalQuarter', () => {
      // Arrange
      const year             = 2020
      const quarterNumber    = QuarterNumber.Q4
      const unitOfTimeString = `f-${year}-Q${quarterNumber}`

      // Act
      const unitOfTime = UnitOfTime.deserializeFromSortableString<FiscalQuarter>(unitOfTimeString)

      // Assert
      expect(unitOfTime).toBeTruthy()
      expect(unitOfTime.year).toBe(year)
      expect(unitOfTime.quarterNumber).toBe(quarterNumber)
    })
    it('should be deserialized correctly when deserializing a FiscalYear', () => {
      // Arrange
      const year             = 2020
      const unitOfTimeString = `f-${year}`

      // Act
      const unitOfTime = UnitOfTime.deserializeFromSortableString<FiscalYear>(unitOfTimeString)

      // Assert
      expect(unitOfTime).toBeTruthy()
      expect(unitOfTime.year).toBe(year)
    })
  })
  describe('serializeToSortableString --', () => {
    it('should be serialized correctly when serializing a CalendarDay', () => {
      // Arrange
      const year        = 2020
      const monthNumber = MonthNumber.Five
      const dayOfMonth  = DayOfMonth.TwentyThree
      const unitOfTime  = new CalendarDay(year, monthNumber, dayOfMonth)

      // Act
      const serializedString = unitOfTime.serializeToSortableString()

      // Assert
      expect(serializedString).toBe(`c-${year}-0${monthNumber}-${dayOfMonth}`)
    })
    it('should be serialized correctly when serializing a CalendarMonth', () => {
      // Arrange
      const year        = 2020
      const monthNumber = MonthNumber.Five
      const unitOfTime  = new CalendarMonth(year, monthNumber)

      // Act
      const serializedString = unitOfTime.serializeToSortableString()

      // Assert
      expect(serializedString).toBe(`c-${year}-0${monthNumber}`)
    })
    it('should be serialized correctly when serializing a CalendarQuarter', () => {
      // Arrange
      const year          = 2020
      const quarterNumber = QuarterNumber.Q2
      const unitOfTime    = new CalendarQuarter(year, quarterNumber)

      // Act
      const serializedString = unitOfTime.serializeToSortableString()

      // Assert
      expect(serializedString).toBe(`c-${year}-Q${quarterNumber}`)
    })
    it('should be serialized correctly when serializing a CalendarYear', () => {
      // Arrange
      const year       = 2020
      const unitOfTime = new CalendarYear(year)

      // Act
      const serializedString = unitOfTime.serializeToSortableString()

      // Assert
      expect(serializedString).toBe(`c-${year}`)
    })
    it('should be serialized correctly when serializing a FiscalMonth', () => {
      // Arrange
      const year        = 2020
      const monthNumber = MonthNumber.Five
      const unitOfTime  = new FiscalMonth(year, monthNumber)

      // Act
      const serializedString = unitOfTime.serializeToSortableString()

      // Assert
      expect(serializedString).toBe(`f-${year}-0${monthNumber}`)
    })
    it('should be serialized correctly when serializing a FiscalQuarter', () => {
      // Arrange
      const year          = 2020
      const quarterNumber = QuarterNumber.Q2
      const unitOfTime    = new FiscalQuarter(year, quarterNumber)

      // Act
      const serializedString = unitOfTime.serializeToSortableString()

      // Assert
      expect(serializedString).toBe(`f-${year}-Q${quarterNumber}`)
    })
    it('should be serialized correctly when serializing a FiscalYear', () => {
      // Arrange
      const year       = 2020
      const unitOfTime = new FiscalYear(year)

      // Act
      const serializedString = unitOfTime.serializeToSortableString()

      // Assert
      expect(serializedString).toBe(`f-${year}`)
    })
    it('should throw an error when object is undefined', () => {
      // Arrange
      const unitOfTime = (undefined as unknown) as FiscalYear

      // Act
      const serializeToSortableString = () => unitOfTime.serializeToSortableString()

      // Assert
      expect(serializeToSortableString).toThrow(/Cannot read propert.*of undefined/)
    })
    it('should throw an error when object is not a UnitOfTime', () => {
      // Arrange
      const unitOfTime = {} as FiscalMonth

      // Act
      const serializeToSortableString = () => unitOfTime.serializeToSortableString()

      // Assert
      expect(serializeToSortableString).toThrow(/unitOfTime.serializeToSortableString is not a function/)
    })
    it('should throw an error when object is not a supported UnitOfTime', () => {
      // Arrange
      class InvalidUnitOfTime extends FiscalUnitOfTime {
        constructor() {
          super()
        }

        public equals(value: UnitOfTime): boolean {
          throw new Error('Method not implemented.')
        }

        public get unitOfTimeGranularity(): UnitOfTimeGranularity {
          throw new Error('Method not implemented.')
        }

        public valueOf(): number {
          throw new Error('Method not implemented.')
        }

        public toString(): string {
          throw new Error('Method not implemented.')
        }
      }

      const invalidUnitOfTime = new InvalidUnitOfTime()

      // Act
      const serializeToSortableString = () => invalidUnitOfTime.serializeToSortableString()

      // Assert
      expect(serializeToSortableString).toThrow(/this type of unit-of-time is not supported: /)
    })
  })
})
