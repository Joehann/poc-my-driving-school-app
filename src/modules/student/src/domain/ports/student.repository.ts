import { Student } from '../entity/student.entity';

export interface StudentRepository {
  create(student: Student): void;
  findAll(): Student[];
  findByFilters(filters: {
    name?: string;
    phoneNumber?: string;
    recordNumber?: string;
  }): Student[];
  findById(id: string): Student | null;
  update(student: Student): void;
}