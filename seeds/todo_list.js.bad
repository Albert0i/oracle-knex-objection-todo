/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('TODO_LIST').del();

  const todos = [
    { TITLE: 'Fix the quantum interference device broken by Stuart Bloom', STATUS: 'PENDING' },
    { TITLE: 'Escape the repressive AI on the idyllic version of Earth', STATUS: 'PENDING' },
    { TITLE: 'Enlist a powerful wizard to help Bert find a sorcery gift', STATUS: 'PENDING' },
    { TITLE: 'Survive the post-apocalyptic Pasadena and avoid giant moths', STATUS: 'PENDING' },
    { TITLE: 'Barter canned vegetables and cat food for rare comic books', STATUS: 'PENDING' },
    { TITLE: 'Overthrow military dictator Barry Kripke in alternate reality', STATUS: 'PENDING' },
    { TITLE: 'Locate Denise after she mysteriously disappears in the multiverse', STATUS: 'PENDING' },
    { TITLE: 'Convince doctors in the mental institution that the multiverse is real', STATUS: 'PENDING' },
    { TITLE: 'Break out of the Matrix pods before reality resets again', STATUS: 'PENDING' },
    { TITLE: 'Undo the multiverse Armageddon accidentally unleashed by the gang', STATUS: 'PENDING' },
    { TITLE: 'Help Gary secure his new job working for UPS', STATUS: 'PENDING' },
    { TITLE: 'Find the original universe where Leonard and Sheldon live', STATUS: 'PENDING' }
  ];

  for (const todo of todos) {
    await knex('TODO_LIST').insert(todo);
  }
}
