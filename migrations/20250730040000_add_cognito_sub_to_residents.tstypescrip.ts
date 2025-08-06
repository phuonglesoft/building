import { Knex } from 'knex';

   export async function up(knex: Knex): Promise<void> {
     await knex.schema.alterTable('residents', (table: Knex.TableBuilder) => {
       table.string('cognito_sub', 255).unique().notNullable();
     });
   }

   export async function down(knex: Knex): Promise<void> {
     await knex.schema.alterTable('residents', (table: Knex.TableBuilder) => {
       table.dropColumn('cognito_sub');
     });
   }