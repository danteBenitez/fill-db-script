import {
  getRandomNames,
  getRandomNationality,
  getRandomSurnames,
  randomLevel,
} from "..";
import institutions from "../data/establecimientos-elegidos-final";
import createRandomDirection from "../data/streets";
import { getUniqueDNIAndDateFromLevel } from "./dni";
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
    const institution = LEVEL_TO_INSTITUTIONS[
      studyLevel.toUpperCase() as keyof typeof LEVEL_TO_INSTITUTIONS
    ].filter((i) => i.localidad == localidad.toUpperCase());

    const { dni, fecha_de_nacimiento, edad } =
      getUniqueDNIAndDateFromLevel(studyLevel);
    const { names, gender } = getRandomNames();
    const surnames = getRandomSurnames();

    console.log(localidad);
    return {
      _id: dni,
      nombres: names,
      apellidos: surnames,
      domicilio: { localidad, ...rest },
      genero: gender,
      nacionalidad: getRandomNationality(),
      fecha_de_nacimiento,
      nivel_estudio: studyLevel,
      cue_anexo: randomElement(
        institution.filter((i) => i.localidad == localidad.toUpperCase())
      ).CUEanexo,
      edad,
      tutor: [
        ...getRandomNames()["names"],
        ...pick(surnames, getRandomSurnames()),
      ].join(" "),
    };
  } catch (_) {
    return createRandomStudent();
  }
}
