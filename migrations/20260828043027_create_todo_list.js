/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('TODO_LIST', (table) => {
    table.increments('ID').primary();                 // identity PK
    table.string('TITLE', 100).notNullable();         // VARCHAR2(100) NOT NULL
    table.string('STATUS', 20).defaultTo('PENDING');  // default 'PENDING'
    table.timestamp('CREATED_AT').defaultTo(knex.fn.now()); // default CURRENT_TIMESTAMP
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('TODO_LIST');
};
