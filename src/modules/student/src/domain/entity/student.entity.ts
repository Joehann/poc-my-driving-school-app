import { Progress } from './progress.entity';

export class Student {
  constructor(
    public id: string,
    public name: string,
    public qualification: 'licenseA' | 'licenseB',
    public phoneNumber: string,
    public recordNumber: string,
    public postalAddress: string,
    public progress: Progress = new Progress()
  ) {}

  updateProgress(skill: string): void {
    this.progress.addLesson(skill);
  }
}
