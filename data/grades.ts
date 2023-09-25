import { createRandomStudent } from "../utils/createRandomStudent";
import inRange from "../utils/inRange";
import SUBJECTS from '../data/subjects-with-id';
import PLANS from '../data/plan';
import { Level } from "../utils/dni";

type Student = ReturnType<typeof createRandomStudent>;
type Subject = (typeof SUBJECTS)[number];

export async function generateRandomGrades(
  students: Student[],
) {
  const grades: {
    _id: string;
    notas: number[];
    condicion: "Aprobado" | "Desaprobado";
  }[] = [];
  let i = 0;
  for (const year of [2021, 2022]) {
    for (const student of students) {
      const plan = PLANS.find(p => p.id == student.plan_id);
      if (!plan) {
        throw new Error('Plan inválido!' + student.plan_id);
      }

      const formattedPlan = "Fsa23" + plan.id;
      const subjects = SUBJECTS.filter(s => s.plan_id == formattedPlan);
      if (subjects.length == 0) {
        continue;
      }

      for (const subject of subjects) {
        for (let trimester = 1; trimester <= 3; trimester++) {
          const _id = generateUniqueId(year, student, subject, trimester);
          const gradeForStudent = createGradeForStudent(
            student, year as 2022 | 2021
          );
          const avg =
            gradeForStudent.reduce((acc, g) => acc + g) /
            gradeForStudent.length;

          grades.push({
            _id,
            notas: gradeForStudent,
            condicion: avg >= 6 ? "Aprobado" : "Desaprobado",
          });
          console.log(`Nota ${i} generada`);
          i++;
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
  return `${year}${trimester}${student._id}${subject._id}`;
}

function createGradeForStudent(student: Student, year: 2021 | 2022) {
  // Decide if it is a trimester or quadrimester
  const quantity = inRange(3, 6);

  // Decide what's the minimum
  const levelToMinGrade: Record<Level, number> = {
    inicial: 10,
    primario: 7,
    secundario: 1,
    superior: 1,
  };

  const min = levelToMinGrade[
    student.cursado[year as keyof typeof student.cursado].nivel_estudio
  ];

  return Array.from({
    length: quantity,
  }).map(() => inRange(min, 10));
}
