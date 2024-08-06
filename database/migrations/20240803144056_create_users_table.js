// migrations/20240101000000_create_whatsapp_conversations_table.js
exports.up = function(knex) {
  return knex.schema.createTable('WhatsAppConversations', function(table) {
    table.increments('id').primary();
    table.string('CNPJ', 14).notNullable();
    table.string('opened_by', 15).notNullable();
    table.string('phone_opened', 11).notNullable();
    table.string('location', 15).nullable();
    table.string('responsible', 20).nullable();
    table.string('phone_responsible', 11).nullable();
    table.string('email', 30).nullable();
    table.string('title', 40).nullable();
    table.text('description').nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('WhatsAppConversations');
};
