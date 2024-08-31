// middleware/messageProcessor.js
const { setProcessedData } = require('./processWebhookData');
const { formatPhoneNumber } = require('../utils/phoneUtils');
const redis = require('../../../database/services/redisClient');




//TODO: ORGANIZAR AS MENSAGEM VINDAS DE CADA LADO... 


const messageProcessor = async(req, res, next) => {
  try {
    const entry = req.body.entry && req.body.entry[0];
    if (!entry) {
      console.error('Webhook entry is missing');
      return next();
    }

    const changes = entry.changes && entry.changes[0];
    if (!changes) {
      console.error('Webhook changes are missing');
      return next();
    }

    const message = changes.value.messages && changes.value.messages[0];
    if (message) {
      const contacts = changes.value.contacts && changes.value.contacts[0];
      const formattedPhoneNumber = formatPhoneNumber(message.from); 
      const name = contacts ? contacts.profile.name : 'N/A';
      const whatsappId = contacts ? contacts.wa_id : 'N/A';
      
      let contact = JSON.parse(await redis.get(whatsappId));
      
      if (!contact) { 
        contact = {
          name: name || '',
          phoneNumber: formattedPhoneNumber || '',
          whatsappId: whatsappId || '',
          step: ''
        };
        redis.set(whatsappId,JSON.stringify(contact))
        console.log('criando atendimento')
      }
      else {
        console.log('atendimento existente')
      }

      if (message.type === 'text') {
        setProcessedData(req, {
          type: 'message',
          contact: contact,
          text: message.text && message.text.body ? message.text.body : 'N/A',
          timestamp: new Date().toISOString()
        });
      } else if (message.type === 'interactive' && message.interactive.type === 'button_reply') {
        setProcessedData(req, {
          type: 'message',
          contact: contact,
          text: message.interactive.button_reply.id || 'N/A',
          timestamp: new Date().toISOString()
        });
      } else {
        console.error('Message is missing or not of type text/button_reply in webhook changes');
      }
    
    }

    next();
  } catch (error) {
    console.error('Error processing message webhook:', error);
    next();
  }
};

module.exports = messageProcessor;
