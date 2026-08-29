/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  // await knex('TABLE_NAME').del();
  
  // Inserts seed entries
  // await knex('TABLE_NAME').insert([]);
}
