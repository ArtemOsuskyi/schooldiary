import { dataSource } from "../../data-source";
import { Student }    from "../../db/entities";

export const studentRepository = dataSource.getRepository(Student).extend({})