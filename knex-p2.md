Here’s **Part 2 of the tutorial series** — continuing directly from where we left off in Part 1. This post focuses on **seeding the TODO_LIST table** with sample data.

---

# Part 2: Knex Seeding — Populating Your TODO List Table

## Introduction

In Part 1, we created a `TODO_LIST` table using Knex migrations. A table without data isn’t very useful, though. That’s where **seeds** come in. Seeds are scripts that insert initial or sample data into your database. They’re perfect for testing, demos, or populating lookup tables.

In this part, we’ll write a seed file that fills our `TODO_LIST` with whimsical tasks, run it, and troubleshoot common pitfalls.

---

## Why Seeds?

Seeds help you:
- **Bootstrap your database** with meaningful data.
- **Test queries and APIs** against realistic records.
- **Share consistent datasets** across environments.

Unlike migrations, seeds don’t change the schema — they populate it.

---

## Step 1: Create a Seed File

Generate a seed:

```bash
npm run seed:make todo_list
```

This creates `./seeds/todo_list.js`.

---

## Step 2: Write the Seed Script

Since our project uses `"type": "module"` in `package.json`, we must use **ESM syntax**:

```js
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Clear existing entries
  await knex('TODO_LIST').del();

  // Array of sample tasks
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

  // Insert one by one (Oracle-friendly)
  for (const todo of todos) {
    await knex('TODO_LIST').insert(todo);
  }
}
```

---

## Step 3: Run the Seed

Execute:

```bash
npm run seed:run
```

Knex will:
- Delete existing rows in `TODO_LIST`.
- Insert the twelve sample tasks.

---

## Step 4: Verify in Oracle

Query the table:

```sql
SELECT * FROM TODO_LIST;
```

You should see rows like:

| ID | TITLE                                                      | STATUS   | CREATED_AT          |
|----|------------------------------------------------------------|----------|---------------------|
| 1  | Fix the quantum interference device broken by Stuart Bloom | PENDING  | 28-AUG-26 14:45:00 |
| 2  | Escape the repressive AI on the idyllic version of Earth   | PENDING  | 28-AUG-26 14:45:00 |
| …  | …                                                          | …        | …                   |

---

## Common Pitfalls

- **“exports is not defined” error**: Happens if you use CommonJS (`module.exports`) in a project with `"type": "module"`. Fix by using `export async function seed`.
- **Multi-row insert issues in Oracle**: Oracle sometimes struggles with bulk inserts. The `for...of` loop ensures each row is inserted individually.
- **Forgetting to clear rows**: Always call `await knex('TODO_LIST').del()` first, so seeds don’t duplicate data.

---

## Conclusion

You now have a `TODO_LIST` table filled with quirky tasks. Seeds make your database useful for testing and demos, and they’re easy to rerun whenever you need fresh data.  

In **Part 3**, we’ll evolve the schema by adding new columns (`LOCATION` and `TEL`) to show how migrations handle changes over time.

---

✨ That’s Part 2. It’s about 500 words, with code and troubleshooting tips.  

Would you like me to draft **Part 3 (Schema Evolution — Adding Columns)** next, so the series keeps flowing?