module.exports = {
  PORT: process.env.PORT || 3000,
  DB_CONNECTION:
    process.env.DB_CONNECTION // Adicionar aqui a URI de conexão do MongoDB
  JWT_SECRET: process.env.JWT_SECRET // Adicionar aqui o JWT secret
};
