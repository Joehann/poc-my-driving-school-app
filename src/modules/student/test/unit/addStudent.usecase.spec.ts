import { AddStudentRequest } from "../../src/application/type/student";
import { AddStudentUseCase } from "../../src/application/usecase/addStudent.usecase";
import { StudentInMemoryRepository } from "../../src/infrastructure/studentInMemory.repository";

describe('AddStudentUseCase', () => {
  let studentRepository: StudentInMemoryRepository;
  let addStudentUseCase: AddStudentUseCase;

  beforeEach(() => {
    studentRepository = new StudentInMemoryRepository();
    addStudentUseCase = new AddStudentUseCase(studentRepository);
  });

  it('should add a new student to the repository', () => {
    const request: AddStudentRequest = {
      id: '1',
      name: 'John Doe',
      qualification: 'licenseA',
      phoneNumber: '123456789',
      recordNumber: 'REC123',
      postalAddress: '123 Main St'
    };

    addStudentUseCase.execute(request);

    const student = studentRepository.findById('1');
    expect(student).not.toBeNull();
    expect(student?.name).toBe('John Doe');
    expect(student?.phoneNumber).toBe('123456789');
    expect(student?.recordNumber).toBe('REC123');
    expect(student?.postalAddress).toBe('123 Main St');
  });

  it('should add multiple students to the repository', () => {
    const student1: AddStudentRequest = {
      id: '1',
      name: 'John Doe',
      qualification: 'licenseA',
      phoneNumber: '123456789',
      recordNumber: 'REC123',
      postalAddress: '123 Main St'
    };

    const student2: AddStudentRequest = {
      id: '2',
      name: 'Jane Smith',
      qualification: 'licenseB',
      phoneNumber: '987654321',
      recordNumber: 'REC456',
      postalAddress: '456 Maple St'
    };

    addStudentUseCase.execute(student1);
    addStudentUseCase.execute(student2);

    const allStudents = studentRepository.findAll();
    expect(allStudents.length).toBe(2);
  });
});
