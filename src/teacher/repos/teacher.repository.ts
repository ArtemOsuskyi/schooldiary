import { dataSource } from "../../data-source";
import { Teacher }    from "../../db/entities";

export const teacherRepository = dataSource.getRepository(Teacher).extend({})