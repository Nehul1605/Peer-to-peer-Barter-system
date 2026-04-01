import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, X, Lightbulb, User, Settings2, ShieldCheck, Sparkles, BookOpen, UserCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card } from '../../components/ui/card';
import { toast } from 'sonner';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Textarea } from '../../components/ui/textarea';

export default function SkillProfile() {
  const { user, setUser } = useAuth();
  const [skillsIKnow, setSkillsIKnow] = useState<string[]>([]);
  const [skillsToLearn, setSkillsToLearn] = useState<string[]>([]);
  const [bio, setBio] = useState('');
  
  const [newSkillKnow, setNewSkillKnow] = useState('');
  const [newSkillLearn, setNewSkillLearn] = useState('');
  const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [isProfileConfigured, setIsProfileConfigured] = useState(false);
    const [hasResolvedInitialMode, setHasResolvedInitialMode] = useState(false);

    const hydrateProfileState = (profileUser: any) => {
        const skills = profileUser?.Skills || [];
        const nextBio = profileUser?.bio || '';
        setSkillsIKnow(skills.filter((s: any) => s.type === 'TEACH').map((s: any) => s.name));
        setSkillsToLearn(skills.filter((s: any) => s.type === 'LEARN').map((s: any) => s.name));
        setBio(nextBio);

        const hasConfiguredProfile = Boolean(nextBio?.trim()) || skills.length > 0;
        setIsProfileConfigured(hasConfiguredProfile);
        return hasConfiguredProfile;
    };

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const response = await api.get('/users/profile');
                if (response.data?.success) {
                    const profileUser = response.data.data;
                    setUser(profileUser);
                    const configured = hydrateProfileState(profileUser);
                    setIsEditing(!configured);
                    setHasResolvedInitialMode(true);
                    return;
                }
            } catch (error) {
                console.error('Failed to load profile for skill page', error);
            }

            const configured = hydrateProfileState(user);
            setIsEditing(!configured);
            setHasResolvedInitialMode(true);
            setIsInitialLoading(false);
        };

        loadProfile().finally(() => setIsInitialLoading(false));
    }, [setUser]);

    useEffect(() => {
        if (isInitialLoading || !user) return;
        const configured = hydrateProfileState(user);
        if (!hasResolvedInitialMode) {
            setIsEditing(!configured);
            setHasResolvedInitialMode(true);
        }
    }, [user, isInitialLoading, hasResolvedInitialMode]);

  const addSkillKnow = () => {
    if (newSkillKnow.trim() && !skillsIKnow.includes(newSkillKnow.trim())) {
      setSkillsIKnow([...skillsIKnow, newSkillKnow.trim()]);
      setNewSkillKnow('');
    }
  };

  const addSkillLearn = () => {
    if (newSkillLearn.trim() && !skillsToLearn.includes(newSkillLearn.trim())) {
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
                const updatedUser = response.data.data;
                setUser(updatedUser);
                setIsProfileConfigured(hydrateProfileState(updatedUser));
        toast.success("Profile updated successfully!");
        setIsEditing(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 mt-8 px-4 md:px-0">
            {isInitialLoading ? (
                <Card className="bg-neutral-900/40 backdrop-blur-xl border-white/10 p-8 rounded-3xl text-neutral-300">
                    Loading your profile...
                </Card>
            ) : (
            <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
           <div className="inline-block px-3 py-1 mb-4 rounded-full bg-white/5 border border-white/10 text-sm text-neutral-300">
            <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-emerald-400" /> Identity & Growth</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">My Profile</h1>
          <p className="text-neutral-400 text-lg">Define who you are and what you want to achieve.</p>
        </motion.div>
        
        {!isEditing && (
            <Button onClick={() => setIsEditing(true)} variant="outline" className="gap-2 bg-white/5 border-white/10 hover:bg-white/10">
                <Settings2 className="w-4 h-4" /> Edit Profile
            </Button>
        )}
      </div>

      <AnimatePresence mode="wait">
      {isEditing ? (
          <motion.div
            key="edit"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-6"
          >
            {!isProfileConfigured && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-2xl flex items-start gap-4 mb-8">
                    <div className="p-3 bg-emerald-500/20 rounded-full text-emerald-400">
                        <UserCircle className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-emerald-400 mb-1">Welcome! Let's build your profile.</h3>
                        <p className="text-neutral-400 text-sm">To get the best matches, add a bio, the skills you can teach, and the skills you want to learn. This takes less than a minute.</p>
                    </div>
                </div>
            )}
            <Card className="bg-neutral-900/40 backdrop-blur-xl border-white/10 p-8 rounded-3xl">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><User className="w-5 h-5 text-emerald-400" /> About Me</h2>
                <Textarea 
                    value={bio} 
                    onChange={(e) => setBio(e.target.value)} 
                    placeholder="Tell us a little about yourself, your background, and your goals..."
                    className="bg-black/40 border-white/10 text-white min-h-[120px] resize-none focus-visible:ring-emerald-500/50"
                />
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-neutral-900/40 backdrop-blur-xl border-white/10 p-8 rounded-3xl">
                    <div className="flex flex-col mb-6">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center mb-4 border border-emerald-500/20">
                            <Lightbulb className="w-6 h-6 text-emerald-400" />
                        </div>
                        <h2 className="text-xl font-bold">Skills to Teach</h2>
                        <p className="text-sm text-neutral-400 mt-1">What can you offer to others?</p>
                    </div>

                    <div className="flex gap-2 mb-6">
                    <Input
                        placeholder="e.g. React, UX Design..."
                        value={newSkillKnow}
                        onChange={(e) => setNewSkillKnow(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addSkillKnow()}
                        className="bg-black/40 border-white/10 text-white placeholder:text-neutral-500 focus-visible:ring-emerald-500/50"
                    />
                    <Button onClick={addSkillKnow} className="bg-emerald-500 hover:bg-emerald-600 text-white border-0 px-3">
                        <Plus className="w-5 h-5" />
                    </Button>
                    </div>

                    <div className="flex flex-wrap gap-2 min-h-[50px]">
                    {skillsIKnow.map((skill, index) => (
                        <div key={index} className="px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-2 group transition-colors hover:bg-emerald-500/20">
                            <span className="font-medium text-sm">{skill}</span>
                            <button onClick={() => removeSkillKnow(index)} className="text-emerald-500/50 group-hover:text-emerald-400 transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                    {skillsIKnow.length === 0 && <span className="text-sm text-neutral-600 italic">No skills added yet.</span>}
                    </div>
                </Card>

                <Card className="bg-neutral-900/40 backdrop-blur-xl border-white/10 p-8 rounded-3xl">
                    <div className="flex flex-col mb-6">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center mb-4 border border-blue-500/20">
                            <BookOpen className="w-6 h-6 text-blue-400" />
                        </div>
                        <h2 className="text-xl font-bold">Skills to Learn</h2>
                        <p className="text-sm text-neutral-400 mt-1">What are you looking to master?</p>
                    </div>

                    <div className="flex gap-2 mb-6">
                    <Input
                        placeholder="e.g. Python, Piano..."
                        value={newSkillLearn}
                        onChange={(e) => setNewSkillLearn(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addSkillLearn()}
                        className="bg-black/40 border-white/10 text-white placeholder:text-neutral-500 focus-visible:ring-blue-500/50"
                    />
                    <Button onClick={addSkillLearn} className="bg-blue-500 hover:bg-blue-600 text-white border-0 px-3">
                        <Plus className="w-5 h-5" />
                    </Button>
                    </div>

                    <div className="flex flex-wrap gap-2 min-h-[50px]">
                    {skillsToLearn.map((skill, index) => (
                        <div key={index} className="px-4 py-2 rounded-xl bg-blue-500/10 text-blue-300 border border-blue-500/20 flex items-center gap-2 group transition-colors hover:bg-blue-500/20">
                            <span className="font-medium text-sm">{skill}</span>
                            <button onClick={() => removeSkillLearn(index)} className="text-blue-500/50 group-hover:text-blue-400 transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                    {skillsToLearn.length === 0 && <span className="text-sm text-neutral-600 italic">No skills added yet.</span>}
                    </div>
                </Card>
            </div>

            <div className="flex gap-4 pt-4">
                <Button 
                    onClick={handleSave} 
                    disabled={loading || (skillsIKnow.length === 0 && skillsToLearn.length === 0)} 
                    className="flex-1 bg-white text-black hover:bg-neutral-200 py-6 text-lg rounded-xl font-semibold shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)]"
                >
                    {loading ? 'Saving Changes...' : 'Save Profile'}
                </Button>
                {isProfileConfigured && (
                    <Button 
                        onClick={() => setIsEditing(false)} 
                        variant="secondary"
                        disabled={loading} 
                        className="py-6 px-8 text-lg rounded-xl bg-white/5 hover:bg-white/10"
                    >
                        Cancel
                    </Button>
                )}
            </div>
          </motion.div>
      ) : (
          <motion.div
             key="view"
             initial={{ opacity: 0, scale: 0.98 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 0.98 }}
             className="space-y-6"
          >
              <Card className="bg-neutral-900/40 backdrop-blur-xl border-white/5 p-8 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-indigo-500"></div>
                <div className="flex items-start gap-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-700 p-1 flex-shrink-0">
                        {user?.avatar ? (
                            <img src={user.avatar} className="w-full h-full rounded-full object-cover" />
                        ) : (
                            <div className="w-full h-full rounded-full bg-neutral-800 flex items-center justify-center">
                                <User className="w-10 h-10 text-neutral-400" />
                            </div>
                        )}
                    </div>
                    <div className="flex-1 pt-2">
                        <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-2xl font-bold">{user?.name}</h2>
                            <ShieldCheck className="w-5 h-5 text-emerald-500" />
                        </div>
                        <p className="text-neutral-300 text-lg leading-relaxed">{user?.bio || <span className="text-neutral-500 italic">No bio provided.</span>}</p>
                    </div>
                </div>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-neutral-900/40 backdrop-blur-xl border-white/5 p-8 rounded-3xl">
                      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                          <Lightbulb className="w-5 h-5 text-emerald-400" />
                          <h3 className="text-lg font-semibold">I Can Teach</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                          {skillsIKnow.map((s, i) => (
                              <span key={i} className="px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-medium">
                                  {s}
                              </span>
                          ))}
                      </div>
                  </Card>
                  
                  <Card className="bg-neutral-900/40 backdrop-blur-xl border-white/5 p-8 rounded-3xl">
                      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                          <BookOpen className="w-5 h-5 text-blue-400" />
                          <h3 className="text-lg font-semibold">I Want to Learn</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                          {skillsToLearn.map((s, i) => (
                              <span key={i} className="px-4 py-2 rounded-xl bg-blue-500/10 text-blue-300 border border-blue-500/20 font-medium">
                                  {s}
                              </span>
                          ))}
                      </div>
                  </Card>
              </div>
          </motion.div>
      )}
      </AnimatePresence>
            </>
            )}
    </div>
  );
}
