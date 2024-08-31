const axios = require('axios');

// Função para validar o formato do e-mail
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
}

// Função para verificar se o e-mail existe na lista de solicitantes da MillDesk
async function emailExists(email) {
    const apiKey = process.env.MILLDESK_API_KEY;
    const url = `https://v1.milldesk.com/api/${apiKey}/listRequesters`;

    try {
        const response = await axios.get(url);
        const requesters = response.data;
        for (const requester of requesters) {
            if (requester.email === email) {
                return {
                    exists: true,
                    location: requester.location,
                  };
            }
        }
        console.log(`O e-mail "${email}" não foi encontrado na lista de solicitantes.`);
        return { exists: false };
    } catch (error) {
        console.error('Erro ao verificar e-mail:', error);
        return false;
    }
}

// Exporta as funções
module.exports = { validateEmail , emailExists };
