Here’s **Part 4 of the tutorial series** — diving into **rollbacks** and how to undo schema changes safely with Knex.

---

# Part 4: Rollbacks — Undoing Changes in Knex

## Introduction

In Part 3, we evolved our `TODO_LIST` schema by adding `LOCATION` and `TEL` columns. But what if you decide those fields aren’t needed? Or worse, you accidentally applied a migration that broke something? That’s where **rollbacks** come in.  

Knex migrations are reversible: every migration file has an `up` (apply) and `down` (undo). Rollbacks let you step backward in time, undoing changes in a controlled way.

---

## Step 1: Roll Back the Last Migration

To undo the most recent migration:

```bash
npm run migrate:rollback
```

Knex will:
- Look at the latest migration recorded in `KNEX_MIGRATIONS`.
- Run its `down` function.
- Remove the changes (in our case, drop `LOCATION` and `TEL`).

---

## Step 2: Roll Back All Migrations

To reset everything back to zero:

```bash
npm run migrate:rollback --all
```

This runs the `down` function of **every migration file**, in reverse order. For our project, that means:
- Dropping `LOCATION` and `TEL`.
- Dropping the entire `TODO_LIST` table.

⚠️ Be careful: `--all` wipes your schema completely.

---

## Step 3: Reapply Migrations

If you rolled back too far, you can reapply:

```bash
npm run migrate:latest
```

Knex will run all migrations not yet recorded in `KNEX_MIGRATIONS`, recreating the table and columns.

---

## Step 4: Best Practices for Rollbacks

- **Keep migrations focused**: One change per file. That way, rolling back only affects what you expect.
- **Test `down` functions**: Make sure they undo changes cleanly. Dropping a table when you only meant to drop columns can cause data loss.
- **Use rollback in dev/test, not prod**: In production, rollbacks can be dangerous. Instead, write a new migration to fix issues.
- **Seed after rollback**: If you drop tables, reseed to restore data.

---

## Example: Safe Rollback

Suppose you added `LOCATION` and `TEL` but want to undo them:

```bash
npm run migrate:rollback
```

Now `TODO_LIST` is back to its original form:

| Column     | Type          |
|------------|---------------|
| ID         | NUMBER        |
| TITLE      | VARCHAR2(255) |
| STATUS     | VARCHAR2(50)  |
| CREATED_AT | TIMESTAMP     |

Your whimsical tasks remain intact, just without the extra fields.

---

## Conclusion

Rollbacks are your safety net. They let you undo schema changes without manually editing the database. By writing clear `down` functions and using rollbacks wisely, you can experiment confidently.  

In **Part 5**, we’ll tackle **troubleshooting Oracle quirks** — like invalid triggers and sequence errors — so you know how to recover when Knex and Oracle clash.

---

✨ That’s Part 4. It’s about 500 words, with practical steps and best practices.  

Would you like me to draft **Part 5 (Troubleshooting Oracle Quirks)** next, so we cover the real‑world issues you’ve already bumped into?