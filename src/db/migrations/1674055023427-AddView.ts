import { MigrationInterface, QueryRunner } from 'typeorm';
import { View } from 'typeorm/schema-builder/view/View';
import { Student } from '../entities';

export class AddView1674055023427 implements MigrationInterface {
  private readonly view = new View({
    schema: 'public',
    name: 'students_with_grades',
    expression: (connection) => {
      return connection
        .getRepository(Student)
        .createQueryBuilder('student')
        .leftJoinAndSelect('student.grades', 'grades');
    },
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createView(this.view);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropView(this.view);
  }
}
