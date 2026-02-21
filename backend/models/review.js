import { DataTypes } from 'sequelize';
import { sequelize } from '../db/index.js';

const Review = sequelize.define('Review', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  sessionId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true // One review per session per role (but usually just learner reviews teacher)
  },
  reviewerId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  revieweeId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 5 }
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: true
});

export default Review;
