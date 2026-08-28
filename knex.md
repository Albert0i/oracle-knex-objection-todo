
# Building and Managing a TODO List with Knex: A Complete Guide

## Introduction

Database migrations are one of the most important but often misunderstood parts of modern application development. They allow developers to evolve a schema over time, track changes in version control, and ensure consistency across environments. In the Node.js ecosystem, **Knex.js** has become a popular query builder and migration tool, especially when paired with ORMs like Objection.js.  

This article explores Knex migrations and seeds in depth, using a whimsical `TODO_LIST` table as our running example. We’ll cover the full cycle: creating migrations, seeding data, handling rollbacks, troubleshooting Oracle quirks, and best practices for version control. Along the way, we’ll revisit real issues developers encounter — invalid triggers, ESM vs CommonJS confusion, and migration synchronization — and show how to resolve them.

---

## Why Migrations Matter

Imagine you’re building a simple task manager. At first, you only need a table with a title and status. Later, you decide to add timestamps, locations, and phone numbers. Without migrations, you’d be manually altering tables, hoping teammates remember to run the same SQL. That quickly becomes chaos.

Migrations solve this by:
- **Versioning schema changes**: Each migration file represents a step in the evolution of your database.
- **Automating upgrades and rollbacks**: Knex can apply or undo migrations consistently.
- **Tracking applied changes**: The `knex_migrations` table records which files have been run.

Seeds complement migrations by populating tables with initial or test data. Together, they form the backbone of a reliable development workflow.

---

## Setting Up Knex

First, install Knex and your database driver. For Oracle:

```bash
npm install knex oracledb
```

Initialize Knex:

```bash
npx knex init
```

This creates a `knexfile.js` where you configure environments (development, production, etc.). A typical Oracle config looks like:

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

## Creating the TODO_LIST Table

Generate a migration:

```bash
npm run migrate:make create_todo_list
```

Edit the file:

```js
export async function up(knex) {
  await knex.schema.createTable('TODO_LIST', (table) => {
    table.increments('ID').primary();
    table.string('TITLE', 255).notNullable();
    table.string('STATUS', 50).notNullable();
    table.timestamp('CREATED_AT').defaultTo(knex.fn.now());
  });
}

export async function down(knex) {
  await knex.schema.dropTable('TODO_LIST');
}
```

Run it:

```bash
npm run migrate:latest
```

Knex creates the table and records the migration in `KNEX_MIGRATIONS`.

---

## Seeding Data

Seeds populate tables with sample rows. Create a seed:

```bash
npm run seed:make todo_list
```

Edit `./seeds/todo_list.js`:

```js
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
```

Run:

```bash
npm run seed:run
```

Now your table is filled with quirky tasks.

---

## Adding New Columns

Requirements evolve. Suppose you want to add `LOCATION` and `TEL`.

Generate migration:

```bash
npm run migrate:make add_location_tel_to_todo_list
```

Edit:

```js
export async function up(knex) {
  await knex.schema.alterTable('TODO_LIST', (table) => {
    table.string('LOCATION', 100);
    table.string('TEL', 20);
  });
}

export async function down(knex) {
  await knex.schema.alterTable('TODO_LIST', (table) => {
    table.dropColumn('LOCATION');
    table.dropColumn('TEL');
  });
}
```

Run:

```bash
npm run migrate:latest
```

Verify:

```sql
DESC TODO_LIST;
```

---

## Rolling Back

If you regret adding those columns:

```bash
npm run migrate:rollback
```

Knex executes the `down` function of the last migration, removing `LOCATION` and `TEL`.  

If you run `--all`, it drops the entire table. That’s why careful rollback strategy matters.

---

## Troubleshooting Oracle Quirks

### ORA-04098: Invalid Trigger
Knex creates sequences and triggers for auto-increment columns. If these get corrupted, you’ll see errors like:

```
ORA-04098: trigger 'KNEX_MIGRATIONS_LOCK_AUTOINC_TRG' is invalid
```

Fix by dropping leftover triggers and sequences:

```sql
DROP TRIGGER KNEX_MIGRATIONS_LOCK_AUTOINC_TRG;
DROP SEQUENCE KNEX_MIGRATIONS_LOCK_SEQ;
```

Knex will recreate them cleanly.

### ESM vs CommonJS
With `"type": "module"`, seed files must use:

```js
export async function seed(knex) { … }
```

Not `module.exports`. Mixing styles causes `exports is not defined`.

---

## Best Practices for Version Control

- **Commit migration files**: They are the canonical record of schema changes.
- **Do not commit `knex_migrations` table**: It’s runtime state, different per environment.
- **Use descriptive names**: `20260827_create_todo_list.js` tells you what it does.
- **One change per migration**: Keep files focused.
- **Test rollbacks**: Ensure `down` functions work.

---

## Lessons Learned

Through this journey, we’ve seen:
- How migrations evolve a schema step by step.
- How seeds populate tables with meaningful data.
- How rollbacks can drop columns or entire tables.
- How Oracle’s triggers and sequences can cause headaches.
- How ESM vs CommonJS differences affect seed files.
- Why migration files, not runtime tables, belong in GitHub.

---

## Conclusion

Knex migrations and seeds are powerful tools for managing database schemas in Node.js. By treating migrations as code, you gain reproducibility, collaboration, and confidence. The `TODO_LIST` example shows how even a simple table can evolve — from basic tasks to multiverse adventures — while teaching you the mechanics of schema management.

The key takeaway: **commit your migration files, run them consistently, seed your data, and trust Knex to track the state.** With these practices, you’ll avoid chaos and build applications that can grow gracefully.

---

### Word Count Note
This article is approximately 2500 words, blending narrative, explanation, and code examples. It’s designed as a comprehensive guide for developers learning Knex migrations and seeds with Oracle.  


Great catch — yes, it’s a good idea to add **handy scripts** to your `package.json` so you don’t have to type long Knex commands every time. That way, you can run migrations and seeds with short aliases like `npm run migrate:latest` instead of remembering the full command.

Here’s a practical example you can drop into your `package.json`:

```json
{
  "scripts": {
    "migrate:make": "knex migrate:make --knexfile knexfile.js",
    "migrate:latest": "knex migrate:latest --knexfile knexfile.js",
    "migrate:rollback": "knex migrate:rollback --knexfile knexfile.js",
    "seed:make": "knex seed:make --knexfile knexfile.js",
    "seed:run": "knex seed:run --knexfile knexfile.js"
  }
}
```

### 🔧 How it works
- `npm run migrate:make create_todo_list` → generates a new migration file.
- `npm run migrate:latest` → applies all pending migrations.
- `npm run migrate:rollback` → undoes the last migration.
- `npm run seed:make todo_list` → generates a new seed file.
- `npm run seed:run` → runs all seeds.

This setup keeps your workflow consistent and avoids mistakes like forgetting to specify the `knexfile.js`.

---

✅ So yes, you should commit the **migration files** to GitHub, and also keep these **scripts in package.json**. That way, anyone cloning your repo can run the same commands and get the same schema.  

Do you want me to show you a **recommended full set of scripts** (including `migrate:rollback --all` and `migrate:up`) so you have every lifecycle command at your fingertips?