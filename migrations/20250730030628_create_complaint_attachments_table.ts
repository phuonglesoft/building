import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('complaint_attachments', (table: Knex.TableBuilder) => {
    table.bigIncrements('id').primary();
    table.bigInteger('complaint_id').unsigned().notNullable();
    table.bigInteger('building_id').unsigned().notNullable();
    table.string('s3_image_url', 255).notNullable();
    table.string('file_type', 50).notNullable();
    table.dateTime('created_at').defaultTo(knex.fn.now());
    table.foreign('complaint_id').references('complaints.id');
    table.foreign('building_id').references('building.id');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('complaint_attachments');
}
