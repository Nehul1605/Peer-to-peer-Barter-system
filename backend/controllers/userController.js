import { User, Skill } from '../models/index.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const getProfile = asyncHandler(async (req, res) => {
    const user = await User.findByPk(req.user.id, {
      include: [{ model: Skill }], 
      attributes: { exclude: ['password'] }
    });
    
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    
    res.json(new ApiResponse(200, user, "User profile fetched successfully"));
});

const updateProfile = asyncHandler(async (req, res) => {
    const { bio, skillsToTeach, skillsToLearn } = req.body;
    const user = await User.findByPk(req.user.id);

    if (bio) user.bio = bio;
    await user.save();

    if (skillsToTeach || skillsToLearn) {
        // Remove old skills
        await Skill.destroy({ where: { userId: user.id } });

        const newSkills = [];
        if (skillsToTeach && Array.isArray(skillsToTeach)) {
            skillsToTeach.forEach(name => newSkills.push({ userId: user.id, name, type: 'TEACH' }));
        }
        if (skillsToLearn && Array.isArray(skillsToLearn)) {
            skillsToLearn.forEach(name => newSkills.push({ userId: user.id, name, type: 'LEARN' }));
        }
        if (newSkills.length > 0) {
            await Skill.bulkCreate(newSkills);
        }
    }

    const updatedUser = await User.findByPk(req.user.id, {
        include: [{ model: Skill }],
         attributes: { exclude: ['password'] }
    });
    
    res.json(new ApiResponse(200, updatedUser, "Profile updated successfully"));
});

export { getProfile, updateProfile };
