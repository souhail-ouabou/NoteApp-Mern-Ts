export function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
    if (!val) {
        throw Error("Excpected 'val' to be difined, but received" + val)
    }
}