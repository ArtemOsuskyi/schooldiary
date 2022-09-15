import { MigrationInterface, QueryRunner } from 'typeorm';

export class CheckDateConstraint1663245836612 implements MigrationInterface {
  constraint = 'CheckDateConstraintGreat';
  constraint1 = 'CheckDateConstraintSmall';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "study_year"
          ADD CONSTRAINT ${this.constraint} CHECK ("start_date" < "end_date");
      ALTER TABLE "study_year"
          ADD CONSTRAINT ${this.constraint1} CHECK ( "end_date" > "start_date" )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "study_year"
          DROP CONSTRAINT ${this.constraint};
      ALTER TABLE "study_year"
          DROP CONSTRAINT ${this.constraint1}`,
    );
  }
}
