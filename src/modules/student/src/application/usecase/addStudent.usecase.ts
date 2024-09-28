import { Student } from "../../domain/entity/student.entity";
import { StudentRepository } from "../../domain/port/student.repository";
import type { AddStudentRequest } from "../type/student";


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