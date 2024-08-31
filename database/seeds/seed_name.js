exports.seed = function(knex) {
  return knex('WhatsAppConversations').del()
    .then(function () {
      return knex('WhatsAppConversations').insert([
        {
          "Chamado aberto por": 'John Doe',
          "Telefone da Abertura": '11987654321',
          "Local": 'São Paulo',
          "Responsável": 'Jane Smith',
          "Contato Responsável": '11912345678',
          "Email": 'jane.smith@example.com',
          "Titulo": 'Problema com produto',
          "Descrição": 'Descrição detalhada do problema com o produto.'
        }
      ]);
    });
};
