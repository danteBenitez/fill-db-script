import { fakerES_MX } from "@faker-js/faker";
import inRange from "./inRange";
import { unique } from "./unique";
import { randomElement } from "./randomElement";

const CURRENT_YEAR = new Date().getFullYear();

export type Level = "inicial" | "primario" | "secundario" | "superior";

const ageToDNI = {
  27: [38800000, 39800000],
  26: [39800000, 40800000],
  25: [40800000, 41800000],
  24: [41800000, 42800000],
  23: [42800000, 43800000],
  22: [43800000, 44800000],
  21: [44800000, 45800000],
  20: [45800000, 46800000],
  19: [46800000, 47800000],
  18: [47800000, 48800000],
  17: [48800000, 49800000],
  16: [49800000, 50800000],
  15: [50800000, 51800000],
  14: [51800000, 52800000],
  13: [52800000, 53800000],
  12: [53800000, 54800000],
  11: [54800000, 55800000],
  10: [55800000, 56800000],
  9: [56800000, 57800000],
  8: [57800000, 58800000],
  7: [58800000, 59800000],
  6: [59800000, 60800000],
  5: [60800000, 61800000],
  4: [61800000, 62800000],
};


function generateDNI(age: number) {
  console.log('Age: ', age);
  if (age in ageToDNI) {
    const [min, max] = ageToDNI[age as keyof typeof ageToDNI];

    const number = Math.floor(Math.random() * (max - min + 1)) + min;

    const formattedDNI = number.toString().padStart(8, "0");
    return formattedDNI;
  } else {
    throw new Error("Edad no válida");
  }
}

const generateUniqueDni = unique(generateDNI, 
  (arr, e)  => arr.some(elmt => elmt == e)
);

const ORIENTATIONS = [
  "MOD_CS_NATURALES",
  "MOD_CS_SOCIALES",
  "MOD_PRODUCCION_BIENES_SERVICIOS"
];

export function getUniqueDNIAndDateFromLevel(level: Level) {
  let birthday: Date;
  let grade: number;
  let orientation: string | null = null;
  switch (level) {
    case "inicial":
      birthday = getRandomBirthday(inRange(2018, 2019));
      grade = (birthday.getFullYear() - 2018) + 1;
      break;
    case "primario":
      birthday = getRandomBirthday(inRange(2012, 2017));
      grade = (birthday.getFullYear() - 2012) + 1;
      break;
    case "secundario":
      birthday = getRandomBirthday(inRange(2005, 2011));
      grade = (birthday.getFullYear() - 2005) + 1;
      if (grade >= 4) {
          orientation = randomElement(ORIENTATIONS);
      }
      break;
    case "superior":
      birthday = getRandomBirthday(inRange(1997, 2005));
      grade = (birthday.getFullYear() - 1997) + 1;
      break;
    default:
      throw new Error("Invalid level");
  }

  const age = CURRENT_YEAR - birthday.getFullYear();

  return {
    dni: generateUniqueDni(age),
    fecha_de_nacimiento: birthday,
    edad: age,
    grado: grade,
    orientacion: orientation ?? null
  };
}

function getRandomBirthday(year: number) {
  return fakerES_MX.date.between({
    from: new Date(year, 0, 1),
    to: new Date(year, 11, 31),
  });
}
