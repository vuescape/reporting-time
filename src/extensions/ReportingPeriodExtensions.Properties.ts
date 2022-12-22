import { ReportingPeriod } from '../ReportingPeriod'
import { UnitOfTime } from '../UnitOfTime'
import { UnitOfTimeGranularity } from '../UnitOfTimeGranularity'
import { UnitOfTimeKind } from '../UnitOfTimeKind'

import './UnitOfTimeExtensions.Math'

declare module '../ReportingPeriod' {
  interface ReportingPeriod {
    /**
     * Gets the granularity of the unit-of-time used in a reporting period.
     * @returns
     * The granularity of the unit-of-time used in the specified reporting period.
     */
    getUnitOfTimeGranularity(): UnitOfTimeGranularity

    /**
     * Gets the kind of the unit-of-time used in a reporting period.
     * @param reportingPeriod The reporting period.
     * @returns
     * The kind of the unit-of-time used in the specified reporting period.
     */
    getUnitOfTimeKind(): UnitOfTimeKind

    /**
     * Gets the distinct @typeparamref T  contained within a specified reporting period.
     * For example, a reporting period of 2Q2017-4Q2017, contains 2Q2017, 3Q2017, and 4Q2017.
     * @remarks
     * The endpoints are considered units within the reporting period.
     * @typeparam T The unit-of-time of the reporting period.
     * @param reportingPeriod The reporting period.
     * @returns
     * The units-of-time contained within the specified reporting period.
     */
    getUnitsWithin(): Array<UnitOfTime>
  }
}

// tslint:disable-next-line: only-arrow-functions
ReportingPeriod.prototype.getUnitOfTimeGranularity = function() {
  if (this.start.unitOfTimeGranularity !== this.end.unitOfTimeGranularity) {
    throw new Error('ReportingPeriod start and end has different granularity')
  }

  const result = this.start.unitOfTimeGranularity
  return result
}

// tslint:disable-next-line: only-arrow-functions
ReportingPeriod.prototype.getUnitOfTimeKind = function() {
  if (this.start.unitOfTimeKind !== this.end.unitOfTimeKind) {
    throw new Error('ReportingPeriod start and end has different unitOfTimeKind')
  }

  const result = this.start.unitOfTimeKind
  return result
}

// tslint:disable-next-line: only-arrow-functions
ReportingPeriod.prototype.getUnitsWithin = function() {
  const allUnits: Array<UnitOfTime> = []
  let currentUnit                   = this.start
  do {
    allUnits.push(currentUnit)
    currentUnit = currentUnit.plus(1)
  } while (currentUnit <= this.end)
  return allUnits
}
