const createAttendantsTable = (knex) => {
  return knex.schema.createTable('Attendants', (table) => {
    table.increments('id').primary();  // Cria a coluna 'id' com incremento automático e chave primária
    table.string('name', 20).notNullable();  // Cria a coluna 'name' do tipo VARCHAR(20) e define como NOT NULL
    table.string('email', 20).notNullable().unique();  // Cria a coluna 'email' do tipo VARCHAR(20), define como NOT NULL e UNIQUE
    table.string('password', 255).notNullable();  // Cria a coluna 'password' do tipo VARCHAR(255) e define como NOT NULL
  });
};

const dropAttendantsTable = (knex) => {
  return knex.schema.dropTableIfExists('Attendants');  // Remove a tabela 'Attendants' se ela existir
};

module.exports = {
  up: createAttendantsTable,
  down: dropAttendantsTable,
};
