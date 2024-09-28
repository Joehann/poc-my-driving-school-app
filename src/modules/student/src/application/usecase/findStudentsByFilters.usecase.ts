import { Student } from "../../domain/entity/student.entity";
import { StudentRepository } from "../../domain/port/student.repository";
import { FindStudentsByFiltersRequest } from "../type/student";

export class FindStudentsByFiltersUseCase {
    constructor(private studentRepository: StudentRepository) {}
  
    execute(filters: FindStudentsByFiltersRequest): Student[] {
      return this.studentRepository.findByFilters(filters);
    }
  }