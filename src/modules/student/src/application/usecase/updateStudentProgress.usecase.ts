import { StudentRepository } from '../../domain/ports/student.repository';
import type{ UpdateStudentProgressRequest } from '../types/student';


export class UpdateStudentProgressUseCase {
  constructor(private studentRepository: StudentRepository) {}

  execute(request: UpdateStudentProgressRequest): void {
    const student = this.studentRepository.findById(request.studentId);

    if (!student) {
      throw new Error('Student not found');
    }

    student.updateProgress(request.skillAcquired);
    this.studentRepository.update(student);
  }
}