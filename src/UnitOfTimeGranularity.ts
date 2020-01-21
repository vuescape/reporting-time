/** The granularity of a unit-of-time. */
export enum UnitOfTimeGranularity {
  /**
   * Invalid granularity.
   * @remarks
   * This is required so that there is a default value for the enum.
   */
  Invalid,

  /** Day-level granularity. */
  Day,

  /** Month-level granularity. */
  Month,

  /** Quarter-level granularity. */
  Quarter,

  /** Year-level granularity. */
  Year,

  /** Unbounded granularity. */
  Unbounded,
}
