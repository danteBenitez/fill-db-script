import {
  getRandomNames,
  getRandomNationality,
  getRandomSurnames,
  randomLevel,
} from "..";
import institutions from "../data/establecimientos-elegidos-final";
import createRandomDirection from "../data/streets";
import subjects from "../data/subjects";
import { LEVEL_TO_CODE } from "./LEVEL_TO_CODE";
import { Level, getUniqueDNIAndDateFromLevel } from "./dni";
import { generatePlanId } from "./generatePlanId";
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
    const { dni, fecha_de_nacimiento, edad, grado, orientacion } =
      getUniqueDNIAndDateFromLevel(studyLevel);
    const nextYearInfo = addAYearToLevel(grado, studyLevel);
    const { localidad, ...rest } = createRandomDirection();
    const currentInstitutions = LEVEL_TO_INSTITUTIONS[
      studyLevel.toUpperCase() as keyof typeof LEVEL_TO_INSTITUTIONS
    ].filter((i) => i.localidad == localidad.toUpperCase());
    const nextInstitutions = LEVEL_TO_INSTITUTIONS[
      nextYearInfo.nivel_estudio.toUpperCase() as keyof typeof LEVEL_TO_INSTITUTIONS
    ].filter((i) => i.localidad == localidad.toUpperCase());

    const institution = currentInstitutions.find(
      (i) => i.localidad == localidad.toUpperCase()
    );
    const nextInstitution = nextInstitutions.find(
      i => i.localidad == localidad.toUpperCase()
    );
    if (!institution) throw institution;
    const career = getRandomCareer(institution.nombre, studyLevel);
    const { names, gender } = getRandomNames();
    const surnames = getRandomSurnames();
    
    const currentPlanId = generatePlanId(studyLevel, career);
    const nextPlanId = generatePlanId(nextYearInfo.nivel_estudio, career);
    const gradeOrYear = studyLevel == "primario" ? "grado" : "año";

    const result = {
      _id: dni,
      nombres: names,
      apellidos: surnames,
      domicilio: { localidad, ...rest },
      genero: gender,
      nacionalidad: getRandomNationality(),
      fecha_de_nacimiento,
      cursado: {
        2021: {
          [gradeOrYear]: grado,
          nivel_estudio_id: LEVEL_TO_CODE[studyLevel.toUpperCase() as keyof typeof LEVEL_TO_CODE],
          nivel_estudio: studyLevel,
          plan_id: currentPlanId,
          carrera: getRandomCareer(institution.nombre, studyLevel),
          edad,
          cue_anexo: institution?.CUEanexo
        },
        2022: {
          ...nextYearInfo,
          plan_id: nextPlanId,
          carrera: getRandomCareer(nextInstitution?.nombre, studyLevel),
          edad: pick(edad, edad+1),
          cue_anexo: nextInstitution?.CUEanexo
        }
      },
      fecha_ingreso: getRandomEntryDate(2022),
      tutor: [
        ...getRandomNames()["names"],
        ...pick(surnames, getRandomSurnames()),
      ].join(" "),
    };

    return result;
  } catch (e) {
    if (e instanceof Error) throw e;
    return createRandomStudent();
  }
}

function getRandomCareer(institution: string | undefined, studyLevel: Level) {
  if (!institution) {
    return null;
  }
  const ints = institutions.find((i) => i.nombre == institution.toUpperCase());

  if (ints?.ec_SNU == 1) {
    const subjectsAvailable =
      subjects["TERCIARIO"][
        institution as keyof (typeof subjects)["TERCIARIO"]
      ];
    return randomElement(Object.keys(subjectsAvailable));
  } else {
    return null;
  }
}

type ReturnAddYear = {
  grado?: number,
  año?: number,
  nivel_estudio: Level,
  nivel_estudio_id: typeof LEVEL_TO_CODE[keyof typeof LEVEL_TO_CODE],
}

function addAYearToLevel(grade: number, level: Level): ReturnAddYear {
  switch (level) {
    case 'inicial':
      return grade >= 2 ? {
        grado: 1,
        nivel_estudio: "primario",
        nivel_estudio_id: 102
      } : {
        grado: 2,
        nivel_estudio: "inicial",
        nivel_estudio_id: 101
      }
    case 'primario': 
      return grade >= 6 ? {
        grado: 1,
        nivel_estudio: "secundario",
        nivel_estudio_id: 110
      } : {
        grado: grade + 1,
        nivel_estudio: "primario",
        nivel_estudio_id: 102
      }
    case "secundario": 
      return grade >= 6 ? {
        año: 1,
        nivel_estudio: "superior",
        nivel_estudio_id: 115
      } : {
        grado: grade + 1,
        nivel_estudio: "secundario",
        nivel_estudio_id: 110
      }
    case "superior": 
      return {
        año: grade + 1,
        nivel_estudio: "superior",
        nivel_estudio_id: 115
      }
  }
}

function getRandomEntryDate(year: number) {
  return pick(new Date(year, 3, 3), new Date(year, 6, 7));
}
