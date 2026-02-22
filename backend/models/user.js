import { DataTypes } from 'sequelize';
import { sequelize } from '../db/index.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true
  },
  googleId: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  credits: {
    type: DataTypes.INTEGER,
    defaultValue: 60
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  avatar: {
      type: DataTypes.STRING,
      allowNull: true
  }
}, {
  timestamps: true
});

export default User;
