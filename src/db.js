/**
 * db.js
 */
import knex from 'knex';
import { Model } from 'objection';
import config from '../knexfile.js';

// Select the environment (development, production, etc.)
const environment = process.env.NODE_ENV || 'development';
// console.log('Environment =', config[environment])
const db = knex(config[environment]);

Model.knex(db);

export default db;
