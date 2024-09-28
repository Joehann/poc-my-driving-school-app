import { Instructor } from "../entity/instructor.entity";

export interface InstructorRepository {
  add(instructor: Instructor): void;
  findById(id: string): Instructor | null;
  update(instructor: Instructor): void;
}