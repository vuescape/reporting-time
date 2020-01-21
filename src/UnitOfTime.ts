import { UnitOfTimeGranularity } from './UnitOfTimeGranularity'
import { UnitOfTimeKind } from './UnitOfTimeKind'

/** Represents a unit of time, such as a month, quarter, or year. */
export abstract class UnitOfTime {
  /**
   * Determines whether two objects of type @see UnitOfTime  are equal.
   * @param left The object to the left of the operator.
   * @param right The object to the right of the operator.
   * @returns  true if the two units-of-time are equal; false otherwise.
   */
  public abstract equals(value: UnitOfTime): boolean
  //  {
  //   if((left as any).constructor !== (right as any).constructor) {
  //     return false
  //   }
  //   return equals(left, right)
  // }

  /**
   * Determines whether two objects of type @see UnitOfTime  are not equal.
   * @param left The object to the left of the operator.
   * @param right The object to the right of the operator.
   * @returns  true if the two units-of-time are not equal; false otherwise.
   */
  // public static notEquals(left: UnitOfTime, right: UnitOfTime) {
  //   return !equals(left, right)
  // }

  /** Gets the kind of the unit-of-time. */
  public abstract get unitOfTimeKind(): UnitOfTimeKind

  /** Gets the granularity of the unit-of-time. */
  public abstract get unitOfTimeGranularity(): UnitOfTimeGranularity

  public abstract valueOf(): number

  public abstract toString(): string
}
