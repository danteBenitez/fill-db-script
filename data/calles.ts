import inRange from "../utils/inRange";
import { pick } from "../utils/pick";
import { randomElement } from "../utils/randomElement";

export default {
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
            getSector: () => randomElement(['A', 'B', 'C', 'D']),
            manzana: [0, 50],
            casa: [1, 30]
        },
        "Guadalupe": {
            getTorre: () => inRange(1, 50),
            getDpto: () => inRange(1, 12),
            getSector: () => pick('A', 'B')
        },
        "San Francisco": {
            calle: ['LAS HERAS', 'VICENTE POSADAS', 'CARLOS AYALA', 'EMILIO SENÉS'],
            numero: [800, 1900]
        },
        "Eva Perón": {
            manzana: [1, 30],
            casa: [1, 1500],
        },
        "Centro": {
            calle: ['FONTANA', 'EVA PERÓN', 'JOSÉ MARIA URIBURU', 'SALTA'],
            numero: [0, 700]
        },
        "La Paz": {
            manzana: [1, 30],
            casa: [3, 4],
            getSector: () => randomElement(['A', 'B', 'C', 'D'])
        }
    }
}