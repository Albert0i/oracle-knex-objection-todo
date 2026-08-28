
# Part 1: Knex Migrations — Creating Your First TODO List Table

## Introduction

Every application starts with data. Whether you’re building a blog, a shop, or a task manager, you need a reliable way to define and evolve your database schema. In the Node.js world, **Knex.js** is a powerful query builder that also provides migrations — version‑controlled scripts that describe how your database should change over time.

In this first part of our series, we’ll set up Knex with Oracle and create a simple `TODO_LIST` table. This will be the foundation for everything else we’ll build.

---

## Why Migrations?

Without migrations, developers often run ad‑hoc SQL commands to create or alter tables. That works for one person, but quickly becomes messy in a team. Migrations solve this by:

- **Versioning schema changes**: Each migration file is a step in your database’s evolution.
- **Automating upgrades and rollbacks**: Knex can apply or undo migrations consistently.
- **Tracking applied changes**: A special `knex_migrations` table records which migrations have been run.

Think of migrations as “Git for your database schema.”

---

## Step 1: Install Knex and Oracle Driver

In your project folder, install Knex and the Oracle driver:

```bash
npm install knex oracledb
```

---

## Step 2: Initialize Knex

Generate a starter config:

```bash
npx knex init
```

This creates a `knexfile.js`. Edit it to configure your Oracle connection:

```js
export default {
  development: {
    client: 'oracledb',
    connection: {
      user: 'ALBERTOI',
      password: 'your_password',
      connectString: 'localhost/XEPDB1'
    },
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  }
};
```

---

## Step 3: Create the Migration File

Generate a migration:

```bash
npm run migrate:make create_todo_list
```

This creates a file in `./migrations` with a timestamp prefix.

Open it and define the schema:

```js
export async function up(knex) {
  await knex.schema.createTable('TODO_LIST', (table) => {
    table.increments('ID').primary();       // Auto-increment primary key
    table.string('TITLE', 255).notNullable(); // Task title
    table.string('STATUS', 50).notNullable(); // Task status
    table.timestamp('CREATED_AT').defaultTo(knex.fn.now()); // Timestamp
  });
}

export async function down(knex) {
  await knex.schema.dropTable('TODO_LIST');
}
```

---

## Step 4: Run the Migration

Apply it:

```bash
npm run migrate:latest
```

Knex will:
- Create the `TODO_LIST` table.
- Record the migration in `KNEX_MIGRATIONS`.

---

## Step 5: Verify in Oracle

Check the table structure:

```sql
DESC TODO_LIST;
```

You should see:

| Column     | Type        |
|------------|-------------|
| ID         | NUMBER      |
| TITLE      | VARCHAR2(255) |
| STATUS     | VARCHAR2(50)  |
| CREATED_AT | TIMESTAMP   |

---

## Conclusion

You’ve just created your first table with Knex migrations. This is the foundation of a reliable workflow: schema changes are scripted, versioned, and reproducible. In the next part, we’ll populate this table with sample data using **seeds**.

