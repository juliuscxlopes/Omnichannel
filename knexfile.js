module.exports = {
  development: {
    client: 'pg',  // Certifique-se de que isso está definido como 'pg'
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: 'M@grelo3792',
      database: 'omnichannel',
    },
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
  },
  production: {
    client: 'pg',
    connection: {
      host: 'your_production_host',
      user: 'your_production_user',
      password: 'your_production_password',
      database: 'your_production_database',
    },
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
  },
};
