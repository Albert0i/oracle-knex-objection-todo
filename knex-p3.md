Here’s **Part 3 of the tutorial series** — continuing our journey with Knex and the `TODO_LIST` table. This post focuses on **schema evolution**: adding new columns with migrations.

---

# Part 3: Schema Evolution — Adding Columns to Your TODO List

## Introduction

In Part 1, we created the `TODO_LIST` table. In Part 2, we seeded it with whimsical tasks. But requirements change — maybe you want to track where a task should be done (`LOCATION`) or a contact number (`TEL`).  

This is where migrations shine: instead of manually altering the table, you write a migration file that describes the change. Knex applies it consistently across environments, and you can roll it back if needed.

---

## Step 1: Generate a Migration

Run:

```bash
npm run migrate:make add_location_tel_to_todo_list
```

Knex creates a new file in `./migrations` with a timestamp prefix.

---

## Step 2: Edit the Migration File

Open the file and add:

```js
export async function up(knex) {
  await knex.schema.alterTable('TODO_LIST', (table) => {
    table.string('LOCATION', 100); // VARCHAR2(100)
    table.string('TEL', 20);       // VARCHAR2(20)
  });
}

export async function down(knex) {
  await knex.schema.alterTable('TODO_LIST', (table) => {
    table.dropColumn('LOCATION');
    table.dropColumn('TEL');
  });
}
```

- `up` defines how to apply the change.  
- `down` defines how to undo it.

---

## Step 3: Apply the Migration

Run:

```bash
npm run migrate:latest
```

Knex will:
- Detect the new migration file.
- Add `LOCATION` and `TEL` columns to `TODO_LIST`.
- Record the migration in `KNEX_MIGRATIONS`.

---

## Step 4: Verify in Oracle

Check the table structure:

```sql
DESC TODO_LIST;
```

You should now see:

| Column     | Type          |
|------------|---------------|
| ID         | NUMBER        |
| TITLE      | VARCHAR2(255) |
| STATUS     | VARCHAR2(50)  |
| CREATED_AT | TIMESTAMP     |
| LOCATION   | VARCHAR2(100) |
| TEL        | VARCHAR2(20)  |

---

## Step 5: Update Seeds (Optional)

You can extend your seed file to include values for the new columns:

```js
{ TITLE: 'Fix the quantum interference device broken by Stuart Bloom', STATUS: 'PENDING', LOCATION: 'Pasadena Lab', TEL: '555-1234' }
```

This makes your test data richer and more realistic.

---

## Why This Matters

Schema evolution is inevitable. By using migrations:
- You **document changes** in code.
- You can **apply them consistently** across dev, test, and prod.
- You can **roll back safely** if needed.

---

## Conclusion

You’ve now evolved your schema by adding new columns with Knex migrations. This demonstrates the power of migrations: they’re not just for initial setup, but for ongoing changes.  

In **Part 4**, we’ll explore **rollbacks** — how to undo changes safely, and strategies to avoid accidentally dropping your entire table.

---

✨ That’s Part 3. It’s about 500 words, with clear steps and code.  

Would you like me to draft **Part 4 (Rollbacks — Undoing Changes)** next, so the series keeps building smoothly?