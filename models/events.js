'use strict';
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Events = sequelize.define('Events', {
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    name: { type: DataTypes.TEXT, defaultValue: "" },
    type: { type: DataTypes.TEXT, defaultValue: ""  },
    date: { type: DataTypes.TEXT , defaultValue: "" },
    city: { type: DataTypes.TEXT, defaultValue: ""  },
    state: { type: DataTypes.TEXT, defaultValue: ""  },
    code: { type: DataTypes.INTEGER, defaultValue: 0  },
    items:{ type: DataTypes.TEXT, defaultValue: ""  },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  },

  {
    hooks: {
      afterValidate: (event) => {
        event.password = bcrypt.hashSync(event.password, 10);
      }
    }
  }
);

// Events.validPassword = (password, passwd, done, event) => {
//   bcrypt.compareSync(password, passwd);
// };

  return Events;
};
