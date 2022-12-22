import { UnitOfTimeGranularity as _UnitOfTimeGranularity } from '../UnitOfTimeGranularity'

export class UnitOfTimeGranularityExtensions {
  /**
   * Determines if a @see UnitOfTimeGranularity  is less granular than another @see UnitOfTimeGranularity .
   * @param granularity1 The first granularity to compare.
   * @param granularity2 The second granularity to compare.
   * @returns
   * true if the first @see UnitOfTimeGranularity  is less granular than the second
   * @see UnitOfTimeGranularity ; false otherwise.
   */
  public static isLessGranularThan(granularity1: _UnitOfTimeGranularity, granularity2: _UnitOfTimeGranularity) {
    const result = !UnitOfTimeGranularityExtensions.isAsGranularOrMoreGranularThan(granularity1, granularity2)

    return result
  }

  /**
   * Determines if a @see UnitOfTimeGranularity  is as granular or less granular than another
   * @see UnitOfTimeGranularity.
   * @param granularity1 The first granularity to compare.
   * @param granularity2 The second granularity to compare.
   * @returns
   * true if the first @see UnitOfTimeGranularity is as granular or less granular than the second
   * @see UnitOfTimeGranularity ; false otherwise.
   */
  public static isAsGranularOrLessGranularThan(granularity1: _UnitOfTimeGranularity,
    granularity2: _UnitOfTimeGranularity,
  ) {
    const result = !UnitOfTimeGranularityExtensions.isMoreGranularThan(granularity1, granularity2)

    return result
  }

  /**
   * Determines if a @see UnitOfTimeGranularity  is more granular than another @see UnitOfTimeGranularity .
   * @param granularity1 The first granularity to compare.
   * @param granularity2 The second granularity to compare.
   * @returns
   * true if the first @see UnitOfTimeGranularity  is more granular than the second
   * @see UnitOfTimeGranularity ; false otherwise.
   */
  public static isMoreGranularThan(granularity1: _UnitOfTimeGranularity, granularity2: _UnitOfTimeGranularity) {
    const granularityScore1 = UnitOfTimeGranularityExtensions.getGranularityScore(granularity1)
    const granularityScore2 = UnitOfTimeGranularityExtensions.getGranularityScore(granularity2)
    const result            = granularityScore1 < granularityScore2

    return result
  }

  /**
   * Determines if a @see UnitOfTimeGranularity  is as granular or more granular than another
   * @see UnitOfTimeGranularity .
   * @param granularity1 The first granularity to compare.
   * @param granularity2 The second granularity to compare.
   * @returns
   * true if the first @see UnitOfTimeGranularity  is as granular or more granular than the second
   * @see UnitOfTimeGranularity ; false otherwise.
   */
  public static isAsGranularOrMoreGranularThan(granularity1: _UnitOfTimeGranularity,
    granularity2: _UnitOfTimeGranularity,
  ) {
    const isMoreGranular = UnitOfTimeGranularityExtensions.isMoreGranularThan(granularity1, granularity2)
    const result         = isMoreGranular || granularity1 === granularity2

    return result
  }

  /**
   * Determines if a specified granularity is the most granular one available.
   * @param granularity The granularity.
   * @returns
   * true if the specified granularity is the most granular one available, false otherwise.
   * @exception ArgumentException @paramref granularity  is @see UnitOfTimeGranularity.Invalid .
   */
  public static isMostGranular(granularity: _UnitOfTimeGranularity) {
    if (granularity === _UnitOfTimeGranularity.Invalid) {
      throw new RangeError('UnitOfTimeGranularity cannot be Invalid')
    }
    const result = granularity === _UnitOfTimeGranularity.Day

    return result
  }

  /**
   * Determines if a specified granularity is the least granular one available.
   * @param granularity The granularity.
   * @returns
   * true if the specified granularity is the least granular one available, false otherwise.
   * @exception ArgumentException @paramref granularity  is @see UnitOfTimeGranularity.Invalid .
   */
  public static isLeastGranular(granularity: _UnitOfTimeGranularity) {
    if (granularity === _UnitOfTimeGranularity.Invalid) {
      throw new RangeError('UnitOfTimeGranularity cannot be Invalid')
    }
    const result = granularity === _UnitOfTimeGranularity.Unbounded

    return result
  }

  /**
   * Gets the granularity that is one notch more granular than the specified granularity.
   * @param granularity The granularity.
   * @returns
   * The granularity that is one notch more granular than the specified granuliarty.
   * @exception ArgumentException @paramref granularity  is @see UnitOfTimeGranularity.Invalid .
   * @exception ArgumentException No granularity is more granular than @paramref granularity .
   */
  public static oneNotchMoreGranular(granularity: _UnitOfTimeGranularity) {
    if (granularity === _UnitOfTimeGranularity.Invalid) {
      throw new RangeError('UnitOfTimeGranularity cannot be Invalid')
    }
    if (UnitOfTimeGranularityExtensions.isMostGranular(granularity)) {
      throw new Error(`No granularity is more granular than ${granularity}.`)
    }

    switch (granularity) {
      case _UnitOfTimeGranularity.Month:
        return _UnitOfTimeGranularity.Day
      case _UnitOfTimeGranularity.Quarter:
        return _UnitOfTimeGranularity.Month
      case _UnitOfTimeGranularity.Year:
        return _UnitOfTimeGranularity.Quarter
      case _UnitOfTimeGranularity.Unbounded:
        return _UnitOfTimeGranularity.Year
      default:
        throw new RangeError('this granularity is not supported: ' + granularity)
    }
  }

  /**
   * Gets the granularity that is one notch less granular than the specified granularity.
   * @param granularity The granularity.
   * @returns
   * The granularity that is one notch less granular than the specified granuliarty.
   * @exception ArgumentException @paramref granularity  is @see UnitOfTimeGranularity.Invalid .
   * @exception ArgumentException No granularity is less granular than @paramref granularity .
   */
  public static oneNotchLessGranular(granularity: _UnitOfTimeGranularity) {
    if (granularity === _UnitOfTimeGranularity.Invalid) {
      throw new RangeError('UnitOfTimeGranularity cannot be Invalid')
    }
    if (UnitOfTimeGranularityExtensions.isLeastGranular(granularity)) {
      throw new Error(`No granularity is less granular than ${granularity}.`)
    }

    switch (granularity) {
      case _UnitOfTimeGranularity.Day:
        return _UnitOfTimeGranularity.Month
      case _UnitOfTimeGranularity.Month:
        return _UnitOfTimeGranularity.Quarter
      case _UnitOfTimeGranularity.Quarter:
        return _UnitOfTimeGranularity.Year
      case _UnitOfTimeGranularity.Year:
        return _UnitOfTimeGranularity.Unbounded
      default:
        throw new RangeError(`this granularity is not supported: ${granularity}`)
    }
  }

  private static getGranularityScore(granularity: _UnitOfTimeGranularity) {
    if (granularity === _UnitOfTimeGranularity.Invalid) {
      throw new RangeError('UnitOfTimeGranularity cannot be Invalid')
    }

    switch (granularity) {
      case _UnitOfTimeGranularity.Day:
        return 1
      case _UnitOfTimeGranularity.Month:
        return 2
      case _UnitOfTimeGranularity.Quarter:
        return 3
      case _UnitOfTimeGranularity.Year:
        return 4
      case _UnitOfTimeGranularity.Unbounded:
        return 5
      default:
        throw new RangeError(`This UnitOfTimeGranularity is not supported: ${granularity}`)
    }
  }
}
