import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('residents', (table: Knex.TableBuilder) => {
    table.bigIncrements('id').primary();
    table.bigInteger('building_id').unsigned().notNullable();
    table.string('name', 100).notNullable();
    table.string('phone', 20).notNullable();
    table.string('email', 100);
    table.string('apartment_number', 50).notNullable();
    table.dateTime('created_at').defaultTo(knex.fn.now());
    table.dateTime('updated_at').defaultTo(knex.fn.now());
    table.foreign('building_id').references('building.id');
    table.index('building_id', 'idx_building_id');
    table.index('apartment_number', 'idx_apartment_number');
    table.unique(['building_id', 'apartment_number'], 'unique_building_apartment');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('residents');
}