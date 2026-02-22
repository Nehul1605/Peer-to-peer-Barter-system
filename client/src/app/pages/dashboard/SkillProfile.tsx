import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, X, Lightbulb } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card } from '../../components/ui/card';
import { toast } from 'sonner';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function SkillProfile() {
  const { user, setUser } = useAuth();
  const [skillsIKnow, setSkillsIKnow] = useState<string[]>([]);
  const [skillsToLearn, setSkillsToLearn] = useState<string[]>([]);
  const [bio, setBio] = useState('');
  
  const [newSkillKnow, setNewSkillKnow] = useState('');
  const [newSkillLearn, setNewSkillLearn] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && user.Skills) {
      setSkillsIKnow(user.Skills.filter((s:any) => s.type === 'TEACH').map((s:any) => s.name));
      setSkillsToLearn(user.Skills.filter((s:any) => s.type === 'LEARN').map((s:any) => s.name));
      setBio(user.bio || '');
    }
  }, [user]);

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

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await api.put('/users/profile', {
        bio,
        skillsToTeach: skillsIKnow,
        skillsToLearn: skillsToLearn
      });
      if (response.data.success) {
        setUser(response.data.data);
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
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
        <Card className="bg-neutral-900/40 backdrop-blur-xl border-neutral-800 p-6">
             <h2 className="text-xl font-semibold mb-2">Bio</h2>
             <Input 
                value={bio} 
                onChange={(e) => setBio(e.target.value)} 
                placeholder="Tell us a little about yourself..."
                className="bg-neutral-900/40 border-neutral-800 text-white"
             />
        </Card>

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

            <div className="flex flex-wrap gap-2">
              {skillsIKnow.map((skill, index) => (
                <div
                  key={index}
                  className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-500/30 flex items-center gap-2 group"
                >
                    {skill}
                    <button onClick={() => removeSkillKnow(index)} className="hover:text-white">
                        <X className="w-3 h-3" />
                    </button>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-neutral-900/40 backdrop-blur-xl border-neutral-800 p-6">
             <div className="flex items-center gap-3 mb-4">
                <h2 className="text-xl font-semibold">Skills To Learn</h2>
             </div>
              <div className="flex gap-2 mb-4">
              <Input
                placeholder="e.g., Python, Piano..."
                value={newSkillLearn}
                onChange={(e) => setNewSkillLearn(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSkillLearn()}
                className="bg-neutral-900/40 border-neutral-800 text-white placeholder:text-neutral-500"
              />
              <Button onClick={addSkillLearn} variant="secondary">
                <Plus className="w-4 h-4 mr-1" /> Add
              </Button>
            </div>
             <div className="flex flex-wrap gap-2">
              {skillsToLearn.map((skill, index) => (
                <div
                  key={index}
                  className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-2"
                >
                    {skill}
                    <button onClick={() => removeSkillLearn(index)} className="hover:text-white">
                        <X className="w-3 h-3" />
                    </button>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        <Button onClick={handleSave} disabled={loading} className="w-full">
            {loading ? 'Saving...' : 'Save Profile'}
        </Button>
      </div>
    </div>
  );
}
