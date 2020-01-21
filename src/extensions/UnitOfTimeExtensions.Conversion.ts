// import { CalendarMonth } from '../CalendarMonth'
// import { CalendarQuarter } from '../CalendarQuarter'
// import { CalendarYear } from '../CalendarYear'
// import { FiscalMonth } from '../FiscalMonth'
// import { FiscalQuarter } from '../FiscalQuarter'
// import { FiscalYear } from '../FiscalYear'
// import { GenericMonth } from '../GenericMonth'
// import { GenericQuarter } from '../GenericQuarter'
// import { GenericYear } from '../GenericYear'
// import { IHaveAMonth } from '../IHaveAMonth'
// import { IHaveAQuarter } from '../IHaveAQuarter'
// import { IHaveAYear } from '../IHaveAYear'
// import { MonthNumber } from '../MonthNumber'
// import { QuarterNumber } from '../QuarterNumber'
// import { UnitOfTime } from '../UnitOfTime'
// import { ReportingPeriod } from '../ReportingPeriod'

// declare module '../FiscalQuarter' {
//   interface FiscalQuarter {
//     ToCalendarQuarter(calendarQuarterThatIsFirstFiscalQuarter: QuarterNumber): CalendarQuarter
//   }
// }

// declare module '../CalendarQuarter' {
//   interface CalendarQuarter {
//     ToFiscalQuarter(calendarQuarterThatIsFirstFiscalQuarter: QuarterNumber): CalendarQuarter
//   }
// }

// declare module '../IHaveAMonth' {
//   // tslint:disable-next-line: interface-name
//   interface IHaveAMonth {
//     ToGenericMonth(month: IHaveAMonth): GenericMonth
//   }
// }

// declare module '../IHaveAQuarter' {
//   // tslint:disable-next-line: interface-name
//   interface IHaveAQuarter {
//     ToGenericQuarter(month: IHaveAQuarter): GenericQuarter
//   }
// }

// declare module '../IHaveAYear' {
//   // tslint:disable-next-line: interface-name
//   interface IHaveAYear {
//     ToGenericYear(month: IHaveAYear): GenericYear
//   }
// }

// declare module '../UnitOfTime' {
//   interface UnitOfTime {
//     ToMostGranular(unitOfTime: UnitOfTime): ReportingPeriod
//     ToReportingPeriod(unitOfTime: UnitOfTime): ReportingPeriod
//   }
// }

// // tslint:disable-next-line: only-arrow-functions
// // UnitOfTime.prototype.serializeToSortableString = function() {}
