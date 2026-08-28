/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.alterTable('TODO_LIST', (table) => {
    table.string('LOCATION', 100);   // VARCHAR2(100)
    table.string('TEL', 20);         // VARCHAR2(20)
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.alterTable('TODO_LIST', (table) => {
    table.dropColumn('LOCATION');
    table.dropColumn('TEL');
  });
};
