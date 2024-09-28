import type { QualificationType } from "../type/qualification.type";

export class Qualification {
    constructor(public type: QualificationType) {}
  
    equals(other: Qualification): boolean {
      return other.type === this.type;
    }
  }
  