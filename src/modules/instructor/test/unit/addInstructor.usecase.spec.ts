import { AddInstructorRequest } from "../../src/application/type/request.type";
import { AddInstructorUseCase } from "../../src/application/usecase/addInstructor.usecase";
import { InstructorInMemoryRepository } from "../../src/infrastructure/instructorInMemory.repository";


describe('AddInstructorUseCase', () => {
  let instructorRepository: InstructorInMemoryRepository;
  let addInstructorUseCase: AddInstructorUseCase;

  beforeEach(() => {
    instructorRepository = new InstructorInMemoryRepository();
    addInstructorUseCase = new AddInstructorUseCase(instructorRepository);
  });

  it('should add a new instructor successfully', () => {
    const request: AddInstructorRequest = {
      id: '1',
      name: 'John Doe',
      qualifications: ['licenseA'],
    };

    addInstructorUseCase.execute(request);

    const instructor = instructorRepository.findById('1');
    expect(instructor).not.toBeNull();
    expect(instructor?.name).toBe('John Doe');
    expect(instructor?.qualifications[0].type).toBe('licenseA');
  });
});
