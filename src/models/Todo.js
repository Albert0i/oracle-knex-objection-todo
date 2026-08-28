import { Model, knexSnakeCaseMappers } from 'objection';

class Todo extends Model {
  static get tableName() {
    return 'TODO_LIST';
  }

  static get idColumn() {
    return 'ID';
  }

  static get columnNameMappers() {
    return {
      parse(obj) {
        return {
          id: obj.ID,
          title: obj.TITLE,
          status: obj.STATUS,
          createdAt: obj.CREATED_AT
        };
      },
      format(obj) {
        return {
          ID: obj.id,
          TITLE: obj.title,
          STATUS: obj.status,
          CREATED_AT: obj.createdAt
        };
      }
    };
  }
}

export default Todo; 