import { Student } from "../students/shared/student.model";

export class Course {

  constructor(
    public id: string,
    public name: string,
    public description: string,
    public exercises: number,
    public hours: number,
    public students: Student[]
  ) { }

}
