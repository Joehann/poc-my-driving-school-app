
import { Instructor } from "../../../instructor/src/domain/entity/instructor.entity";
import { Qualification } from "../../../instructor/src/domain/valueObject/qualification.valueObject";
import { InstructorInMemoryRepository } from "../../../instructor/src/infrastructure/instructorInMemory.repository";
import { Progress } from "../../../student/src/domain/entity/progress.entity";
import { Student } from "../../../student/src/domain/entity/student.entity";
import { StudentInMemoryRepository } from "../../../student/src/infrastructure/studentInMemory.repository";
import { ScheduleLessonUseCase } from "../../src/application/usecase/scheduleLesson.usecase";
import { LessonInMemoryRepository } from "../../src/infrastructure/lessonInMeory.repository";


describe('ScheduleLessonUseCase', () => {
  let lessonRepository: LessonInMemoryRepository;
  let studentRepository: StudentInMemoryRepository;
  let instructorRepository: InstructorInMemoryRepository;
  let scheduleLessonUseCase: ScheduleLessonUseCase;

  beforeEach(() => {
    lessonRepository = new LessonInMemoryRepository();
    studentRepository = new StudentInMemoryRepository();
    instructorRepository = new InstructorInMemoryRepository();
    scheduleLessonUseCase = new ScheduleLessonUseCase(lessonRepository, instructorRepository, studentRepository);

    // Ajouter un élève et un moniteur
    const student = new Student('1', 'John Doe', 'licenseA', '123456789', 'REC123', '123 Main St', new Progress());
    const instructor = new Instructor('1', 'Jane Smith', [new Qualification('licenseA')]);
    studentRepository.create(student);
    instructorRepository.create(instructor);
  });

  it('should schedule a lesson if the instructor is available', () => {
    const request = {
      studentId: '1',
      instructorId: '1',
      date: '2024-10-01',
      timeSlot: '08:00-10:00'
    };

    scheduleLessonUseCase.execute(request);

    const lessons = lessonRepository.findByInstructorAndDate('1', '2024-10-01');
    expect(lessons.length).toBe(1);
  });

  it('should throw an error if the instructor is already booked at the same time', () => {
    const request = {
      studentId: '1',
      instructorId: '1',
      date: '2024-10-01',
      timeSlot: '08:00-10:00'
    };

    scheduleLessonUseCase.execute(request);

    expect(() => {
      scheduleLessonUseCase.execute(request);
    }).toThrowError('Instructor is already booked at this time');
  });
});
