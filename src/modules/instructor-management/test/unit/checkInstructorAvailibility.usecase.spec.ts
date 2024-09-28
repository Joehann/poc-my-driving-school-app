import { AddInstructorUseCase } from "../../src/application/usecase/addInstructor.usecase";
import { CheckAvailabilityRequest, CheckInstructorAvailabilityUseCase } from "../../src/application/usecase/checkInstructorAvailibility.usecase";
import { InstructorInMemoryRepository } from "../../src/infrastructure/instructorInMemory.repository";
import type{ AddInstructorRequest } from "../../src/application/type/request.type";

describe('CheckInstructorAvailabilityUseCase', () => {
  let instructorRepository: InstructorInMemoryRepository;
  let addInstructorUseCase: AddInstructorUseCase;
  let checkInstructorAvailabilityUseCase: CheckInstructorAvailabilityUseCase;

  beforeEach(() => {
    instructorRepository = new InstructorInMemoryRepository();
    addInstructorUseCase = new AddInstructorUseCase(instructorRepository);
    checkInstructorAvailabilityUseCase = new CheckInstructorAvailabilityUseCase(instructorRepository);
  });

  it('should return true if the instructor is available', () => {
    const addInstructorRequest: AddInstructorRequest = {
      id: '1',
      name: 'John Doe',
      qualifications: ['licenseA'],
    };

    addInstructorUseCase.execute(addInstructorRequest);

    const checkAvailabilityRequest: CheckAvailabilityRequest = {
      instructorId: '1',
      date: '2024-10-05',
      timeSlot: '08:00-10:00',
    };

    const isAvailable = checkInstructorAvailabilityUseCase.execute(checkAvailabilityRequest);
    expect(isAvailable).toBe(true);
  });

  it('should throw an error if the instructor is not available 3 days in advance', () => {
    const addInstructorRequest: AddInstructorRequest = {
      id: '2',
      name: 'Jane Smith',
      qualifications: ['licenseB'],
    };

    addInstructorUseCase.execute(addInstructorRequest);

    const checkAvailabilityRequest: CheckAvailabilityRequest = {
      instructorId: '2',
      date: '2024-09-29',
      timeSlot: '08:00-10:00',
    };

    expect(() => {
      checkInstructorAvailabilityUseCase.execute(checkAvailabilityRequest);
    }).toThrowError('Instructor must be available at least 3 days in advance');
  });
});
