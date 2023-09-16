import { createRandomStudent } from "../utils/createRandomStudent";
import inRange from "../utils/inRange";
import SUBJECTS from "./subjects";

type Student = ReturnType<typeof createRandomStudent>;
type Subject = typeof SUBJECTS[keyof typeof SUBJECTS] & { cue_anexo: number, id: number };

// TODO: Add CUE data to the subjects to 
// TODO: generate the entries for this function
export async function generateRandomGrades(students: Student[], subjects: Subject[]) {
    const grades = []; 

    for (const year of [2021, 2022]) {
        for (const student of students) {
            for (const subject of subjects) {
                const id = generateUniqueId(year, student, subject);

                grades.push({
                    notas: createGradeForStudent(student)
                })
            }
         }
    }
}

function generateUniqueId(year: number, student: Student, subject: Subject) {
    return `${subject.cue_anexo}${student._id}${year}${subject.id}`
}

function createGradeForStudent(student: Student) {
    // Decide if it is a trimester or quadrimester
    const quantity = student.nivel_estudio == "superior"
        ? 2
        : 3;

    // Decide what's the minimum
    const levelToMinGrade = {
        "inicial": 10,
        "primaria": 7,
        "secundaria": 1,
        "superior": 1
    }
    
    const min = levelToMinGrade[student.nivel_estudio];

    return Array.from({
        length: quantity
    }).map(() => inRange(min, 10));
}