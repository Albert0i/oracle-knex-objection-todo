import knex from './db.js';
import Todo from './models/Todo.js';

async function seedTodos() {
  const todos = [
    { title: 'Fix the quantum interference device broken by Stuart Bloom' },
    { title: 'Escape the repressive AI on the idyllic version of Earth' },
    { title: 'Enlist a powerful wizard to help Bert find a sorcery gift' },
    { title: 'Survive the post-apocalyptic Pasadena and avoid giant moths' },
    { title: 'Barter canned vegetables and cat food for rare comic books' },
    { title: 'Overthrow military dictator Barry Kripke in alternate reality' },
    { title: 'Locate Denise after she mysteriously disappears in the multiverse' },
    { title: 'Convince doctors in the mental institution that the multiverse is real' },
    { title: 'Break out of the Matrix pods before reality resets again' },
    { title: 'Undo the multiverse Armageddon accidentally unleashed by the gang' },
    { title: 'Help Gary secure his new job working for UPS' },
    { title: 'Find the original universe where Leonard and Sheldon live' }
  ];

  try {
    for (const todo of todos) {
      await Todo.query().insert(todo);
    }
    console.log('Seeded successfully');
  } catch (err) {
    console.error(err);
  } finally {
    await knex.destroy();   // now knex is defined
  }
}

seedTodos();
