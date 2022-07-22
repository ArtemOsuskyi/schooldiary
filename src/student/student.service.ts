import { Injectable }       from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Student }          from "../db/entities";
import { Repository }       from "typeorm";

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>
  ) {
  }

  async getStudent(studentId: number) {
    return await this.studentRepository.findOneBy({
      id: studentId
    })
  }

  async getAllStudents() {
    return await this.studentRepository.find()
  }
}
