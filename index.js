const app = require('./app');
const sequelize = require('./sequelize');
const PORT = process.env.APP_PORT || 8080;

async function checkDBConnection() {
  console.log(`Checking database connection...`);
  try {
    await sequelize.authenticate();
    console.log('Database connection OK!');
  } catch (error) {
    console.log('Unable to connect to the database:');
    console.log(error.message);
    process.exit(1);
  }
}

async function init() {
  await checkDBConnection();
  // sync up database
  await sequelize.sync({ force: false });

  console.log(`Starting Sequelize + Express example on port ${PORT}...`);

  app.listen(PORT, () => {
    console.log(
      `Express server started on port ${PORT}. Try some routes, such as '/api/users'.`
    );
  });
}

init();
