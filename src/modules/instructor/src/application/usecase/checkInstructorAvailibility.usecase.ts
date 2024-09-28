
import { InstructorRepository } from '../../domain/ports/instructor.repository';

export type CheckAvailabilityRequest = {
  instructorId: string;
  date: string;
  timeSlot: string;
};

export class CheckInstructorAvailabilityUseCase {
  constructor(private instructorRepository: InstructorRepository) {}

  execute(request: CheckAvailabilityRequest): boolean {
    const instructor = this.instructorRepository.findById(request.instructorId);

    if (!instructor) {
      throw new Error('Instructor not found');
    }

    if (!instructor.isAvailableForNext3Days(request.date)) {
      throw new Error('Instructor must be available at least 3 days in advance');
    }

    if (!instructor.canWorkOnDay(request.date)) {
      throw new Error('Instructor cannot work more hours on this day');
    }

    return instructor.hasAvailability(request.date, request.timeSlot);
  }
}
