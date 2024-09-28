import { Instructor } from '../../domain/entity/instructor.entity';
import { Qualification } from '../../domain/valueObject/qualification.valueObject';
import type { InstructorRepository } from '../../domain/port/instructor.repository';
import type { AddInstructorRequest } from '../type/request.type';

export class AddInstructorUseCase {
  constructor(private instructorRepository: InstructorRepository) {}

  execute(request: AddInstructorRequest): void {
    const qualifications = request.qualifications.map(q => new Qualification(q));
    const instructor = new Instructor(request.id, request.name, qualifications);

    this.instructorRepository.create(instructor);
  }
}
