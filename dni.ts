import { pick } from "./utils/pick"

// Map document numbers with approximted age:
export default  {
    49_000_000: () => pick(13, 14),
    48_000_000: () => pick(14, 15),
    47_000_000: () => pick(15, 16),
    46_000_000: () => pick(17, 18),
    45_000_000: () => pick(18, 19),
    44_000_000: () => pick(19, 20),
    43_000_000: () => pick(20, 21),
    42_000_000: () => pick(21, 22),
    41_000_000: () => pick(22, 23),
    40_000_000: () => pick(23, 24),
}