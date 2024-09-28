import { Instructor } from '../domain/entity/instructor.entity';
import type { InstructorRepository } from '../domain/ports/instructor.repository';

export class InstructorInMemoryRepository implements InstructorRepository {
  private instructors: Instructor[] = [];

  add(instructor: Instructor): void {
    this.instructors.push(instructor);
  }

  findById(id: string): Instructor | null {
    return this.instructors.find(instructor => instructor.id === id) || null;
  }

  update(instructor: Instructor): void {
    const index = this.instructors.findIndex(i => i.id === instructor.id);
    if (index !== -1) {
      this.instructors[index] = instructor;
    }
  }
}
