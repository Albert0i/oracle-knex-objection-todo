Here’s **Part 6 of the tutorial series** — the final piece, focusing on **best practices and Git workflows** for Knex migrations and seeds.

---

# Part 6: Best Practices & Git Workflow for Knex Migrations

## Introduction

We’ve built a `TODO_LIST` table, seeded it with data, evolved the schema, rolled back changes, and even debugged Oracle quirks. Now it’s time to talk about collaboration. In real projects, multiple developers work on the same database. Without discipline, migrations can collide, seeds can duplicate, and environments can drift apart.  

This final part of the series covers how to manage Knex migrations in Git, avoid conflicts, and keep your schema evolution under control.

---

## Best Practices for Migrations

### 1. Commit Migration Files, Not Runtime Tables
- ✅ **Commit `./migrations` files**: They are the source of truth for schema changes.
- ❌ **Do not commit/export `knex_migrations` table**: It’s environment‑specific state. Each database maintains its own record.

### 2. Use Descriptive Names
Name migrations after what they do:
- `20260827_create_todo_list.js`
- `20260828_add_location_tel_to_todo_list.js`

This makes history readable.

### 3. One Change per Migration
Keep migrations focused:
- One table creation.
- One column addition.
- One index creation.

This makes rollbacks predictable.

### 4. Test Rollbacks
Always verify that `down` functions undo changes cleanly. Dropping a table when you only meant to drop columns can cause data loss.

### 5. Avoid Rollbacks in Production
In production, rollbacks can be dangerous. Instead, write a new migration to fix issues. Rollbacks are best for dev/test environments.

---

## Best Practices for Seeds

- **Clear before insert**: Use `await knex('TODO_LIST').del()` to avoid duplicates.
- **Keep seeds small**: Seeds are for sample data, not full datasets.
- **Use ESM syntax**: If your project has `"type": "module"`, always use `export async function seed`.

---

## Git Workflow for Teams

### 1. Each Developer Creates Their Own Migration
When you need a schema change, generate a new migration file. Don’t edit old ones — history should be immutable.

### 2. Resolve Conflicts by Order
If two developers create migrations at the same time, Knex applies them in timestamp order. Git will merge both files, and Knex will run them sequentially.

### 3. Review Migration Files in Pull Requests
Treat migrations like code. Review them for correctness, naming, and rollback safety.

### 4. Keep Seeds Environment‑Specific
Seeds for dev/test can live in the repo. Production data should be inserted manually or via separate scripts.

---

## Example Workflow

1. Developer A creates `create_todo_list.js` and commits it.
2. Developer B creates `add_location_tel_to_todo_list.js` and commits it.
3. Both files exist in `./migrations`.
4. On deployment, run:
   ```bash
   npm run migrate:latest
   ```
   Knex applies both migrations in order.
5. Each environment (dev, staging, prod) maintains its own `knex_migrations` table to track progress.

---

## Conclusion

Migrations and seeds are powerful, but they require discipline. By committing migration files, naming them clearly, keeping them focused, and managing them in Git, you ensure your database evolves smoothly across environments.  

With this final part, you now have a complete workflow:
- **Part 1**: Create tables with migrations.  
- **Part 2**: Populate them with seeds.  
- **Part 3**: Evolve schemas with new columns.  
- **Part 4**: Roll back safely.  
- **Part 5**: Troubleshoot Oracle quirks.  
- **Part 6**: Collaborate with best practices.  

---

✨ That completes the series. You now have a full, practical guide to Knex migrations and seeds with Oracle, built around the `TODO_LIST` example.  

Would you like me to also prepare a **summary post** — a “Part 7: Recap & Next Steps” — that ties all six parts together and suggests where to go next (like integrating Objection.js or building an API)?