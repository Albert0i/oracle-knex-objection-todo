/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Clear existing entries
  await knex('TODO_LIST').del();

  // Your array of todos
  const todos = [
    { TITLE: 'Fix the quantum interference device broken by Stuart Bloom', STATUS: 'pending' },
    { TITLE: 'Escape the repressive AI on the idyllic version of Earth', STATUS: 'pending' },
    { TITLE: 'Enlist a powerful wizard to help Bert find a sorcery gift', STATUS: 'pending' },
    { TITLE: 'Survive the post-apocalyptic Pasadena and avoid giant moths', STATUS: 'pending' },
    { TITLE: 'Barter canned vegetables and cat food for rare comic books', STATUS: 'pending' },
    { TITLE: 'Overthrow military dictator Barry Kripke in alternate reality', STATUS: 'pending' },
    { TITLE: 'Locate Denise after she mysteriously disappears in the multiverse', STATUS: 'pending' },
    { TITLE: 'Convince doctors in the mental institution that the multiverse is real', STATUS: 'pending' },
    { TITLE: 'Break out of the Matrix pods before reality resets again', STATUS: 'pending' },
    { TITLE: 'Undo the multiverse Armageddon accidentally unleashed by the gang', STATUS: 'pending' },
    { TITLE: 'Help Gary secure his new job working for UPS', STATUS: 'pending' },
    { TITLE: 'Find the original universe where Leonard and Sheldon live', STATUS: 'pending' }
  ];

  // Insert one by one (Oracle-compatible)
  for (const todo of todos) {
    await knex('TODO_LIST').insert(todo);
  }
}
