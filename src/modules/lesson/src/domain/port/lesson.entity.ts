import { Lesson } from '../entity/lesson.entity';

export interface LessonRepository {
  create(lesson: Lesson): void;
  findById(id: string): Lesson | null;
  findByInstructorAndDate(instructorId: string, date: string): Lesson[];
  delete(lesson: Lesson): void;
}
