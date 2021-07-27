const { Sequelize } = require('sequelize');

const {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASS,
  DATABASE_PORT,
  DATABASE_USER,
} = process.env;

const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_PASS, {
  dialect: 'mysql',
  host: DATABASE_HOST,
  port: DATABASE_PORT,
});

const modelDefiners = [require('./models/job.model')];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;
