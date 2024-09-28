import { Student } from "../../domain/entity/student.entity";
import { StudentRepository } from "../../domain/ports/student.repository";
import { FindStudentsByFiltersRequest } from "../types/student";

export class FindStudentsByFiltersUseCase {
    constructor(private studentRepository: StudentRepository) {}
  
    execute(filters: FindStudentsByFiltersRequest): Student[] {
      return this.studentRepository.findByFilters(filters);
    }
  }