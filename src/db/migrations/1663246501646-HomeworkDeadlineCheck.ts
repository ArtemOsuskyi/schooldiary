import { MigrationInterface, QueryRunner } from 'typeorm';

export class HomeworkDeadlineCheck1663246501646 implements MigrationInterface {
  constraint = 'HomeworkDeadlineCheck';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "homework" ADD CONSTRAINT ${this.constraint} CHECK ( "deadline" > now()::date)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "homework" DROP CONSTRAINT ${this.constraint}`,
    );
  }
}
