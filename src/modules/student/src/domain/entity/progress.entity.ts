export class Progress {
    constructor(public lessonsCompleted: number = 0, public skillsAcquired: string[] = []) {}
  
    addLesson(skill: string): void {
      this.lessonsCompleted += 1;
      this.skillsAcquired.push(skill);
    }
  }