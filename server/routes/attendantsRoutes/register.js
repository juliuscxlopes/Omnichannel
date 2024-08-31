const express = require('express');
const router = express.Router();
const amqp = require('amqplib/callback_api');

router.post('/register-attendants', (req, res) => {
  const { name, email, password } = req.body;

  // Validação dos dados, criptografia da senha, etc.

  amqp.connect('amqp://localhost', (err, conn) => {
    conn.createChannel((err, ch) => {
      const queue = 'register_queue';
      const msg = JSON.stringify({ name, email, password });

      ch.assertQueue(queue, { durable: true });
      ch.sendToQueue(queue, Buffer.from(msg));
      console.log('Sent:', msg);
      res.status(200).send('User registration request sent');
    });

    setTimeout(() => {
      conn.close();
    }, 500);
  });
});

module.exports = router;