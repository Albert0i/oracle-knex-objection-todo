Here’s **Part 5 of the tutorial series** — focusing on **troubleshooting Oracle quirks** when working with Knex migrations and seeds.

---

# Part 5: Troubleshooting Oracle Quirks in Knex

## Introduction

By now, we’ve created tables, seeded data, added columns, and even rolled back migrations. But if you’re using Oracle with Knex, you’ll eventually run into quirks: invalid triggers, broken sequences, or odd errors when seeding. These aren’t bugs in your code — they’re side effects of how Knex interacts with Oracle’s auto‑increment and locking mechanisms.

This part of the series shows you how to recognize and fix these issues.

---

## Common Oracle Issues with Knex

### 1. ORA‑04098: Invalid Trigger
You might see:
```
ORA-04098: trigger 'KNEX_MIGRATIONS_LOCK_AUTOINC_TRG' is invalid and failed re-validation
```

**Why it happens:**  
Knex creates sequences and triggers to emulate auto‑increment behavior in Oracle. If a migration is interrupted or corrupted, these triggers can break.

**Fix:**  
Drop the invalid trigger and sequence manually:
```sql
DROP TRIGGER KNEX_MIGRATIONS_LOCK_AUTOINC_TRG;
DROP SEQUENCE KNEX_MIGRATIONS_LOCK_SEQ;
```
Then rerun your migration:
```bash
npm run migrate:latest
```

---

### 2. “exports is not defined” in Seeds
This error appears if you use CommonJS (`module.exports`) in a project with `"type": "module"`.

**Fix:**  
Use ESM syntax:
```js
export async function seed(knex) { … }
```

---

### 3. Multi‑Row Insert Failures
Oracle sometimes struggles with bulk inserts in Knex seeds.

**Fix:**  
Insert rows one by one:
```js
for (const todo of todos) {
  await knex('TODO_LIST').insert(todo);
}
```

---

### 4. Rollback Wipes Entire Table
Running `migrate:rollback --all` drops every table created by migrations, including `TODO_LIST`.

**Fix:**  
- Use `migrate:rollback` (without `--all`) to undo only the last migration.  
- Keep migrations focused (one change per file) so rollbacks are predictable.

---

## Debugging Tips

- **Check `KNEX_MIGRATIONS` table**: It records which migrations have been applied. If something looks off, compare it with your `./migrations` folder.
- **Clear caches**: Restart Node or delete `.cache` directories if Knex seems to load old files.
- **Log inside seeds/migrations**: Add `console.log("Running seed…")` to confirm Knex is executing the right file.

---

## Best Practices

- **Drop corrupted triggers/sequences** before rerunning migrations.  
- **Stick to ESM syntax** if your project uses `"type": "module"`.  
- **Test rollbacks** in development to avoid surprises in production.  
- **Commit migration files, not runtime tables** — `knex_migrations` is environment‑specific.

---

## Conclusion

Oracle adds complexity to Knex, but with the right troubleshooting steps, you can recover quickly. Invalid triggers, broken sequences, and seed errors are common, but they’re solvable.  

In **Part 6**, we’ll wrap up the series with **best practices and Git workflows** — how to collaborate on migrations safely, handle conflicts, and keep your schema evolution under control.

---

✨ That’s Part 5. It’s about 500 words, with practical fixes and best practices.  

Would you like me to draft **Part 6 (Best Practices & Git Workflow)** next, to complete the series?