export class HashCodeHelper {
  public static Initialize() {
    return new HashCodeHelper(this.HashCodeInitializer)
  }

  public static InitializeWithSeedValue(seedValue: number) {
    return new HashCodeHelper(seedValue)
  }

  /// <summary>
  /// The multiplier for each value.
  /// </summary>
  private static readonly HashCodeMultiplier = 37

  /// <summary>
  /// The initial hash value.
  /// </summary>
  private static readonly HashCodeInitializer = 17

  private value: number

  public constructor(value: number) {
    this.value = value
  }

  public get Value() {
    return this.value
  }

  public Hash<T>(item: T): HashCodeHelper {
    const hashCode = this.Value * HashCodeHelper.HashCodeMultiplier + ((item as any).valueOf() || 0)
    const result = new HashCodeHelper(hashCode)
    return result
  }
}
