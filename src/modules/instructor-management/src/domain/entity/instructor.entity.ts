import { Qualification } from "../valueObject/qualification.valueObject";
import { QualificationType } from "../type/qualification.type";

export class Instructor {
    constructor(
      public id: string,
      public name: string,
      public qualifications: Qualification[],
      public maxDailyHours: number = 8,
      public maxStudents: number = 20,
      public schedule: Record<string, string[]> = {},
      public weeklyRestDays: string[] = []
    ) {}
  
    // Check if the instructor is qualified to teach a specific license
    isQualifiedFor(licenseType: QualificationType): boolean {
        return this.qualifications.some(q => q.equals(new Qualification(licenseType)));
    }
  
    // Check if the instructor has availability for a given time slot
    hasAvailability(date: string, slot: string): boolean {
      const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
      if (this.weeklyRestDays.includes(dayOfWeek)) {
        return false; // Day off
      }
      
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

    isAvailableForNext3Days(date: string): boolean {
      const today = new Date();
      const targetDate = new Date(date);
      const diffInDays = Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      return diffInDays >= 3;
    }
  }
