import type { InstructorRepository } from '../../domain/ports/instructor.repository';
import type { ScheduleLessonRequest } from '../type/request.type';

export class ScheduleLessonUseCase {
  constructor(private instructorRepository: InstructorRepository) {}

  execute(request: ScheduleLessonRequest): void {
    const instructor = this.instructorRepository.findById(request.instructorId);

    if (!instructor) {
      throw new Error('Instructor not found');
    }

    // Check if the instructor can work on this day and has availability
    if (!instructor.canWorkOnDay(request.date)) {
      throw new Error('Instructor cannot work more hours on this day');
    }

    if (!instructor.hasAvailability(request.date, request.timeSlot)) {
      throw new Error('Instructor is not available at this time');
    }

    // Book the lesson
    instructor.bookLesson(request.date, request.timeSlot);

    // Update the repository
    this.instructorRepository.update(instructor);
  }
}
