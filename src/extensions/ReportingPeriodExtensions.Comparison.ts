// import { ReportingPeriod } from '../ReportingPeriod'
// import { UnitOfTime } from '../UnitOfTime'
// import { UnitOfTimeGranularity } from '../UnitOfTimeGranularity'

// import './ReportingPeriodExtensions.Manipulation'
// import './UnitOfTimeExtensions.Math'

// declare module '../ReportingPeriod' {
//   interface ReportingPeriod {
//     /**
//      * Determines if a unit-of-time is contained within a reporting period.
//      * For example, 2Q2017 is contained within a reporting period of 1Q2017-4Q2017.
//      * @remarks
//      * If the unit-of-time is equal to one of the endpoints of the reporting period,
//      * that unit-of-time is considered to be within the reporting period.
//      * @param unitOfTime The unit-of-time to check against a reporting period.
//      * @returns
//      * true if the unit-of-time is contained within the reporting period; false otherwise.
//      */
//     contains(unitOfTimeOrReportingPeriod: UnitOfTime | ReportingPeriod): boolean

//     /**
//      * Determines if two objects of type @see IReportingPeriod{T} , overlap.
//      * For example, the following reporting periods have an overlap: 1Q2017-3Q2017 and 3Q2017-4Q2017.
//      * @remarks
//      * If the endpoint of one reporting period is the same as the endpoint
//      * of the second reporting period, the reporting periods are deemed to overlap.
//      * @param reportingPeriod A  reporting period to check for overlap against the first reporting period.
//      * @returns
//      * true if there is an overlap between the reporting periods; false otherwise.
//      */
//     hasOverlapWith(reportingPeriod: ReportingPeriod): boolean

//     /**
//      * Determines if a reporting period is greater than and adjacent to a second reporting period.
//      * @remarks
//      * For this method to return true, the first reporting period's Start must be greater than the
//      * second reporting period's End, and they must be adjacent (subtracting one unit in the same granularity
//      * to the first reporting period's Start should make it equal to the second reporting period's End)
//      * For example, 3Q2017-4Q2017 is greater than and adjacent to 1Q2017-2Q2017.
//      * For example, 3Q2017-4Q2017 is NOT greater than 1Q2017-3Q2017, because they overlap.
//      * For example, 4Q2017-4Q2017 is NOT adjacent to 1Q2017-2Q2017, because there's a gap of 3Q2017.
//      * @param reportingPeriod2 The reporting period.
//      * @returns
//      * true if the first reporting period is greater than and adjacent to the second reporting period; false, otherwise.
//      */
//     isGreaterThanAndAdjacentTo(reportingPeriod: ReportingPeriod): boolean
//   }
// }

// // tslint:disable-next-line: only-arrow-functions
// ReportingPeriod.prototype.contains = function(unitOfTimeOrReportingPeriod: UnitOfTime | ReportingPeriod): boolean {
//   if (!unitOfTimeOrReportingPeriod) {
//     throw new Error('unitOfTimeOrReportingPeriod must not be undefined.')
//   }

//   let reportingPeriod1 = this
//   let reportingPeriod2 = unitOfTimeOrReportingPeriod as ReportingPeriod
//   if (unitOfTimeOrReportingPeriod instanceof UnitOfTime) {
//     reportingPeriod2 = new ReportingPeriod(unitOfTimeOrReportingPeriod, unitOfTimeOrReportingPeriod)
//   } else if (!(unitOfTimeOrReportingPeriod instanceof ReportingPeriod)) {
//     throw new TypeError('unitOfTimeOrReportingPeriod must be an instance of UnitOfTime or ReportingPeriod.')
//   }

//   if (reportingPeriod1.getUnitOfTimeKind() !== reportingPeriod2.getUnitOfTimeKind()) {
//     throw new Error(
//       'reportingPeriod1 cannot be compared against reportingPeriod2 because they represent different UnitOfTimeKind',
//     )
//   }

//   reportingPeriod1 = reportingPeriod1.toMostGranular()
//   reportingPeriod2 = reportingPeriod2.toMostGranular()

//   let startIsContained = false
//   if (reportingPeriod1.start.unitOfTimeGranularity === UnitOfTimeGranularity.Unbounded) {
//     startIsContained = true
//   } else {
//     if (reportingPeriod2.start.unitOfTimeGranularity === UnitOfTimeGranularity.Unbounded) {
//       startIsContained = false
//     } else {
//       // startIsContained = reportingPeriod1.start.compareTo(reportingPeriod2.start) <= 0;
//       startIsContained = reportingPeriod1.start < reportingPeriod2.start
//     }
//   }

//   let endIsContained = false
//   if (reportingPeriod1.end.unitOfTimeGranularity === UnitOfTimeGranularity.Unbounded) {
//     endIsContained = true
//   } else {
//     if (reportingPeriod2.end.unitOfTimeGranularity === UnitOfTimeGranularity.Unbounded) {
//       endIsContained = false
//     } else {
//       // endIsContained = reportingPeriod1.end.CompareTo(reportingPeriod2.End) >= 0;
//       endIsContained = reportingPeriod1.end < reportingPeriod2.end
//     }
//   }

//   const result = startIsContained && endIsContained
//   return result
// }

// // tslint:disable-next-line: only-arrow-functions
// ReportingPeriod.prototype.hasOverlapWith = function(reportingPeriod: ReportingPeriod): boolean {
//   if (!reportingPeriod) {
//     throw new Error('reportingPeriod must not be undefined.')
//   }
//   const reportingPeriod1 = this
//   const reportingPeriod2 = reportingPeriod

//   if (reportingPeriod1.getUnitOfTimeKind() !== reportingPeriod2.getUnitOfTimeKind()) {
//     throw new Error(
//       'reportingPeriod1 cannot be compared against reportingPeriod2 because they represent different UnitOfTimeKind.',
//     )
//   }

//   const result =
//     reportingPeriod1.contains(reportingPeriod2.start) ||
//     reportingPeriod1.contains(reportingPeriod2.end) ||
//     reportingPeriod2.contains(reportingPeriod1.start) ||
//     reportingPeriod2.contains(reportingPeriod1.end)

//   return result
// }

// // tslint:disable-next-line: only-arrow-functions
// ReportingPeriod.prototype.isGreaterThanAndAdjacentTo = function(reportingPeriod: ReportingPeriod): boolean {
//   if (!reportingPeriod) {
//     throw new Error('reportingPeriod must not be undefined.')
//   }

//   const reportingPeriod1 = this
//   const reportingPeriod2 = reportingPeriod

//   if (reportingPeriod1.getUnitOfTimeKind() !== reportingPeriod2.getUnitOfTimeKind()) {
//     throw new Error(
//       'reportingPeriod1 cannot be compared against reportingPeriod2 because they represent different UnitOfTimeKind.',
//     )
//   }

//   const mostGranularReportingPeriod1 = reportingPeriod1.toMostGranular()
//   const mostGranularReportingPeriod2 = reportingPeriod2.toMostGranular()

//   const result = mostGranularReportingPeriod1.start.plus(-1).equals(mostGranularReportingPeriod2.end)
//   return result
// }
