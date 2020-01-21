import { ReportingPeriod } from '../ReportingPeriod'
import { UnitOfTime } from '../UnitOfTime'

import './UnitOfTimeExtensions.Serialization'

declare module '../ReportingPeriod' {
  interface ReportingPeriod {
    /**
     * Serializes a @see ReportingPeriod to a string.
     * @param reportingPeriod The reporting period to serialize.
     * @returns
     * Gets a string representation of a reporting period that can be deserialized
     * into the same reporting period.
     */
    serializeToString(): string
  }

  namespace ReportingPeriod {
    /**
     * Deserializes an @see ReportingPeriod from a string.
     * @param reportingPeriod The serialized reporting period string to deserialize.
     * @returns
     * Gets a reporting period deserialized from it's string representation.
     */
    export function deserializeFromString(reportingPeriod: string): ReportingPeriod
  }
}

// tslint:disable-next-line: only-arrow-functions
ReportingPeriod.prototype.serializeToString = function() {
  const result = `${this.start.serializeToSortableString()},${this.end.serializeToSortableString()}`
  return result
}

ReportingPeriod.deserializeFromString = (reportingPeriod: string): ReportingPeriod => {
  if (isNullOrWhiteSpace(reportingPeriod)) {
    throw new RangeError('reportingPeriod must not be undefined, null, empty string, or whitespace.')
  }

  const tokens = reportingPeriod.split(',')
  if (tokens.length !== 2 || tokens.find(_ => isNullOrWhiteSpace(_))) {
    throw new Error(
      // tslint:disable-next-line: max-line-length
      `Could not deserialize reportingPeriod string, '${reportingPeriod}'. It appears to be malformed: start and end are not provided.`,
    )
  }

  const start = UnitOfTime.deserializeFromSortableString(tokens[0])
  const end = UnitOfTime.deserializeFromSortableString(tokens[1])

  const result = new ReportingPeriod(start, end)
  return result
}

const isNullOrWhiteSpace = (val: string) => {
  return !val || !val.trim().length
}
