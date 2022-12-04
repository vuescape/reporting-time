/** Represents the start, end, or both, of a reporting period. */
export enum ReportingPeriodComponent {
  /**
   * Invalid reporting period component.
   * @remarks
   * This is required so that there is a default value for the enum.
   */
  Invalid,

  /** The start of a reporting period. */
  Start,

  /** The end of a reporting period. */
  End,

  /** Both the start and the end of a reporting period. */
  Both,
}
