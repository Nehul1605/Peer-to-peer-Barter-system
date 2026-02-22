import { Session, User, Skill, Review } from '../models/index.js';
import { Op } from 'sequelize';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const createSessionRequest = asyncHandler(async (req, res) => {
  const { teacherId, skillId, topic, scheduledAt, durationMinutes } = req.body;
  
  if (teacherId === req.user.id) {
      throw new ApiError(400, "You cannot request a session with yourself");
  }

  const session = await Session.create({
    learnerId: req.user.id,
    teacherId,
    skillId,
    topic,
    scheduledAt,
    durationMinutes,
    status: 'PENDING'
  });
  
  res.status(201).json(new ApiResponse(201, session, "Session requested successfully"));
});

const getMySessions = asyncHandler(async (req, res) => {
  const sessions = await Session.findAll({
    where: {
      [Op.or]: [{ learnerId: req.user.id }, { teacherId: req.user.id }]
    },
    include: [
      { model: User, as: 'teacher', attributes: ['name', 'id', 'avatar'] },
      { model: User, as: 'learner', attributes: ['name', 'id', 'avatar'] },
      { model: Skill, attributes: ['name'] }
    ],
    order: [['scheduledAt', 'DESC']]
  });
  
  res.json(new ApiResponse(200, sessions, "Sessions fetched successfully"));
});

const updateSessionStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // 'SCHEDULED', 'COMPLETED', 'CANCELLED'
    const session = await Session.findByPk(id);

    if (!session) {
        throw new ApiError(404, "Session not found");
    }

    if (session.teacherId !== req.user.id && session.learnerId !== req.user.id) {
        throw new ApiError(403, "Unauthorized to update this session");
    }

    if (status === 'COMPLETED' && session.status !== 'COMPLETED') {
        const learner = await User.findByPk(session.learnerId);
        const teacher = await User.findByPk(session.teacherId);
        
        if (learner.credits < 1) {
             throw new ApiError(400, "Learner has insufficient credits");
        }

        await learner.decrement('credits', { by: 1 });
        await teacher.increment('credits', { by: 1 });
    }

    if (status === 'SCHEDULED' && session.status !== 'SCHEDULED' && !session.meetingLink) {
        // Use Jitsi for instant, free meeting links without API setup
        session.meetingLink = `https://meet.jit.si/SkillBarter-${session.id}`;
    }

    session.status = status;
    await session.save();
    
    res.json(new ApiResponse(200, session, "Session status updated"));
});

const addReview = asyncHandler(async (req, res) => {
    const { sessionId } = req.params;
    const { rating, comment } = req.body;
    
    const session = await Session.findByPk(sessionId);
    if (!session) throw new ApiError(404, "Session not found");
    
    if (session.status !== 'COMPLETED') {
        throw new ApiError(400, "Can only review completed sessions");
    }

    let revieweeId;
    if (req.user.id === session.learnerId) {
        revieweeId = session.teacherId;
    } else if (req.user.id === session.teacherId) {
        revieweeId = session.learnerId;
    } else {
        throw new ApiError(403, "Not a participant of this session");
    }

    const review = await Review.create({
        sessionId,
        reviewerId: req.user.id,
        revieweeId,
        rating,
        comment
    });

    res.status(201).json(new ApiResponse(201, review, "Review added successfully"));
});

export { createSessionRequest, getMySessions, updateSessionStatus, addReview };
