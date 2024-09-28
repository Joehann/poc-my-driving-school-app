import { UpdateStudentProgressRequest } from "../../src/application/types/student";
import { UpdateStudentProgressUseCase } from "../../src/application/usecase/updateStudentProgress.usecase";
import { Progress } from "../../src/domain/entity/progress.entity";
import { Student } from "../../src/domain/entity/student.entity";
import { StudentInMemoryRepository } from "../../src/infrastructure/studentInMemory.repository";


describe('UpdateStudentProgressUseCase', () => {
  let studentRepository: StudentInMemoryRepository;
  let updateStudentProgressUseCase: UpdateStudentProgressUseCase;

  beforeEach(() => {
    studentRepository = new StudentInMemoryRepository();
    updateStudentProgressUseCase = new UpdateStudentProgressUseCase(studentRepository);

    const student = new Student('1', 'John Doe', 'licenseA', '123456789', 'REC123', '123 Main St', new Progress());
    studentRepository.create(student);
  });

  it('should update the student\'s progress with a new skill', () => {
    const request: UpdateStudentProgressRequest = {
      studentId: '1',
      skillAcquired: 'Parallel Parking'
    };

    updateStudentProgressUseCase.execute(request);

    const student = studentRepository.findById('1');
    expect(student?.progress.lessonsCompleted).toBe(1);
    expect(student?.progress.skillsAcquired).toContain('Parallel Parking');
  });

  it('should throw an error if the student is not found', () => {
    const request: UpdateStudentProgressRequest = {
      studentId: '999',
      skillAcquired: 'Parallel Parking'
    };

    expect(() => updateStudentProgressUseCase.execute(request)).toThrowError('Student not found');
  });
});
