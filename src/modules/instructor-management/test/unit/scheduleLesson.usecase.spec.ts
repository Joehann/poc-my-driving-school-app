import { AddInstructorUseCase } from "../../src/application/usecase/addInstructor.usecase";
import { ScheduleLessonUseCase } from "../../src/application/usecase/scheduleLesson.usecase";
import { InstructorInMemoryRepository } from "../../src/infrastructure/instructorInMemory.repository";
import type { AddInstructorRequest, ScheduleLessonRequest } from "../../src/application/type/request.type";

describe('ScheduleLessonUseCase', () => {
  let instructorRepository: InstructorInMemoryRepository;
  let addInstructorUseCase: AddInstructorUseCase;
  let scheduleLessonUseCase: ScheduleLessonUseCase;

  beforeEach(() => {
    instructorRepository = new InstructorInMemoryRepository();
    addInstructorUseCase = new AddInstructorUseCase(instructorRepository);
    scheduleLessonUseCase = new ScheduleLessonUseCase(instructorRepository);
  });

  it('should schedule a lesson successfully if instructor is available', () => {
    // Add an instructor
    const addInstructorRequest: AddInstructorRequest = {
      id: '1',
      name: 'Jane Doe',
      qualifications: ['licenseB'],
    };

    addInstructorUseCase.execute(addInstructorRequest);

    // Schedule a lesson
    const request: ScheduleLessonRequest = {
      instructorId: '1',
      date: '2024-09-30',
      timeSlot: '08:00-10:00',
    };

    scheduleLessonUseCase.execute(request);

    const instructor = instructorRepository.findById('1');
    expect(instructor?.hasAvailability('2024-09-30', '08:00-10:00')).toBe(false);
  });

  it('should throw an error if instructor is not available at the given time', () => {
    // Add an instructor
    const addInstructorRequest: AddInstructorRequest = {
      id: '2',
      name: 'John Smith',
      qualifications: ['licenseA'],
    };

    addInstructorUseCase.execute(addInstructorRequest);

    // Schedule a first lesson
    const firstRequest: ScheduleLessonRequest = {
      instructorId: '2',
      date: '2024-09-30',
      timeSlot: '08:00-10:00',
    };

    scheduleLessonUseCase.execute(firstRequest);

    // Try scheduling another lesson at the same time
    const secondRequest: ScheduleLessonRequest = {
      instructorId: '2',
      date: '2024-09-30',
      timeSlot: '08:00-10:00',
    };

    expect(() => {
      scheduleLessonUseCase.execute(secondRequest);
    }).toThrowError('Instructor is not available at this time');
  });
});
