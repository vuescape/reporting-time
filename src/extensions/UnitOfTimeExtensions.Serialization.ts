import { CalendarMonth } from '../CalendarMonth'
import { CalendarQuarter } from '../CalendarQuarter'
import { CalendarYear } from '../CalendarYear'
import { FiscalMonth } from '../FiscalMonth'
import { FiscalQuarter } from '../FiscalQuarter'
import { FiscalYear } from '../FiscalYear'
import { MonthNumber } from '../MonthNumber'
import { QuarterNumber } from '../QuarterNumber'
import { UnitOfTime } from '../UnitOfTime'

declare module '../UnitOfTime' {
  interface UnitOfTime {
    serializeToSortableString(): string
  }

  namespace UnitOfTime {
    export function deserializeFromSortableString<T extends UnitOfTime>(unitOfTime: string): T
  }
}

class SerializationFormat {
  public typeName: string

  public regex: RegExp

  constructor(typeName: string, regex: RegExp) {
    this.typeName = typeName
    this.regex = regex
  }
}

const SerializationFormatByType: Array<SerializationFormat> = [
  new SerializationFormat(CalendarMonth.name, new RegExp('^c-(\\d{4})-(\\d{2})$')),
  new SerializationFormat(CalendarQuarter.name, new RegExp('^c-(\\d{4})-Q(\\d)$')),
  new SerializationFormat(CalendarYear.name, new RegExp('^c-(\\d{4})$')),
  new SerializationFormat(FiscalMonth.name, new RegExp('^f-(\\d{4})-(\\d{2})$')),
  new SerializationFormat(FiscalQuarter.name, new RegExp('^f-(\\d{4})-Q(\\d)$')),
  new SerializationFormat(FiscalYear.name, new RegExp('^f-(\\d{4})$')),
]

function parseIntOrThrow(token: string, errorMessage: string) {
  if (/^[-+]?(\d+|Infinity)$/.test(token)) {
    return Number(token)
  } else {
    throw new RangeError(errorMessage)
  }
}

const isValidEnumValue = <T>(e: T) => (token: any): token is T[keyof T] =>
  Object.values(e).includes(token as T[keyof T])

function parseEnumOrThrow<T>(token: string, errorMessage: string): T {
  const intValue = parseIntOrThrow(token, errorMessage)
  if (!isValidEnumValue(token)) {
    throw new RangeError(errorMessage)
  }

  return (intValue as unknown) as T
}

UnitOfTime.deserializeFromSortableString = <T extends UnitOfTime>(unitOfTime: string): T => {
  const serializationFormatMatches = SerializationFormatByType.map(_ => {
    return {
      match: _.regex.test(unitOfTime),
      serializationFormat: _,
    }
  }).filter(_ => _.match === true)

  if (serializationFormatMatches.length === 0) {
    throw new Error('Cannot deserialize string; it is not valid unit-of-time.')
  }
  if (serializationFormatMatches.length !== 1) {
    throw new Error(
      // tslint:disable-next-line: max-line-length
      `Invalid UnitOfTime format: could not uniquely identify the UnitOfTime format for UnitOfTime, '${unitOfTime}' so could not deserialize.`,
    )
  }
  const serializationFormatMatch = serializationFormatMatches[0]
  const serializedTypeName = serializationFormatMatch.serializationFormat.typeName

  const errorMessage = `Cannot deserialize string;  it appears to be a ${serializedTypeName} but it is malformed.`
  const tokens = serializationFormatMatch.serializationFormat.regex.exec(unitOfTime)!

  if (serializedTypeName === CalendarMonth.name) {
    const year = parseIntOrThrow(tokens[1], errorMessage)
    const monthNumber = parseEnumOrThrow<MonthNumber>(tokens[2], errorMessage)

    try {
      const result = new CalendarMonth(year, monthNumber)
      return (result as unknown) as T
    } catch {
      throw new Error(errorMessage)
    }
  }

  if (serializedTypeName === CalendarQuarter.name) {
    const year = parseIntOrThrow(tokens[1], errorMessage)
    const quarterNumber = parseEnumOrThrow<QuarterNumber>(tokens[2], errorMessage)

    try {
      const result = new CalendarQuarter(year, quarterNumber)
      return (result as unknown) as T
    } catch {
      throw new Error(errorMessage)
    }
  }

  if (serializedTypeName === CalendarYear.name) {
    const year = parseIntOrThrow(tokens[1], errorMessage)

    try {
      const result = new CalendarYear(year)
      return (result as unknown) as T
    } catch {
      throw new Error(errorMessage)
    }
  }

  if (serializedTypeName === FiscalMonth.name) {
    const year = parseIntOrThrow(tokens[1], errorMessage)
    const monthNumber = parseEnumOrThrow<MonthNumber>(tokens[2], errorMessage)

    try {
      const result = new FiscalMonth(year, monthNumber)
      return (result as unknown) as T
    } catch {
      throw new Error(errorMessage)
    }
  }

  if (serializedTypeName === FiscalQuarter.name) {
    const year = parseIntOrThrow(tokens[1], errorMessage)
    const quarterNumber = parseEnumOrThrow<QuarterNumber>(tokens[2], errorMessage)

    try {
      const result = new FiscalQuarter(year, quarterNumber)
      return (result as unknown) as T
    } catch {
      throw new Error(errorMessage)
    }
  }

  if (serializedTypeName === FiscalYear.name) {
    const year = parseIntOrThrow(tokens[1], errorMessage)

    try {
      const result = new FiscalYear(year)
      return (result as unknown) as T
    } catch {
      throw new Error(errorMessage)
    }
  }

  throw new RangeError(`this type of unit-of-time is not supported: ${serializedTypeName}`)
}

// tslint:disable-next-line: only-arrow-functions
UnitOfTime.prototype.serializeToSortableString = function() {
  if (this instanceof CalendarMonth) {
    const unitOfTimeAsCalendarMonth = this as CalendarMonth
    const result = `c-${unitOfTimeAsCalendarMonth.year
      .toString()
      .padStart(4, '0')}-${unitOfTimeAsCalendarMonth.monthNumber.toString().padStart(2, '0')}`
    return result
  }

  if (this instanceof CalendarQuarter) {
    const unitOfTimeAsCalendarQuarter = this as CalendarQuarter

    const result = `c-${unitOfTimeAsCalendarQuarter.year.toString().padStart(4, '0')}-Q${
      unitOfTimeAsCalendarQuarter.quarterNumber
    }`
    return result
  }

  if (this instanceof CalendarYear) {
    const unitOfTimeAsCalendarYear = this as CalendarYear

    const result = `c-${unitOfTimeAsCalendarYear.year.toString().padStart(4, '0')}`
    return result
  }

  if (this instanceof FiscalMonth) {
    const unitOfTimeAsFiscalMonth = this as FiscalMonth

    const result = `f-${unitOfTimeAsFiscalMonth.year
      .toString()
      .padStart(4, '0')}-${unitOfTimeAsFiscalMonth.monthNumber.toString().padStart(2, '0')}`
    return result
  }

  if (this instanceof FiscalQuarter) {
    const unitOfTimeAsFiscalQuarter = this as FiscalQuarter

    const result = `f-${unitOfTimeAsFiscalQuarter.year.toString().padStart(4, '0')}-Q${
      unitOfTimeAsFiscalQuarter.quarterNumber
    }`
    return result
  }

  if (this instanceof FiscalYear) {
    const unitOfTimeAsCalendarYear = this as FiscalYear

    const result = `f-${unitOfTimeAsCalendarYear.year.toString().padStart(4, '0')}`
    return result
  }

  throw new RangeError('this type of unit-of-time is not supported: ' + this.constructor.name)

  // switch (unitOfTimeType) {
  //   case CalendarMonth.name: {
  //     const unitOfTimeAsCalendarMonth = this as CalendarMonth
  //     const result = `c-${unitOfTimeAsCalendarMonth.year
  //       .toString()
  //       .padStart(4, '0')}-${unitOfTimeAsCalendarMonth.monthNumber.toString().padStart(2, '0')}`
  //     return result
  //   }

  //   case CalendarQuarter.name: {
  //     const unitOfTimeAsCalendarQuarter = this as CalendarQuarter

  //     const result = `c-${unitOfTimeAsCalendarQuarter.year.toString().padStart(4, '0')}-Q${
  //       unitOfTimeAsCalendarQuarter.quarterNumber
  //     }`
  //     return result
  //   }

  //   case CalendarYear.name: {
  //     const unitOfTimeAsCalendarYear = this as CalendarYear

  //     const result = `c-${unitOfTimeAsCalendarYear.year.toString().padStart(4, '0')}`
  //     return result
  //   }

  //   case FiscalMonth.name: {
  //     const unitOfTimeAsFiscalMonth = this as FiscalMonth

  //     const result = `f-${unitOfTimeAsFiscalMonth.year
  //       .toString()
  //       .padStart(4, '0')}-${unitOfTimeAsFiscalMonth.monthNumber.toString().padStart(2, '0')}`
  //     return result
  //   }

  //   case FiscalQuarter.name: {
  //     const unitOfTimeAsFiscalQuarter = this as FiscalQuarter

  //     const result = `f-${unitOfTimeAsFiscalQuarter.year.toString().padStart(4, '0')}-Q${
  //       unitOfTimeAsFiscalQuarter.quarterNumber
  //     }`
  //     return result
  //   }

  //   case FiscalYear.name: {
  //     const unitOfTimeAsCalendarYear = this as FiscalYear

  //     const result = `f-${unitOfTimeAsCalendarYear.year.toString().padStart(4, '0')}`
  //     return result
  //   }

  //   default:
  //     throw new Error('this type of unit-of-time is not supported: ' + unitOfTimeType)
  // }
}
