// src/utils/messageSender.js
const axios = require('axios');

const sendMessage = async (phoneNumber, messageData) => {
  // Prepare the data object for the API request
  const data = {
    messaging_product: 'whatsapp',
    to: phoneNumber,
    ...messageData
  };

  try {
    // Make the POST request to the WhatsApp API
    await axios.post(
      `https://graph.facebook.com/v19.0/${process.env.PHONE_NUMBER_ID}/messages`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.GRAPH_API_TOKEN}`
        }
      }
    );
    //console.log('Message sent:', data);
  } catch (error) {
    console.error('Error sending message:', error.response ? error.response.data : error.message);
  }
};


//TODO: Menssagin sender of instagram.. 




module.exports = sendMessage;
