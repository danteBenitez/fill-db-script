import inRange from "../utils/inRange";
import { randomElement } from "../utils/randomElement";

const STREETS = {
    "Laguna Blanca": {
        "Av. Romualdo Pelozo": [1072, 1300],
        "Juan B. Alberdi": [500, 985],
        "Juan B. Cabral": [500, 798],
        "N. Laprida": [500, 1498],
        "Av. Juan Domingo Perón": [500, 1498],
        "Maipú": [100, 798],
        "San Martín": [400, 1898],
        "César Villalba": [600, 1198],
        "17 de Octubre": [400,598]
    },
    "Pirané": {
        "Hipólito Irigoyen": [200, 1998],
        "Av. Leandro N. Alem": [400,1198],
        "Av. 9 de Julio": [900, 1998],
        "N. Avellaneda": [300, 1198],
        "Simón Bolivar": [500, 1298],
        "Av. Carlos Pellegrín": [700,1098],
        "San Lorenzo": [200,1398],
        "Santa Rosa de Lima": [300, 1298],
        "Lavalle": [0, 1798]
    },
    "Formosa": {
        "La Nueva Formosa": {
            sector: ['A', 'B', 'C', 'D'],
            manzana: [0, 50] as [number, number],
            casa: [1, 30] as [number, number]
        },
        "Guadalupe": {
            torre: [1, 50] as [number, number],
            dpto: [1, 12] as [number, number],
            sector: ['A', 'B']
        },
        "San Francisco": {
            calle: ['LAS HERAS', 'VICENTE POSADAS', 'CARLOS AYALA', 'EMILIO SENÉS'] as string[],
            numero: [[800, 1998], [1200,2098], [400, 800], [0,798]] as [number, number][]
        },
        "Eva Perón": {
            manzana: [1, 30] as [number, number],
            casa: [1, 2000] as [number, number],
        },
        "Centro": {
            calle: ['FONTANA', 'EVA PERÓN', 'JOSÉ MARIA URIBURU', 'SALTA'] as string[],
            numero: [[0, 798], [900, 1298], [200, 1498], [0, 2098]] as [number, number][]
        },
        "La Paz": {
            manzana: [1, 10] as [number, number],
            casa: [1, 1500] as [number, number],
            sector: ['A', 'B', 'C', 'D'] as string[]
        }
    }
}

export default function createRandomDirection() {
    const randomLocation = randomElement(Object.keys(STREETS));

    switch (randomLocation) {
        case 'Laguna Blanca':
        case 'Pirané':
            const [street, [min, max]]= randomElement(
                Object.entries(STREETS[randomLocation])
            );
            
            return {
                calle: street,
                numero: inRange(min, max),
                localidad: randomLocation
            }
        case 'Formosa':
            return { 
                ...createDirectionFromFormosa(),
                localidad: randomLocation
            }
        default:
            throw new Error('Not exclusive switch on locations');
    }
}

function createDirectionFromFormosa() {
    const randomNeighborhood = randomElement(
        Object.keys(STREETS["Formosa"])
    );

    switch (randomNeighborhood) {
        case 'La Nueva Formosa': {
            const {
                casa,
                manzana,
                sector
            } = STREETS["Formosa"][randomNeighborhood];


            return {
                sector: randomElement(sector),
                manzana: inRange(...manzana),
                casa: inRange(...casa),
                barrio: randomNeighborhood
            }
        }
        case 'Guadalupe': {
            const {
                dpto,
                sector,
                torre
            } = STREETS["Formosa"][randomNeighborhood];
            
            return {
                dpto: inRange(...dpto),
                sector: randomElement(sector),
                torre: inRange(...torre),
                barrio: randomNeighborhood,
            }
        }
        case 'San Francisco': {
            const index = 
                randomElement(
                    Object.keys(STREETS["Formosa"][randomNeighborhood]["calle"])
                ) as unknown as number;
            const calle = STREETS["Formosa"][randomNeighborhood]["calle"][index];
            const [min, max] = STREETS["Formosa"][randomNeighborhood]["numero"][index];

            return {
                calle,
                numero: inRange(min, max),
                barrio: randomNeighborhood
            }
        }
        case 'Eva Perón': {
            const {
                casa,
                manzana
            } = STREETS["Formosa"][randomNeighborhood]

            return {
                casa: inRange(...casa),
                manzana: inRange(...manzana),
                barrio: randomNeighborhood
            }
        }
        case 'Centro': {
            const index = 
                randomElement(
                    Object.keys(STREETS["Formosa"][randomNeighborhood]["calle"])
                ) as unknown as number;
            const calle = STREETS["Formosa"][randomNeighborhood]["calle"][index];
            const [min, max] = STREETS["Formosa"][randomNeighborhood]["numero"][index];

            return {
                calle,
                numero: inRange(min, max),
                barrio: randomNeighborhood
            }
        }
        case 'La Paz': {
            const {
                casa,
                manzana,
                sector
            } = STREETS["Formosa"][randomNeighborhood];

            return {
                casa: inRange(...casa),
                manzana: inRange(...manzana),
                sector: randomElement(sector),
            }
        } 
        default:
            throw new Error('Unknown location');
    }


}