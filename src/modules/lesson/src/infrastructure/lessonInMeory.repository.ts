import { Lesson } from '../domain/entity/lesson.entity';
import { LessonRepository } from '../domain/port/lesson.entity';

export class LessonInMemoryRepository implements LessonRepository {
  private lessons: Lesson[] = [];

  create(lesson: Lesson): void {
    this.lessons.push(lesson);
  }

  findById(id: string): Lesson | null {
    return this.lessons.find(lesson => lesson.id === id) || null;
  }

  findByInstructorAndDate(instructorId: string, date: string): Lesson[] {
    return this.lessons.filter(lesson => lesson.instructor.id === instructorId && lesson.date === date);
  }

  delete(lesson: Lesson): void {
    this.lessons = this.lessons.filter(l => l.id !== lesson.id);
  }
}
