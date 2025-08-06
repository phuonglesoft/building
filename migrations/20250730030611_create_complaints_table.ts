import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('complaints', (table: Knex.TableBuilder) => {
    table.bigIncrements('id').primary();
    table.bigInteger('building_id').unsigned().notNullable();
    table.bigInteger('resident_id').unsigned().notNullable();
    table.text('description').notNullable();
    table.string('title');
    table.enum('status', ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED']).defaultTo('OPEN');
    table.enum('priority', ['LOW', 'MEDIUM', 'HIGH']).defaultTo('MEDIUM');
    table.dateTime('created_at').defaultTo(knex.fn.now());
    table.dateTime('updated_at').defaultTo(knex.fn.now());
    table.foreign('building_id').references('building.id');
    table.foreign('resident_id').references('residents.id');
    table.index(['building_id', 'status'], 'idx_building_id_status');
    table.index('resident_id', 'idx_resident_id');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('complaints');
}