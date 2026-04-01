import { Skill, User } from '../models/index.js';
import { Op } from 'sequelize';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const searchSkills = asyncHandler(async (req, res) => {
    const { query, type } = req.query; 
    const whereClause = {};

    if (query) {
        const queries = query.split(',').map(q => q.trim()).filter(Boolean);
        if (queries.length > 1) {
            whereClause.name = { [Op.or]: queries.map(q => ({ [Op.iLike]: `%${q}%` })) };
        } else if (queries.length === 1) {
            whereClause.name = { [Op.iLike]: `%${queries[0]}%` };
        }
    }
    if (type) {
        whereClause.type = type;
    }

    const skills = await Skill.findAll({
        where: whereClause,
        include: [{ 
            model: User, 
            attributes: ['id', 'name', 'bio', 'credits', 'avatar'] 
        }]
    });
    
    res.json(new ApiResponse(200, skills, "Skills fetched successfully"));
});

export { searchSkills };
