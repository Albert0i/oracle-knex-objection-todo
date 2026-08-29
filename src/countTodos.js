import db from './db.js';
import Todo from './models/Todo.js';

async function run() {
  try {
    console.log('Option 1: Return plain objects (no model hydration)')
    const counts1 = await Todo.query()
      .select('STATUS')
      .count('* as count')
      .groupBy('STATUS');
    console.log(counts1);

    console.log('Option 2: Use Knex directly')
    const counts2 = await knex('TODO_LIST')
          .select('STATUS')
          .count('* as count')
          .groupBy('STATUS');
    console.log(counts2);
  } catch (err) {
    console.error(err);
  } finally {
    await db.destroy();   // closes Oracle connections
  }
}

run();
