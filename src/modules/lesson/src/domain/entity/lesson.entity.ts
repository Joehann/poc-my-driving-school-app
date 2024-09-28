import { Instructor } from "driving-school/modules/instructor/src/domain/entity/instructor.entity";
import { Student } from "driving-school/modules/student/src/domain/entity/student.entity";


export class Lesson {
  constructor(
    public id: string,
    public student: Student,
    public instructor: Instructor,
    public date: string,
    public timeSlot: string
  ) {}

  isAtSameTime(date: string, timeSlot: string): boolean {
    return this.date === date && this.timeSlot === timeSlot;
  }
}
