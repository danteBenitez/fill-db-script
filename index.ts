import fs from "fs/promises";
import { NAMES } from "./data/NAMES";
import { createRandomStudent } from "./utils/createRandomStudent";
import { Level } from "./utils/dni";
import { pick } from "./utils/pick";
import { randomElement } from "./utils/randomElement";
import { unique } from "./utils/unique";

const SURNAMES = [
  "González",
  "Rodríguez",
  "López",
  "Martínez",
  "Pérez",
  "Fernández",
  "Gómez",
  "Sánchez",
  "Díaz",
  "Torres",
  "Rivera",
  "Romero",
  "Ortega",
  "Hernández",
  "Ramos",
  "Alvarez",
  "Jiménez",
  "Moreno",
  "Silva",
  "Vargas",
  "Cabrera",
  "Ruiz",
  "Mendoza",
  "Vargas",
  "Soto",
  "Aguilar",
  "Giménez",
  "Castro",
  "Navarro",
  "Luna",
  "Rojas",
  "Vega",
  "Molina",
  "Medina",
  "Castillo",
  "Chávez",
  "Fuentes",
  "Guerra",
  "Campos",
  "Olivares",
  "Sanchez",
  "Morales",
  "Arias",
  "Gutierrez",
  "Cruz",
  "Paz",
];

const NEIGHBORHOODS = [
  { name: "NUEVA FORMOSA", houses: 30 },
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

function getRandomQuantity<T>(max: number, arr: Array<T>) {
  const selected: Array<T> = [];

  for (let i = 0; i < max; i++) {
    const random = randomElement(arr);
    if (!selected.includes(random)) selected.push(random);
    if (selected.length == 0) continue;
    if (Math.random() > 0.5) {
      break;
    }
  }

  return selected;
}

const QTY = 3; // quantity - cantidad

type Gender = "M" | "F";

export const getRandomNames = (): { names: string[]; gender: Gender } => {
  const gender = pick("M", "F");
  try {
    const selected = getRandomQuantity(QTY, NAMES)
      .filter((n) => n.gender == gender)
      .map((e) => e.name);
    if (selected.length > 0) {
      return {
        names: selected,
        gender,
      };
    }
    throw selected;
  } catch (_) {
    return getRandomNames();
  }
};
export const getRandomSurnames = () => getRandomQuantity(QTY, SURNAMES);
export const getRandomNeighborhood = unique(
  () => {
    const neighborhood = randomElement(NEIGHBORHOODS);

    const randomHouse = Math.floor(Math.random() * neighborhood.houses);

    return {
      name: neighborhood.name,
      house: randomHouse,
    };
  },
  (arr, elmt) => arr.some((e) => e.house == elmt.house && e.name == elmt.name)
);

export const getRandomNationality = () => "Argentina";

export const randomLevel = () => {
  return randomElement([
    "inicial",
    "primaria",
    "secundaria",
    "superior",
  ]) satisfies Level;
};

async function main(q: number) {
  const alumnos = [];
  for (let i = 0; i < q; i++) {
    console.log(i);
    alumnos.push(createRandomStudent());
  }
  await fs.writeFile("./alumnado.json", JSON.stringify(alumnos));
}

main(10_000);
