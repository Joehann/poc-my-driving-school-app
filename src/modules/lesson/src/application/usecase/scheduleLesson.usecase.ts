import { InstructorRepository } from 'driving-school/modules/instructor/src/domain/port/instructor.repository';
import { StudentRepository } from 'driving-school/modules/student/src/domain/port/student.repository';
import { Lesson } from '../../domain/entity/lesson.entity';
import { LessonRepository } from '../../domain/port/lesson.entity';
import { ScheduleLessonRequest } from '../type/lesson.type';

export class ScheduleLessonUseCase {
  constructor(
    private lessonRepository: LessonRepository,
    private instructorRepository: InstructorRepository,
    private studentRepository: StudentRepository
  ) {}

  execute(request: ScheduleLessonRequest): void {
    const student = this.studentRepository.findById(request.studentId);
    const instructor = this.instructorRepository.findById(request.instructorId);

    if (!student) {
      throw new Error('Student not found');
    }

    if (!instructor) {
      throw new Error('Instructor not found');
    }

    const existingLessons = this.lessonRepository.findByInstructorAndDate(request.instructorId, request.date);
    const conflictingLesson = existingLessons.find(lesson => lesson.isAtSameTime(request.date, request.timeSlot));

    if (conflictingLesson) {
      throw new Error('Instructor is already booked at this time');
    }

    const totalHours = existingLessons.length * 2;
    if (totalHours >= instructor.maxDailyHours) {
      throw new Error('Instructor cannot work more than the allowed daily hours');
    }

    const lesson = new Lesson(
      Date.now().toString(),
      student,
      instructor,
      request.date,
      request.timeSlot
    );

    this.lessonRepository.create(lesson);
  }
}
