### Tutorial: Building an Oracle Todo App with Objection.js + Knex.js

"These are my Confessions, and if in them I say nothing, it’s because I have nothing to say."
"São as minhas Confissões, e, se nelas nada digo, é que nada tenho que dizer."

"A tedium that includes the expectation of nothing but more tedium; a regret, right now, for the regret I’ll have tomorrow for having felt regret today – huge confusions with no point and no truth, huge confusions…"
"Um tédio que inclui a antecipação só de mais tédio; a pena, já, de amanhã ter pena de ter tido pena hoje — grandes emaranhamentos sem utilidade nem verdade, grandes emaranhamentos..."


#### Prologue 
Honestly, I won't recommend Oracle to anyone, as for ORM, I won't recommend it either. The more I work with ORMs, the more I appreciate the succinctness of [SQL](https://en.wikipedia.org/wiki/SQL) and immense capability. 


#### [Code-First vs Database-First](https://strapi.io/blog/code-first-vs-database-first)
> **Code-First** and **Database-First** determines your application's single source of truth and dictates how data structures evolve.

> Code-first starts with your domain models, not the database. You define your data structures as classes, and the framework generates the database schema from them. This keeps business logic at the center and ensures your data model evolves directly from application code.

> Database-first begins with an existing database schema and generates entity classes from it. This approach emphasizes database design and optimization, which is ideal for data-heavy applications or projects built on legacy systems.

Legacy applications are built on tables of RDBMS. They evince high efficiency but tend to be [Close coupling](https://en.wikipedia.org/wiki/Close_coupling) with specific backend. Database upgrade or migration bring about unpredictable difficult because all code tights together. 

A lightweight abstration layer can be used to provide a consistent interface for accessing different databases. This mitigate platform specific problems and yet platform dependent functions can be used via special interfae. 

[Schema evolution](https://en.wikipedia.org/wiki/Schema_evolution) refers to the management (design, apply and version control) of changes to tables in RDBMS to reflect new requirement. This pose additional challenge to modern application development. 


#### [Knex.js](https://knexjs.org/)
> Knex.js is a batteries-included SQL query builder for JavaScript.

> **Knex.js** (pronounced [/kəˈnɛks/](https://youtu.be/19Av0Lxml-I?t=521)) is a "batteries included" SQL query builder for **PostgreSQL**, **CockroachDB**, **MSSQL**, **MySQL**, **MariaDB**, **SQLite3**, **Better-SQLite3**, **Oracle**, and **Amazon Redshift** designed to be flexible, portable, and fun to use.

To begin with: 
```
npm install knex oracledb
```

Create a file named `knexfile.js`:
```
import 'dotenv/config'; 

export default {
  /**
   * Development
   */
  development: {
    client: 'oracledb',
    connection: {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECTION_STRING
    },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations',
      stub: './stubs/migration.stub'
    },
    seeds: {
      directory: './seeds',
      stub: './stubs/seed.stub'
    },
    debug: false,              // log SQL queries to console
    asyncStackTraces: false,   // show full async stack traces on errors
    fetchAsString: [ 'DATE', 'NUMBER' ], // return DATE/NUMBER columns as strings
  }  
};
```


####
####
####
####
####
####
####
####
####
####

[Code-First vs Database-First: Which Approach Should You Use in 2025?](https://strapi.io/blog/code-first-vs-database-first)

#### Epilogue 

```
With the wrong decision, every time is bad timing; 
With the wrong direction, every road is a deadend.
```


### EOF (2026/09/xx)