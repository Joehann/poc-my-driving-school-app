import { Student } from "../../domain/entity/student.entity";
import { StudentRepository } from "../../domain/ports/student.repository";
import type { AddStudentRequest } from "../types/student";


export class AddStudentUseCase {
  constructor(private studentRepository: StudentRepository) {}

  execute(request: AddStudentRequest): void {
    const student = new Student(
      request.id,
      request.name,
      request.qualification,
      request.phoneNumber,
      request.recordNumber,
      request.postalAddress
    );
    this.studentRepository.create(student);
  }
}