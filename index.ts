import { fakerES_MX } from '@faker-js/faker';
import fs from "fs/promises";
import { pick } from "./utils/pick";
import dniToAgeMap from './dni'

const CURRENT_YEAR = 2023;

const NAMES = [
  { name: "Sofía", gender: "F" },
  { name: "Mateo", gender: "M" },
  { name: "Agustín", gender: "M" },
  { name: "Martina", gender: "F" },
  { name: "Santiago", gender: "M" },
  { name: "Nicolás", gender: "M" },
  { name: "Victoria", gender: "F" },
  { name: "Joaquín", gender: "M" },
  { name: "Lucía", gender: "F" },
  { name: "Facundo", gender: "M" },
  { name: "Florencia", gender: "F" },
  { name: "Matías", gender: "M" },
  { name: "Milagros", gender: "F" },
  { name: "Leonardo", gender: "M" },
  { name: "Rocío", gender: "F" },
  { name: "Tomás", gender: "M" },
  { name: "Sol", gender: "F" },
  { name: "Emiliano", gender: "M" },
];

const SURNAMES = [
  "García",
  "Martínez",
  "Rodríguez",
  "López",
  "Fernández",
  "González",
  "Pérez",
  "Ramírez",
  "Sánchez",
  "Romero",
  "Torres",
  "Díaz",
  "Alvarez",
  "Ruiz",
  "Hernández",
  "Mendoza",
  "Flores",
  "Gómez",
  "Ortega",
  "Silva",
];

const NEIGHBORHOODS = [
  { name: "12 DE OCTUBRE", houses: 526 },
  { name: "2 DE ABRIL", houses: 1022 },
  { name: "BARRIO MILITAR", houses: 119 },
  { name: "OBRERO", houses: 1401 },
  { name: "BARRIO VIAL", houses: 958 },
  { name: "DON BOSCO", houses: 1606 },
  { name: "EL MISTOL", houses: 98 },
  { name: "EL RESGUARDO", houses: 513 },
  { name: "MANUEL BELGRANO", houses: 71 },
  { name: "EMILIO TOMAS", houses: 340 },
  { name: "EVA PERÓN", houses: 2200 },
  { name: "GUADALUPE", houses: 1435 },
  { name: "INDEPENDENCIA", houses: 1462 },
  { name: "J.F. KENNEDY", houses: 90 },
  { name: "JUAN D. PERÓN", houses: 1143 },
  { name: "LA FLORESTA", houses: 831 },
  { name: "LAS DELICIAS", houses: 213 },
  { name: "LIBORSI", houses: 714 },
  { name: "MARIANO MORENO", houses: 1636 },
  { name: "NANQOM", houses: 433 },
  { name: "SAN AGUSTÍN", houses: 780 },
  { name: "SAN FRANCISCO", houses: 2222 },
  { name: "SAN JOSÉ OBRERO", houses: 741 },
  { name: "SAN MARTÍN", houses: 3814 },
  { name: "SAN MIGUEL", houses: 1333 },
  { name: "SAN PEDRO", houses: 743 },
  { name: "SANTA ROSA", houses: 421 },
  { name: "SIMÓN BOLIVAR", houses: 2161 },
  { name: "VENEZUELA", houses: 619 },
  { name: "VILLA DEL ROSARIO", houses: 1106 },
  { name: "VILLA HERMOSA", houses: 505 },
  { name: "VILLA LA PILAR", houses: 954 },
  { name: "VILLA LOURDES", houses: 1244 },
  { name: "VIRGEN DE LUJÁN", houses: 316 },
  { name: "LA ESPERANZA", houses: 180 },
  { name: "7 DE MAYO", houses: 368 },
  { name: "ANTENOR GAUNA", houses: 1069 },
  { name: "1° DE MAYO", houses: 184 },
  { name: "EL PORVENIR", houses: 352 },
  { name: "BERNARDINO RIVADAVIA", houses: 890 },
  { name: "VIRGEN DE ITATÍ", houses: 782 },
];

const randomElement = <T>(arr: Array<T>) =>
  arr[Math.floor(Math.random() * arr.length)];

function getRandomQuantity<T>(qty: number, arr: Array<T>) {
  const selected: Array<T> = [];

  for (let i = 0; i < qty; i++) {
    const random = randomElement(arr);
    if (!selected.includes(random)) selected.push(random);
    if (selected.length == 0) continue;
    if (Math.random() > 0.5) {
      break;
    }
  }

  return selected;
}

const unique = <T>(
  callback: () => T,
  includes: (arr: Array<T>, elmt: T) => boolean = Array.prototype.includes.call
) => {
  const selected: Array<T> = [];

  return () => {
    let result;
    while (true) {
      result = callback();
      const included = includes(selected, result);
      if (!included) {
        selected.push(result);
        return result;
      }
    }
  };
};

const BIRTHS_BY_YEAR = 2_000_000;
const sumOrMinus = (num: number) =>
  Math.random() > 0.5 ? num - 1000 : num + 1000;

const getRandomDni = (
  min: number = 46_000_000
): { dni: number; age: number } => {
  const generated = Math.floor(min + Math.random() * 10_000_000);
  const age = 41 - Math.floor(generated / sumOrMinus(BIRTHS_BY_YEAR));

  return { dni: generated, age };
};

function getRandomBirthDay() {
  const date = fakerES_MX.date.birthdate({
      min: 6,
      max: 23,
      mode: 'age',
    });
  
  return {
    age: date.getFullYear() - CURRENT_YEAR
  }
}

const QTY = 3; // quantity - cantidad

type Gender = 'M' | 'F';

const getRandomNames = (): ({ names : string[], gender: Gender }) => {
  const gender = pick("M", "F");
  try {
    const selected = getRandomQuantity(QTY, NAMES)
      .filter((n) => n.gender == gender)
      .map((e) => e.name);
    if (selected.length > 0) {
      return {
        names: selected,
        gender
      }
    }
    throw selected;
  } catch (_) {
    return getRandomNames();
  }
};
const getRandomSurnames = () => getRandomQuantity(QTY, SURNAMES);
const getRandomNeighborhood = unique(
  () => {
    const neighborhood = randomElement(NEIGHBORHOODS);

    const randomHouse = Math.floor(Math.random() * neighborhood.houses);

    return {
      name: neighborhood.name,
      house: randomHouse,
    };
  },
  (arr, elmt) => arr.some((e) => e.house == elmt.house)
);

const getUniqueDni = unique(getRandomDni, (arr, elmt) =>
  arr.some((e) => e.dni == elmt.dni)
);

function createRandomStudent() {
  const { dni, age } = getUniqueDni();
  const { name: neighborhood, house } = getRandomNeighborhood();
  const { names, gender } = getRandomNames();
  return {
    _id: dni,
    nombres: names, 
    apellidos: getRandomSurnames(),
    domicilio: {
      barrio: neighborhood,
      casa: house,
    },
    genero: gender,
    edad: age,
    fecha_de_nacimiento: getRandomBirthDay()

  };
}

async function main(q: number) {
  const alumnos = [];
  for (let i = 0; i < q; i++) {
    console.log(i);
    alumnos.push(createRandomStudent());
  }
  await fs.appendFile("./alumnado.json", JSON.stringify(alumnos));
}

main(1_000);
