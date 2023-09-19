import {
  getRandomNames,
  getRandomNationality,
  getRandomSurnames,
  randomLevel,
} from "..";
import institutions from "../data/establecimientos-elegidos-final";
import createRandomDirection from "../data/streets";
import subjects from "../data/subjects";
import { Level, getUniqueDNIAndDateFromLevel } from "./dni";
import { pick } from "./pick";
import { randomElement } from "./randomElement";

const initialInstitutions = institutions.filter((i) => i.ec_jar == 1);
const primaryInstitutions = institutions.filter((i) => i.ec_pri == 1);
const secondaryInstitutions = institutions.filter((i) => i.ec_sec == 1);
const higherInstitutions = institutions.filter((i) => i.ec_SNU == 1);


const LEVEL_TO_INSTITUTIONS = {
  INICIAL: initialInstitutions,
  PRIMARIO: primaryInstitutions,
  SECUNDARIO: secondaryInstitutions,
  SUPERIOR: higherInstitutions,
};


export function createRandomStudent() {
  try {
    const studyLevel = randomLevel();
    const { localidad, ...rest } = createRandomDirection();
    const institutions = LEVEL_TO_INSTITUTIONS[
      studyLevel.toUpperCase() as keyof typeof LEVEL_TO_INSTITUTIONS
    ].filter((i) => i.localidad == localidad.toUpperCase());

    const { dni, fecha_de_nacimiento, edad, grado, orientacion } =
      getUniqueDNIAndDateFromLevel(studyLevel);

    const institution = institutions.find(i => i.localidad == localidad.toUpperCase());
    if (!institution) throw institution;
    const career = getRandomCareer(institution.nombre, studyLevel);
    const gradeOrYear = studyLevel === "inicial" ? "grado" : "año";
    const { names, gender } = getRandomNames();
    const surnames = getRandomSurnames();

    return {
      _id: dni,
      nombres: names,
      apellidos: surnames,
      domicilio: { localidad, ...rest },
      genero: gender,
      nacionalidad: getRandomNationality(),
      fecha_de_nacimiento,
      nivel_estudio: studyLevel,
      [gradeOrYear]: grado,
      orientacion,
      carrera: career,
      cue_anexo: institution?.CUEanexo,
      edad,
      tutor: [
        ...getRandomNames()["names"],
        ...pick(surnames, getRandomSurnames()),
      ].join(" "),
    };
  } catch (e) {
    if (e instanceof Error) throw e;
    return createRandomStudent();
  }
}

function getRandomCareer(institution: string, studyLevel: Level) {
  const ints = institutions.find(i => i.nombre == institution.toUpperCase());

  if (ints?.ec_SNU == 1) {
    const subjectsAvailable = subjects["TERCIARIO"][
      institution as keyof typeof subjects["TERCIARIO"]
    ];
    console.log(subjectsAvailable);
    return randomElement(Object.keys(subjectsAvailable));
  } else {
    return null;
  }

}
