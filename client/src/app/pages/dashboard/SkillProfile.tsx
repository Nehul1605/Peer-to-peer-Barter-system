import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, X, Save, BookOpen, Lightbulb } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card } from '../../components/ui/card';
import { toast } from 'sonner';

export default function SkillProfile() {
  const [skillsIKnow, setSkillsIKnow] = useState([
    'React Development',
    'TypeScript',
    'UI/UX Design',
  ]);
  const [skillsToLearn, setSkillsToLearn] = useState([
    'Python Programming',
    'Machine Learning',
  ]);
  const [newSkillKnow, setNewSkillKnow] = useState('');
  const [newSkillLearn, setNewSkillLearn] = useState('');

  const addSkillKnow = () => {
    if (newSkillKnow.trim()) {
      setSkillsIKnow([...skillsIKnow, newSkillKnow.trim()]);
      setNewSkillKnow('');
    }
  };

  const addSkillLearn = () => {
    if (newSkillLearn.trim()) {
      setSkillsToLearn([...skillsToLearn, newSkillLearn.trim()]);
      setNewSkillLearn('');
    }
  };

  const removeSkillKnow = (index: number) => {
    setSkillsIKnow(skillsIKnow.filter((_, i) => i !== index));
  };

  const removeSkillLearn = (index: number) => {
    setSkillsToLearn(skillsToLearn.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    toast.success('Profile updated successfully! Our matching algorithm will find suitable peers for you.');
  };

  const popularSkills = [
    'JavaScript', 'Python', 'Java', 'C++', 'React', 'Node.js',
    'UI/UX Design', 'Data Science', 'Machine Learning', 'Cloud Computing',
    'Mobile Development', 'Digital Marketing', 'Video Editing', 'Graphic Design'
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl mb-2">Skill Profile</h1>
        <p className="text-neutral-400">
          Tell us what you know and what you want to learn. We'll match you with the perfect learning partners!
        </p>
      </motion.div>

      <div className="space-y-6">
        {/* Skills I Can Teach */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-neutral-900/40 backdrop-blur-xl border-neutral-800 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Skills I Can Teach</h2>
                <p className="text-sm text-neutral-400">What skills can you share with others?</p>
              </div>
            </div>

            {/* Input to add new skill */}
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="e.g., React Development, Guitar, Spanish..."
                value={newSkillKnow}
                onChange={(e) => setNewSkillKnow(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSkillKnow()}
                className="bg-neutral-900/40 border-neutral-800 text-white placeholder:text-neutral-500"
              />
              <Button
                onClick={addSkillKnow}
                className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </div>

            {/* Skills list */}
            <div className="flex flex-wrap gap-2">
              {skillsIKnow.length === 0 ? (
                <p className="text-neutral-500 text-sm">No skills added yet. Add your first skill above!</p>
              ) : (
                skillsIKnow.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-500/20 border border-green-500/30 text-green-400 px-3 py-2 rounded-lg flex items-center gap-2 group hover:bg-green-500/30 transition-all"
                  >
                    <span>{skill}</span>
                    <button
                      onClick={() => removeSkillKnow(index)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))
              )}
            </div>
          </Card>
        </motion.div>

        {/* Skills I Want to Learn */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-neutral-900/40 backdrop-blur-xl border-neutral-800 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-brand-primary to-brand-secondary flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Skills I Want to Learn</h2>
                <p className="text-sm text-neutral-400">What new skills do you want to acquire?</p>
              </div>
            </div>

            {/* Input to add new skill */}
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="e.g., Python, Photography, Public Speaking..."
                value={newSkillLearn}
                onChange={(e) => setNewSkillLearn(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSkillLearn()}
                className="bg-neutral-900/40 border-neutral-800 text-white placeholder:text-neutral-500"
              />
              <Button
                onClick={addSkillLearn}
                className="bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary hover:to-brand-secondary"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </div>

            {/* Skills list */}
            <div className="flex flex-wrap gap-2">
              {skillsToLearn.length === 0 ? (
                <p className="text-neutral-500 text-sm">No skills added yet. Add your first skill above!</p>
              ) : (
                skillsToLearn.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-brand-primary/20 border border-brand-primary/30 text-brand-primary px-3 py-2 rounded-lg flex items-center gap-2 group hover:bg-brand-primary/30 transition-all"
                  >
                    <span>{skill}</span>
                    <button
                      onClick={() => removeSkillLearn(index)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))
              )}
            </div>
          </Card>
        </motion.div>

        {/* Popular Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-neutral-900/40 backdrop-blur-xl border-neutral-800 p-6">
            <h3 className="font-semibold mb-3">Popular Skills</h3>
            <p className="text-sm text-neutral-400 mb-4">Click to quickly add to your profile</p>
            <div className="flex flex-wrap gap-2">
              {popularSkills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => {
                    if (!skillsToLearn.includes(skill) && !skillsIKnow.includes(skill)) {
                      setNewSkillLearn(skill);
                    }
                  }}
                  className="bg-neutral-900/40 border border-neutral-800 px-3 py-1.5 rounded-lg text-sm hover:bg-neutral-900/60 hover:border-white/20 transition-all"
                >
                  {skill}
                </button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-end"
        >
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary hover:to-brand-secondary px-8"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Profile & Find Matches
          </Button>
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-brand-primary/10 border border-brand-primary/30 rounded-lg p-4"
        >
          <p className="text-sm text-neutral-300">
            💡 <strong>How matching works:</strong> Our algorithm finds users who have the skills you want to learn 
            and want to learn the skills you know. You'll exchange knowledge in fair, time-based sessions where 
            both parties earn equal credits!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
