import { Instructor } from "../../domain/entity/instructor.entity";
import { InstructorRepository } from "../../domain/port/instructor.repository";

export class getAllInstructorsUseCase {
    constructor(private instructorRepository: InstructorRepository) {}

    execute(): Instructor[] {
        return this.instructorRepository.findAll();
    }
}