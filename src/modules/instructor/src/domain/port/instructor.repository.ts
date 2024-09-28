import { Instructor } from "../entity/instructor.entity";

export interface InstructorRepository {
  create(instructor: Instructor): void;
  findAll(): Instructor[];
  findById(id: string): Instructor | null;
  update(instructor: Instructor): void;
}