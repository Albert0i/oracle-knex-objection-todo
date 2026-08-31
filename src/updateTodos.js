import db from './db.js';
import Todo from './models/Todo.js';

async function run() {
  const id = 120; 

  try {
    console.log('Mark a task as completed')
    await Todo.query().findById(id).patch({ status: 'COMPLETED' }) ;
  } catch (err) {
    console.error(err);
  } finally {
    await db.destroy();   // closes Oracle connections
  }
}

run();
