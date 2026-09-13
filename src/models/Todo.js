/**
 * Todo.js
 */
import { Model } from 'objection';

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
      format(javascriptObj) {
        if (!javascriptObj) return javascriptObj;
        const dbPayload = {};
        
        // Map fields safely only if they are defined on your code object
        if (javascriptObj.id !== undefined) dbPayload.ID = javascriptObj.id;
        if (javascriptObj.title !== undefined) dbPayload.TITLE = javascriptObj.title;
        if (javascriptObj.status !== undefined) dbPayload.STATUS = javascriptObj.status;
        if (javascriptObj.createdAt !== undefined) dbPayload.CREATED_AT = javascriptObj.createdAt;
        
        return dbPayload;
      }
    };
  }
}

export default Todo; 