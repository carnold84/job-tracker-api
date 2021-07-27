const { DataTypes } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
  sequelize.define('job', {
    // Model attributes are defined here
    company: {
      type: DataTypes.STRING,
    },
    dueDate: {
      type: DataTypes.DATE,
    },
    link: {
      type: DataTypes.STRING,
    },
    notes: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['active', 'closed', 'failed', 'success', 'waiting']],
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
