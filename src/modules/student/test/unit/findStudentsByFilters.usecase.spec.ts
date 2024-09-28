// src/module/student-management/test/unit/findStudentsByFilters.usecase.spec.ts

import { FindStudentsByFiltersUseCase } from "../../src/application/usecase/findStudentsByFilters.usecase";
import { Progress } from "../../src/domain/entity/progress.entity";
import { Student } from "../../src/domain/entity/student.entity";
import { StudentInMemoryRepository } from "../../src/infrastructure/studentInMemory.repository";



describe('FindStudentsByFiltersUseCase', () => {
  let studentRepository: StudentInMemoryRepository;
  let findStudentsByFiltersUseCase: FindStudentsByFiltersUseCase;

  beforeEach(() => {
    studentRepository = new StudentInMemoryRepository();
    findStudentsByFiltersUseCase = new FindStudentsByFiltersUseCase(studentRepository);

    const students = [
      new Student('1', 'John Doe', 'licenseA', '123456789', 'REC123', '123 Main St', new Progress()),
      new Student('2', 'Jane Smith', 'licenseB', '987654321', 'REC456', '456 Maple St', new Progress()),
      new Student('3', 'John Davis', 'licenseA', '555555555', 'REC789', '789 Oak St', new Progress())
    ];

    students.forEach(student => studentRepository.create(student));
  });

  it('should return students filtered by name', () => {
    const filteredStudents = findStudentsByFiltersUseCase.execute({ name: 'John' });
    expect(filteredStudents.length).toBe(2);
    expect(filteredStudents[0].name).toContain('John');
  });

  it('should return students filtered by phone number', () => {
    const filteredStudents = findStudentsByFiltersUseCase.execute({ phoneNumber: '987654321' });
    expect(filteredStudents.length).toBe(1);
    expect(filteredStudents[0].phoneNumber).toBe('987654321');
  });

  it('should return students filtered by record number', () => {
    const filteredStudents = findStudentsByFiltersUseCase.execute({ recordNumber: 'REC456' });
    expect(filteredStudents.length).toBe(1); 
    expect(filteredStudents[0].recordNumber).toBe('REC456');
  });

  it('should return students filtered by multiple criteria', () => {
    const filteredStudents = findStudentsByFiltersUseCase.execute({
      name: 'John',
      phoneNumber: '555555555'
    });
    expect(filteredStudents.length).toBe(1); 
    expect(filteredStudents[0].name).toBe('John Davis');
    expect(filteredStudents[0].phoneNumber).toBe('555555555');
  });

  it('should return all students if no filters are provided', () => {
    const filteredStudents = findStudentsByFiltersUseCase.execute({});
    expect(filteredStudents.length).toBe(3); 
  });

  it('should return an empty array if no students match the filters', () => {
    const filteredStudents = findStudentsByFiltersUseCase.execute({
      name: 'Non-existent'
    });
    expect(filteredStudents.length).toBe(0); 
  });
});
