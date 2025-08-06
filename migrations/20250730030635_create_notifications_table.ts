import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('notifications', (table: Knex.TableBuilder) => {
    table.bigIncrements('id').primary();
    table.bigInteger('building_id').unsigned().notNullable();
    table.bigInteger('resident_id').unsigned().notNullable();
    table.text('message').notNullable();
    table.enum('channel', ['EMAIL', 'SMS', 'APP']).notNullable();
    table.boolean('is_read').defaultTo(false),
    table.dateTime('sent_at').defaultTo(knex.fn.now());
    table.foreign('building_id').references('building.id');
    table.foreign('resident_id').references('residents.id');
    table.index(['building_id', 'resident_id'], 'idx_building_id_resident_id');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('notifications');
}