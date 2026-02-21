import User from './user.js';
import Skill from './skill.js';
import Session from './session.js';
import Review from './review.js';

// Relationships
User.hasMany(Skill, { foreignKey: 'userId', onDelete: 'CASCADE' });
Skill.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Session, { as: 'teachingSessions', foreignKey: 'teacherId' });
User.hasMany(Session, { as: 'learningSessions', foreignKey: 'learnerId' });

Session.belongsTo(User, { as: 'teacher', foreignKey: 'teacherId' });
Session.belongsTo(User, { as: 'learner', foreignKey: 'learnerId' });
Session.belongsTo(Skill, { foreignKey: 'skillId' });

Session.hasOne(Review, { foreignKey: 'sessionId' });
Review.belongsTo(Session, { foreignKey: 'sessionId' });

User.hasMany(Review, { as: 'receivedReviews', foreignKey: 'revieweeId' });
User.hasMany(Review, { as: 'writtenReviews', foreignKey: 'reviewerId' });
Review.belongsTo(User, { as: 'reviewer', foreignKey: 'reviewerId' });
Review.belongsTo(User, { as: 'reviewee', foreignKey: 'revieweeId' });

export {
  User,
  Skill,
  Session,
  Review
};
