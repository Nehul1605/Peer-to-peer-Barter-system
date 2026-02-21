import { DataTypes } from 'sequelize';
import { sequelize } from '../db/index.js';

const Session = sequelize.define('Session', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  teacherId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  learnerId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  skillId: { 
    type: DataTypes.UUID,
    allowNull: true
  },
  topic: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('PENDING', 'SCHEDULED', 'COMPLETED', 'CANCELLED'),
    defaultValue: 'PENDING'
  },
  scheduledAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  durationMinutes: {
    type: DataTypes.INTEGER,
    defaultValue: 60
  },
  meetingLink: {
      type: DataTypes.STRING,
      allowNull: true
  }
}, {
  timestamps: true
});

export default Session;
