import { Skill, User } from '../models/index.js';
import { Op } from 'sequelize';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const searchSkills = asyncHandler(async (req, res) => {
    const { query, type } = req.query; 
    const whereClause = {};

    if (query) {
        whereClause.name = { [Op.iLike]: `%${query}%` };
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
