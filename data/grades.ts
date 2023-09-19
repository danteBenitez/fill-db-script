import { createRandomStudent } from "../utils/createRandomStudent";
import inRange from "../utils/inRange";
import { randomElement } from "../utils/randomElement";
import SUBJECTS from "./subjects";

type Student = ReturnType<typeof createRandomStudent>;
type Subject = (typeof SUBJECTS)[keyof typeof SUBJECTS] & { id: number };

const LEVEL_TO_CODE = {
  INICIAL: 101,
  PRIMARIA: 102,
  SECUNDARIA: 110,
  SUPERIOR: 115,
};

// TODO: Add CUE data to the subjects to
// TODO: generate the entries for this function
export async function generateRandomGrades(
  students: Student[],
  subjects: Subject[]
) {
  const grades = [];

  for (const year of [2021, 2022]) {
    for (const student of students) {
      for (const subject of subjects) {
        for (let trimester = 1; trimester <= 3; trimester++) {
          const _id = generateUniqueId(year, student, subject, trimester);

          grades.push({
            _id,
            notas: createGradeForStudent(student),
          });
        }
      }
    }
  }

  return grades;
}

function generateUniqueId(
  year: number,
  student: Student,
  subject: Subject,
  trimester: number
) {
  return `${year}${trimester}${student._id}${subject.id}`;
}

function createGradeForStudent(student: Student) {
  // Decide if it is a trimester or quadrimester
  const quantity = inRange(3, 6);

  // Decide what's the minimum
  const levelToMinGrade = {
    inicial: 10,
    primario: 7,
    secundario: 1,
    superior: 1,
  };

  const min = levelToMinGrade[student.nivel_estudio];

  return Array.from({
    length: quantity,
  }).map(() => inRange(min, 10));
}
