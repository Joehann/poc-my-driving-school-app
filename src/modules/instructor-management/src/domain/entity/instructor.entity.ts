import { Qualification } from "../valueObject/qualification.valueObject";
import type { QualificationType } from "../type/qualification.type";

export class Instructor {
    constructor(
      public id: string,
      public name: string,
      public qualifications: Qualification[],
      public maxDailyHours: number = 8,
      public maxStudents: number = 20,
      public schedule: Record<string, string[]> = {}
    ) {}
  
    // Check if the instructor is qualified to teach a specific license
    isQualifiedFor(licenseType: QualificationType): boolean {
        return this.qualifications.some(q => q.equals(new Qualification(licenseType)));
    }
  
    // Check if the instructor has availability for a given time slot
    hasAvailability(date: string, slot: string): boolean {
      if (this.schedule[date]) {
        return !this.schedule[date].includes(slot);
      }
      return true;
    }
  
    // Add a lesson to the schedule
    bookLesson(date: string, slot: string) {
      if (!this.schedule[date]) {
        this.schedule[date] = [];
      }
      this.schedule[date].push(slot);
    }
  
    // Ensure the instructor doesn't exceed 8 hours of lessons per day
    totalHoursOnDay(date: string): number {
      const lessons = this.schedule[date] || [];
      return lessons.length * 2;
    }
  
    canWorkOnDay(date: string): boolean {
      return this.totalHoursOnDay(date) < this.maxDailyHours;
    }
  }
