/** The kind of unit-of-time. */
export enum UnitOfTimeKind {
  /**
   * Invalid kind.
   * @remarks
   * This is required so that there is a default value for the enum.
   */
  Invalid,

  /** Represents a unit of time tied to the (gregorian) calendar. */
  Calendar,

  /** Represents a unit of time in the context of some company's fiscal year. */
  Fiscal,

  /** Represents a generic unit of time, without any context. */
  Generic,
}
