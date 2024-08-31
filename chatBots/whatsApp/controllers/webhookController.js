// controllers/webhookController.js
const redis = require('../../../database/services/redisClient'); 
const { createTicket } = require('../../../api/millDeskApi/createTicket');
const { validateEmail, emailExists } = require('../../../api/millDeskApi/validationEmail');
const sendGreetingMessage = require('../../common/message/sendGreetingMessage');
const { sendEmailMessage , sendInvalidEmailMessage } = require('../../common/message/sendEmailMessage');
const {sendConfirmationMessage, sendDescriptionMessage , sendAddTitleMessage} = require('../../common/message/sendSupportMessage');
const { sendResponsibleNameMessage, sendResponsibleContactMessage , sendInvalidPhoneNumberMessage} = require('../../common/message/sendContactMessage');
const { validatePhoneNumber } = require('../../common/utils/phoneUtils');

const SUPPORT_EXPIRATION = 180

const handleWebhook = async (req, res, next) => {
  const { type } = req.processedData;

  if (type === 'message') {
    const { contact, text } = req.processedData;
    
    try {
      switch (contact.step) {
        case '':
          await sendGreetingMessage(contact);
          await new Promise(resolve => setTimeout(resolve, 1000));
          await sendEmailMessage(contact.phoneNumber);
          contact.step = 'awaitEMAIL';
          await redis.set(contact.whatsappId, JSON.stringify(contact), 'EX' ,SUPPORT_EXPIRATION)
          break;

          case 'awaitEMAIL':
            if (validateEmail(text)) {
              contact.email = text;
              await redis.set(contact.whatsappId, JSON.stringify(contact), 'EX', SUPPORT_EXPIRATION);
              const { exists, location } = await emailExists(text);
              if (exists) {
                contact.location = location
                await sendResponsibleNameMessage(contact.phoneNumber, location);
                contact.step = 'awaitResponsible';
                await redis.set(contact.whatsappId, JSON.stringify(contact), 'EX', SUPPORT_EXPIRATION);
              } else {
                // TODO: Definir lógica para tratamento de clientes com e-mail não cadastrado
                contact.step = 'awaitEMAIL';
              }
            } else {
              console.log('Invalid email:', text);
              await sendInvalidEmailMessage(contact.phoneNumber);
              contact.step = 'awaitEMAIL';
            }
            break;
          
          case 'awaitResponsible':
            contact.responsavel = (text);
            await sendResponsibleContactMessage(contact.phoneNumber);
            contact.step = 'awaitContact';
            await redis.set(contact.whatsappId, JSON.stringify(contact), 'EX', SUPPORT_EXPIRATION);
            break;

          case 'awaitContact':
            if (validatePhoneNumber(text)) {
              contact.contato_responsavel = (text);
              await sendAddTitleMessage(contact.phoneNumber);
              contact.step = 'awaitTitle';
              await redis.set(contact.whatsappId, JSON.stringify(contact), 'EX', SUPPORT_EXPIRATION);
            } else {
                await sendInvalidPhoneNumberMessage(contact.phoneNumber);
                contact.step = 'awaitContact'; // Solicitar novamente o número de telefone
            }
            break;
          case 'awaitTitle':
            contact.title = (text);
            await sendDescriptionMessage(contact.phoneNumber);
            contact.step = 'awaitSuport';
            await redis.set(contact.whatsappId, JSON.stringify(contact), 'EX', SUPPORT_EXPIRATION);
            break;

          case 'awaitSuport':
            contact.description = (text);
            await sendConfirmationMessage (contact.phoneNumber);
            contact.step = 'completed';
            console.log ('Contato', contact);
            await createTicket(contact);
            //TODO: Enviar as informações coletadas para a Base de dados
            await redis.del(contact.whatsappId);
            
        }

    } catch (error) {
      console.error('Error handling webhook:', error);
    }
  } else if (type === 'status') {
    const { id, status } = req.processedData;
    console.log(`Message ID: ${id}, Status: ${status}`);
  }

  res.sendStatus(200);
};

module.exports = { handleWebhook };
