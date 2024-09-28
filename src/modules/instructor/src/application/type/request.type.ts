import type { QualificationType } from "../../domain/type/qualification.type";

export type AddInstructorRequest = {
    id: string;
    name: string;
    qualifications: QualificationType[];
  };
  
  export type ScheduleLessonRequest = {
    instructorId: string;
    date: string;
    timeSlot: string; // Example: "08:00-10:00"
  };