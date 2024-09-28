import { StudentRepository } from '../domain/ports/student.repository';
import { Student } from '../domain/entity/student.entity';

export class StudentInMemoryRepository implements StudentRepository {
  private students: Student[] = [];

  create(student: Student): void {
    this.students.push(student);
  }

  findAll(): Student[] {
    return this.students;
  }
  
  findByFilters(filters: { name?: string; phoneNumber?: string; recordNumber?: string; }): Student[] {
    const collection = this.students.filter(student => {
      return ((!filters.name || student.name.includes(filters.name)) &&
      (!filters.phoneNumber || student.phoneNumber === filters.phoneNumber) &&
      (!filters.recordNumber || student.recordNumber === filters.recordNumber)
)
    })
    return collection
  }
  
  findById(id: string): Student | null {
    return this.students.find(student => student.id === id) || null;
  }

  update(student: Student): void {
    const index = this.students.findIndex(s => s.id === student.id);
    if (index !== -1) {
      this.students[index] = student;
    }
  }

}
