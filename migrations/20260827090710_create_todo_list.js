/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('TODO_LIST', (table) => {
    table.increments('ID').primary();          // auto-increment primary key
    table.string('TITLE', 255).notNullable();  // task title
    table.string('STATUS', 50).notNullable();  // e.g. pending, done
    table.timestamp('CREATED_AT').defaultTo(knex.fn.now()); // creation time
    table.string('LOCATION', 255);             // optional location
    table.string('TEL', 50);                   // optional phone number
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('TODO_LIST');
}
