import { createRandomStudent } from "../utils/createRandomStudent";
import inRange from "../utils/inRange";
import SUBJECTS from '../data/subjects-with-id';
import PLANS from '../data/plan';
import { Level } from "../utils/dni";

type Student = ReturnType<typeof createRandomStudent>;
type Subject = (typeof SUBJECTS)[number];
type TrimesterGrade = {
  notas_parciales: number[],
  nota_final: number,
  condicion: "Aprobado" | "Desaprobado"
}

export async function generateRandomGrades(
  students: Student[],
) {
  const grades: {
    _id: string;
    condicion: "Aprobado" | "Desaprobado";
    trimestres: {
      1: TrimesterGrade,
      2: TrimesterGrade,
      3: TrimesterGrade
    },
    nota_final: number
  }[] = [];
  let i = 0;
  for (const year of [2021, 2022]) {
    for (const student of students) {
      const plan = PLANS.find(p => p.id == student.cursado[year as 2021 | 2022].plan_id);
      if (!plan) {
        throw new Error('Plan inválido!' + student.cursado[year as 2021 | 2022].plan_id);
      }

      const formattedPlan = "Fsa23" + plan.id;
      const subjects = SUBJECTS.filter(s => s.plan_id == formattedPlan);
      if (subjects.length == 0) {
        console.log("No hay materias para el plan", plan);
      }

      for (const subject of subjects) {
          const _id = generateUniqueId(year, student, subject);
          
          const thirdTrimester = generateGradesForTrimester(student, year);
          grades.push({
            _id,
            trimestres: {
              1: generateGradesForTrimester(student, year),
              2: generateGradesForTrimester(student, year),
              3: thirdTrimester
            },
            nota_final: thirdTrimester.nota_final,
            condicion: thirdTrimester.nota_final >= 6 ? "Aprobado" : "Desaprobado"
          });
          console.log(`Nota ${i} generada`);
          i++;
      }
    }
  }

  return grades;
}

function generateGradesForTrimester(student: Student, year: number) {
  const gradeForStudent = createGradeForStudent(
    student, year as 2022 | 2021
  );
  const avg =
    gradeForStudent.reduce((acc, g) => acc + g) /
    gradeForStudent.length;
  
  return {
    notas_parciales: gradeForStudent,
    nota_final: Math.ceil(avg),
    condicion: Math.ceil(avg) >= 6 ? "Aprobado" : "Desaprobado" as "Aprobado" | "Desaprobado"
  }
}

function generateUniqueId(
  year: number,
  student: Student,
  subject: Subject,
) {
  return `${year}${student._id}${subject._id}`;
}

function createGradeForStudent(student: Student, year: 2021 | 2022) {
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
