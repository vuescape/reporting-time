import expect from 'expect'

import { UnitOfTimeGranularity } from '../src/UnitOfTimeGranularity'

import { UnitOfTimeGranularityExtensions } from '../src/extensions/UnitOfTimeGranularityExtensions'

describe('UnitOfTimeGranularityExtensions --', () => {
  describe('isLessGranularThan --', () => {
    it('should be true when granularity1 is Quarter than granularity2 is Month', () => {
      // Arrange
      const granularity1 = UnitOfTimeGranularity.Quarter
      const granularity2 = UnitOfTimeGranularity.Month

      // Act
      const isLessGranular = UnitOfTimeGranularityExtensions.isLessGranularThan(granularity1, granularity2)

      // Assert
      expect(isLessGranular).toBe(true)
    })
    it('should be true when granularity1 is Year than granularity2 is Quarter', () => {
      // Arrange
      const granularity1 = UnitOfTimeGranularity.Year
      const granularity2 = UnitOfTimeGranularity.Quarter

      // Act
      const isLessGranular = UnitOfTimeGranularityExtensions.isLessGranularThan(granularity1, granularity2)

      // Assert
      expect(isLessGranular).toBe(true)
    })
    it('should be false when granularity1 is Month than granularity2 is Quarter', () => {
      // Arrange
      const granularity1 = UnitOfTimeGranularity.Month
      const granularity2 = UnitOfTimeGranularity.Quarter

      // Act
      const isLessGranular = UnitOfTimeGranularityExtensions.isLessGranularThan(granularity1, granularity2)

      // Assert
      expect(isLessGranular).toBe(false)
    })
    it('should be false when granularity1 is Quarter than granularity2 is Year', () => {
      // Arrange
      const granularity1 = UnitOfTimeGranularity.Quarter
      const granularity2 = UnitOfTimeGranularity.Year

      // Act
      const isLessGranular = UnitOfTimeGranularityExtensions.isLessGranularThan(granularity1, granularity2)

      // Assert
      expect(isLessGranular).toBe(false)
    })
    it('should be false when granularity1 equals granularity2', () => {
      // Arrange
      const granularity1 = UnitOfTimeGranularity.Quarter
      const granularity2 = UnitOfTimeGranularity.Quarter

      // Act
      const isLessGranular = UnitOfTimeGranularityExtensions.isLessGranularThan(granularity1, granularity2)

      // Assert
      expect(isLessGranular).toBe(false)
    })
  })
  describe('isAsGranularOrLessGranularThan --', () => {
    it('should be true when granularity1 is Quarter than granularity2 is Month', () => {
      // Arrange
      const granularity1 = UnitOfTimeGranularity.Quarter
      const granularity2 = UnitOfTimeGranularity.Month

      // Act
      const isAsGranularOrLessGranularThan = UnitOfTimeGranularityExtensions.isAsGranularOrLessGranularThan(granularity1,
        granularity2,
      )

      // Assert
      expect(isAsGranularOrLessGranularThan).toBe(true)
    })
    it('should be true when granularity1 is Year than granularity2 is Quarter', () => {
      // Arrange
      const granularity1 = UnitOfTimeGranularity.Year
      const granularity2 = UnitOfTimeGranularity.Quarter

      // Act
      const isAsGranularOrLessGranularThan = UnitOfTimeGranularityExtensions.isAsGranularOrLessGranularThan(granularity1,
        granularity2,
      )

      // Assert
      expect(isAsGranularOrLessGranularThan).toBe(true)
    })
    it('should be false when granularity1 is Month than granularity2 is Quarter', () => {
      // Arrange
      const granularity1 = UnitOfTimeGranularity.Month
      const granularity2 = UnitOfTimeGranularity.Quarter

      // Act
      const isAsGranularOrLessGranularThan = UnitOfTimeGranularityExtensions.isAsGranularOrLessGranularThan(granularity1,
        granularity2,
      )

      // Assert
      expect(isAsGranularOrLessGranularThan).toBe(false)
    })
    it('should be false when granularity1 is Quarter than granularity2 is Year', () => {
      // Arrange
      const granularity1 = UnitOfTimeGranularity.Quarter
      const granularity2 = UnitOfTimeGranularity.Year

      // Act
      const isAsGranularOrLessGranularThan = UnitOfTimeGranularityExtensions.isAsGranularOrLessGranularThan(granularity1,
        granularity2,
      )

      // Assert
      expect(isAsGranularOrLessGranularThan).toBe(false)
    })
    it('should be true when granularity1 equals granularity2', () => {
      // Arrange
      const granularity1 = UnitOfTimeGranularity.Quarter
      const granularity2 = UnitOfTimeGranularity.Quarter

      // Act
      const isAsGranularOrLessGranularThan = UnitOfTimeGranularityExtensions.isAsGranularOrLessGranularThan(granularity1,
        granularity2,
      )

      // Assert
      expect(isAsGranularOrLessGranularThan).toBe(true)
    })
  })
  describe('isMoreGranularThan --', () => {
    it('should be false when granularity1 is Quarter than granularity2 is Month', () => {
      // Arrange
      const granularity1 = UnitOfTimeGranularity.Quarter
      const granularity2 = UnitOfTimeGranularity.Month

      // Act
      const isMoreGranularThan = UnitOfTimeGranularityExtensions.isMoreGranularThan(granularity1, granularity2)

      // Assert
      expect(isMoreGranularThan).toBe(false)
    })
    it('should be false when granularity1 is Year than granularity2 is Quarter', () => {
      // Arrange
      const granularity1 = UnitOfTimeGranularity.Year
      const granularity2 = UnitOfTimeGranularity.Quarter

      // Act
      const isMoreGranularThan = UnitOfTimeGranularityExtensions.isMoreGranularThan(granularity1, granularity2)

      // Assert
      expect(isMoreGranularThan).toBe(false)
    })
    it('should be true when granularity1 is Month than granularity2 is Quarter', () => {
      // Arrange
      const granularity1 = UnitOfTimeGranularity.Month
      const granularity2 = UnitOfTimeGranularity.Quarter

      // Act
      const isMoreGranularThan = UnitOfTimeGranularityExtensions.isMoreGranularThan(granularity1, granularity2)

      // Assert
      expect(isMoreGranularThan).toBe(true)
    })
    it('should be true when granularity1 is Quarter than granularity2 is Year', () => {
      // Arrange
      const granularity1 = UnitOfTimeGranularity.Quarter
      const granularity2 = UnitOfTimeGranularity.Year

      // Act
      const isMoreGranularThan = UnitOfTimeGranularityExtensions.isMoreGranularThan(granularity1, granularity2)

      // Assert
      expect(isMoreGranularThan).toBe(true)
    })
    it('should be false when granularity1 equals granularity2', () => {
      // Arrange
      const granularity1 = UnitOfTimeGranularity.Quarter
      const granularity2 = UnitOfTimeGranularity.Quarter

      // Act
      const isMoreGranularThan = UnitOfTimeGranularityExtensions.isMoreGranularThan(granularity1, granularity2)

      // Assert
      expect(isMoreGranularThan).toBe(false)
    })
  })
  describe('isAsGranularOrMoreGranularThan --', () => {
    it('should be false when granularity1 is Quarter than granularity2 is Month', () => {
      // Arrange
      const granularity1 = UnitOfTimeGranularity.Quarter
      const granularity2 = UnitOfTimeGranularity.Month

      // Act
      const isAsGranularOrMoreGranularThan = UnitOfTimeGranularityExtensions.isAsGranularOrMoreGranularThan(granularity1,
        granularity2,
      )

      // Assert
      expect(isAsGranularOrMoreGranularThan).toBe(false)
    })
    it('should be false when granularity1 is Year than granularity2 is Quarter', () => {
      // Arrange
      const granularity1 = UnitOfTimeGranularity.Year
      const granularity2 = UnitOfTimeGranularity.Quarter

      // Act
      const isAsGranularOrMoreGranularThan = UnitOfTimeGranularityExtensions.isAsGranularOrMoreGranularThan(granularity1,
        granularity2,
      )

      // Assert
      expect(isAsGranularOrMoreGranularThan).toBe(false)
    })
    it('should be true when granularity1 is Month than granularity2 is Quarter', () => {
      // Arrange
      const granularity1 = UnitOfTimeGranularity.Month
      const granularity2 = UnitOfTimeGranularity.Quarter

      // Act
      const isAsGranularOrMoreGranularThan = UnitOfTimeGranularityExtensions.isAsGranularOrMoreGranularThan(granularity1,
        granularity2,
      )

      // Assert
      expect(isAsGranularOrMoreGranularThan).toBe(true)
    })
    it('should be true when granularity1 is Quarter than granularity2 is Year', () => {
      // Arrange
      const granularity1 = UnitOfTimeGranularity.Quarter
      const granularity2 = UnitOfTimeGranularity.Year

      // Act
      const isAsGranularOrMoreGranularThan = UnitOfTimeGranularityExtensions.isAsGranularOrMoreGranularThan(granularity1,
        granularity2,
      )

      // Assert
      expect(isAsGranularOrMoreGranularThan).toBe(true)
    })
    it('should be true when granularity1 equals granularity2', () => {
      // Arrange
      const granularity1 = UnitOfTimeGranularity.Quarter
      const granularity2 = UnitOfTimeGranularity.Quarter

      // Act
      const isAsGranularOrMoreGranularThan = UnitOfTimeGranularityExtensions.isAsGranularOrMoreGranularThan(granularity1,
        granularity2,
      )

      // Assert
      expect(isAsGranularOrMoreGranularThan).toBe(true)
    })
  })
  describe('isMostGranular --', () => {
    it('should be true when granularity is Day', () => {
      // Arrange
      const granularity = UnitOfTimeGranularity.Day

      // Act
      const isMostGranular = UnitOfTimeGranularityExtensions.isMostGranular(granularity)

      // Assert
      expect(isMostGranular).toBe(true)
    })
    it('should be false when granularity is Month', () => {
      // Arrange
      const granularity = UnitOfTimeGranularity.Month

      // Act
      const isMostGranular = UnitOfTimeGranularityExtensions.isMostGranular(granularity)

      // Assert
      expect(isMostGranular).toBe(false)
    })
    it('should be false when granularity is Quarter', () => {
      // Arrange
      const granularity = UnitOfTimeGranularity.Quarter

      // Act
      const isMostGranular = UnitOfTimeGranularityExtensions.isMostGranular(granularity)

      // Assert
      expect(isMostGranular).toBe(false)
    })
    it('should be false when granularity is Year', () => {
      // Arrange
      const granularity = UnitOfTimeGranularity.Year

      // Act
      const isMostGranular = UnitOfTimeGranularityExtensions.isMostGranular(granularity)

      // Assert
      expect(isMostGranular).toBe(false)
    })
    it('should throw an error when granularity is Invalid', () => {
      // Arrange
      const granularity = UnitOfTimeGranularity.Invalid

      // Act
      const isMostGranular = () => UnitOfTimeGranularityExtensions.isMostGranular(granularity)

      // Assert
      expect(isMostGranular).toThrow(/UnitOfTimeGranularity cannot be Invalid/)
    })
  })
  describe('isLeastGranular --', () => {
    it('should be true when granularity is Unbounded', () => {
      // Arrange
      const granularity = UnitOfTimeGranularity.Unbounded

      // Act
      const isLeastGranular = UnitOfTimeGranularityExtensions.isLeastGranular(granularity)

      // Assert
      expect(isLeastGranular).toBe(true)
    })
    it('should be false when granularity is Month', () => {
      // Arrange
      const granularity = UnitOfTimeGranularity.Month

      // Act
      const isLeastGranular = UnitOfTimeGranularityExtensions.isLeastGranular(granularity)

      // Assert
      expect(isLeastGranular).toBe(false)
    })
    it('should be false when granularity is Quarter', () => {
      // Arrange
      const granularity = UnitOfTimeGranularity.Quarter

      // Act
      const isLeastGranular = UnitOfTimeGranularityExtensions.isLeastGranular(granularity)

      // Assert
      expect(isLeastGranular).toBe(false)
    })
    it('should be false when granularity is Year', () => {
      // Arrange
      const granularity = UnitOfTimeGranularity.Year

      // Act
      const isLeastGranular = UnitOfTimeGranularityExtensions.isLeastGranular(granularity)

      // Assert
      expect(isLeastGranular).toBe(false)
    })
    it('should throw an error when granularity is Invalid', () => {
      // Arrange
      const granularity = UnitOfTimeGranularity.Invalid

      // Act
      const isLeastGranular = () => UnitOfTimeGranularityExtensions.isLeastGranular(granularity)

      // Assert
      expect(isLeastGranular).toThrow(/UnitOfTimeGranularity cannot be Invalid/)
    })
  })
  describe('oneNotchMoreGranular --', () => {
    it('should be Year when granularity is Unbounded', () => {
      // Arrange
      const granularity = UnitOfTimeGranularity.Unbounded

      // Act
      const oneNotchMoreGranular = UnitOfTimeGranularityExtensions.oneNotchMoreGranular(granularity)

      // Assert
      expect(oneNotchMoreGranular).toBe(UnitOfTimeGranularity.Year)
    })
    it('should be Quarter when granularity is Year', () => {
      // Arrange
      const granularity = UnitOfTimeGranularity.Year

      // Act
      const oneNotchMoreGranular = UnitOfTimeGranularityExtensions.oneNotchMoreGranular(granularity)

      // Assert
      expect(oneNotchMoreGranular).toBe(UnitOfTimeGranularity.Quarter)
    })
    it('should be Month when granularity is Quarter', () => {
      // Arrange
      const granularity = UnitOfTimeGranularity.Quarter

      // Act
      const oneNotchMoreGranular = UnitOfTimeGranularityExtensions.oneNotchMoreGranular(granularity)

      // Assert
      expect(oneNotchMoreGranular).toBe(UnitOfTimeGranularity.Month)
    })
    it('should be Day when granularity is Month', () => {
      // Arrange
      const granularity = UnitOfTimeGranularity.Month

      // Act
      const oneNotchMoreGranular = UnitOfTimeGranularityExtensions.oneNotchMoreGranular(granularity)

      // Assert
      expect(oneNotchMoreGranular).toBe(UnitOfTimeGranularity.Day)
    })
    it('should throw an error when granularity is Invalid', () => {
      // Arrange
      const granularity = UnitOfTimeGranularity.Invalid

      // Act
      const oneNotchMoreGranular = () => UnitOfTimeGranularityExtensions.oneNotchMoreGranular(granularity)

      // Assert
      expect(oneNotchMoreGranular).toThrow(/UnitOfTimeGranularity cannot be Invalid/)
    })
    it('should throw an error when granularity isMostGranular', () => {
      // Arrange
      const granularity = UnitOfTimeGranularity.Day

      // Act
      const oneNotchMoreGranular = () => UnitOfTimeGranularityExtensions.oneNotchMoreGranular(granularity)

      // Assert
      expect(oneNotchMoreGranular).toThrow(/No granularity is more granular than/)
    })
  })
  describe('oneNotchLessGranular --', () => {
    it('should be Month when granularity is Day', () => {
      // Arrange
      const granularity = UnitOfTimeGranularity.Day

      // Act
      const oneNotchLessGranular = UnitOfTimeGranularityExtensions.oneNotchLessGranular(granularity)

      // Assert
      expect(oneNotchLessGranular).toBe(UnitOfTimeGranularity.Month)
    })
    it('should be Quarter when granularity is Month', () => {
      // Arrange
      const granularity = UnitOfTimeGranularity.Month

      // Act
      const oneNotchLessGranular = UnitOfTimeGranularityExtensions.oneNotchLessGranular(granularity)

      // Assert
      expect(oneNotchLessGranular).toBe(UnitOfTimeGranularity.Quarter)
    })
    it('should be Year when granularity is Quarter', () => {
      // Arrange
      const granularity = UnitOfTimeGranularity.Quarter

      // Act
      const oneNotchLessGranular = UnitOfTimeGranularityExtensions.oneNotchLessGranular(granularity)

      // Assert
      expect(oneNotchLessGranular).toBe(UnitOfTimeGranularity.Year)
    })
    it('should be Unbounded when granularity is Year', () => {
      // Arrange
      const granularity = UnitOfTimeGranularity.Year

      // Act
      const oneNotchLessGranular = UnitOfTimeGranularityExtensions.oneNotchLessGranular(granularity)

      // Assert
      expect(oneNotchLessGranular).toBe(UnitOfTimeGranularity.Unbounded)
    })
    it('should throw an error when granularity is Invalid', () => {
      // Arrange
      const granularity = UnitOfTimeGranularity.Invalid

      // Act
      const oneNotchLessGranular = () => UnitOfTimeGranularityExtensions.oneNotchLessGranular(granularity)

      // Assert
      expect(oneNotchLessGranular).toThrow(/UnitOfTimeGranularity cannot be Invalid/)
    })
    it('should throw an error when granularity isMostGranular', () => {
      // Arrange
      const granularity = UnitOfTimeGranularity.Unbounded

      // Act
      const oneNotchLessGranular = () => UnitOfTimeGranularityExtensions.oneNotchLessGranular(granularity)

      // Assert
      expect(oneNotchLessGranular).toThrow(/No granularity is less granular than/)
    })
  })
})
