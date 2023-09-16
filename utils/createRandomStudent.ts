import {
  getRandomNames,
  getRandomNationality,
  getRandomSurnames,
  randomLevel,
} from "..";
import createRandomDirection from "../data/streets";
import { getUniqueDNIAndDateFromLevel } from "./dni";
import { pick } from "./pick";

export function createRandomStudent() {
  const studyLevel = randomLevel();
  const { dni, fecha_de_nacimiento, edad } =
    getUniqueDNIAndDateFromLevel(studyLevel);
  const { names, gender } = getRandomNames();
  const surnames = getRandomSurnames();
  return {
    _id: dni,
    nombres: names,
    apellidos: surnames,
    domicilio: createRandomDirection(),
    genero: gender,
    nacionalidad: getRandomNationality(),
    fecha_de_nacimiento,
    nivel_estudio: studyLevel,
    edad,
    tutor: [
      ...getRandomNames()["names"],
      ...pick(surnames.slice(1), getRandomSurnames()),
    ].join(" "),
    // TODO: Generate CUE from institutions
    cue_anexo: null,
  };
}
