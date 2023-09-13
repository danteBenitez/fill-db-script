import STREETS from './data/calles.js'
import inRange from './utils/inRange.js';
import {randomElement} from './utils/randomElement.js'

export default function generateStreetAndNumber() {
    const locality = randomElement(
        Object.keys(STREETS)
    ) as keyof typeof STREETS;

    const street = randomElement(
        Object.keys(STREETS[locality])
    );
    
    // @ts-expect-error
    const [min, max] = STREETS[locality][street];

    return {
        locality,
        street,
        number: inRange(min, max),
    }
}