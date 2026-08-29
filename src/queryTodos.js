import db from './db.js';
import Todo from './models/Todo.js';

async function run() {
  try {
    const todos = await Todo.query();
    console.log('Fetch all todos')
    console.log(todos);

    const pending = await Todo.query().where('STATUS', 'PENDING');
    console.log('Fetch pending tasks')
    console.log(pending);
  } catch (err) {
    console.error(err);
  } finally {
    await db.destroy();   // closes Oracle connections
  }
}

run();
