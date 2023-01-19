import { MigrationInterface, QueryRunner, TableCheck } from 'typeorm';

export class HomeworkDeadlineCheck1663246501646 implements MigrationInterface {
  private readonly tableName = 'homework';
  private readonly constraint = new TableCheck({
    name: 'homework_deadline_check',
    columnNames: ['deadline'],
    expression: `"deadline" > now()::date`,
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createCheckConstraint(this.tableName, this.constraint);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropCheckConstraint(this.tableName, this.constraint);
  }
}
