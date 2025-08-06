import knex, { Knex } from 'knex';
import { Model } from 'objection';
import * as dotenv from 'dotenv';
import config from '../../knexfile';
dotenv.config();

const environment = process.env.NODE_ENV || 'development';
const knexConfig: Knex.Config = config[environment];


const knexInstance: Knex = knex(knexConfig);


Model.knex(knexInstance);

export default knexInstance;