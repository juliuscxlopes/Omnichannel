<<<<<<< HEAD
// redisClient.js
=======

// omnichannel/database/services/redisClient.js
>>>>>>> 3f6ee19 (Commit do seculo)
const Redis = require('ioredis');

// Conectar ao Redis usando a URL fornecida pelas variáveis de ambiente
const redis = new Redis(process.env.REDIS_URL || 'redis://default:ptGDcOhrPtkcoWdeMlyRfSJbjadMNJbJ@redis.railway.internal:6379');

module.exports = redis;

