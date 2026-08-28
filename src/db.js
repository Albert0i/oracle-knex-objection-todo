import Knex from 'knex';
import { Model } from 'objection';
import knexConfig from '../knexfile.js';

// Verify what’s being imported
//console.log('knexConfig =', knexConfig); 
// should show { development: { client: 'oracledb', connection: {...} } }

const knex = Knex(knexConfig.development);
Model.knex(knex);

export default knex;
