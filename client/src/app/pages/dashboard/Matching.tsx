import { useState } from 'react';
import { motion } from 'motion/react';
import { Users, ArrowRight, Check, X, Sparkles, MessageCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { toast } from 'sonner';

interface Match {
  id: number;
  name: string;
  avatar: string;
  skillsTheyKnow: string[];
  skillsTheyWantToLearn: string[];
  matchScore: number;
  bio: string;
  sessionsCompleted: number;
}

export default function Matching() {
  const [matches, setMatches] = useState<Match[]>([
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'SJ',
      skillsTheyKnow: ['React Development', 'TypeScript', 'Node.js'],
      skillsTheyWantToLearn: ['UI/UX Design', 'Figma'],
      matchScore: 95,
      bio: 'Frontend developer passionate about building beautiful web experiences.',
      sessionsCompleted: 24,
    },
    {
      id: 2,
      name: 'Mike Chen',
      avatar: 'MC',
      skillsTheyKnow: ['Python Programming', 'Data Science', 'Machine Learning'],
      skillsTheyWantToLearn: ['React Development', 'TypeScript'],
      matchScore: 92,
      bio: 'Data scientist looking to expand into web development.',
      sessionsCompleted: 18,
    },
    {
      id: 3,
      name: 'Emma Davis',
      avatar: 'ED',
      skillsTheyKnow: ['Graphic Design', 'Adobe Illustrator', 'Branding'],
      skillsTheyWantToLearn: ['UI/UX Design', 'Web Development'],
      matchScore: 88,
      bio: 'Creative designer eager to learn digital product design.',
      sessionsCompleted: 31,
    },
    {
      id: 4,
      name: 'Alex Brown',
      avatar: 'AB',
      skillsTheyKnow: ['Java', 'Spring Boot', 'Cloud Computing'],
      skillsTheyWantToLearn: ['React Development', 'Modern Frontend'],
      matchScore: 85,
      bio: 'Backend engineer wanting to become full-stack.',
      sessionsCompleted: 15,
    },
  ]);

  const handleConnect = (match: Match) => {
    toast.success(`Connection request sent to ${match.name}! They'll be notified soon.`);
    setMatches(matches.filter(m => m.id !== match.id));
  };

  const handleSkip = (matchId: number) => {
    setMatches(matches.filter(m => m.id !== matchId));
    toast.info('Skipped. Finding more matches...');
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl mb-2 flex items-center gap-2">
          <Users className="w-8 h-8 text-brand-primary" />
          Find Your Perfect Match
        </h1>
        <p className="text-neutral-400">
          We've found {matches.length} potential learning partners based on your skill profile!
        </p>
      </motion.div>

      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 border border-brand-primary/30 rounded-lg p-4 mb-6"
      >
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-neutral-300">
              <strong>How it works:</strong> Connect with users who know what you want to learn and want to learn what you know. 
              After connecting, schedule sessions to exchange knowledge. Each session earns both participants equal credits based on time spent!
            </p>
          </div>
        </div>
      </motion.div>

      {/* Matches Grid */}
      <div className="space-y-6">
        {matches.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="bg-neutral-900/40 backdrop-blur-xl border-neutral-800 p-12 text-center">
              <Users className="w-16 h-16 text-neutral-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No more matches at the moment</h3>
              <p className="text-neutral-400 mb-4">
                We're constantly finding new matches for you. Check back soon or update your skill profile!
              </p>
              <Button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary hover:to-brand-secondary"
              >
                Refresh Matches
              </Button>
            </Card>
          </motion.div>
        ) : (
          matches.map((match, index) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-neutral-900/40 backdrop-blur-xl border-neutral-800 p-6 hover:bg-neutral-900/60 transition-all">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Left: Avatar & Basic Info */}
                  <div className="flex items-start gap-4 lg:w-1/3">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary flex items-center justify-center text-xl font-bold flex-shrink-0">
                      {match.avatar}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-1">{match.name}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-green-500/20 border border-green-500/30 text-green-400 px-2 py-1 rounded text-xs font-medium">
                          {match.matchScore}% Match
                        </div>
                        <span className="text-sm text-neutral-400">
                          {match.sessionsCompleted} sessions
                        </span>
                      </div>
                      <p className="text-sm text-neutral-400">{match.bio}</p>
                    </div>
                  </div>

                  {/* Middle: Skills Exchange */}
                  <div className="lg:w-2/5 space-y-3">
                    {/* Skills they can teach you */}
                    <div>
                      <p className="text-xs text-neutral-400 mb-2 font-medium">They can teach you:</p>
                      <div className="flex flex-wrap gap-2">
                        {match.skillsTheyKnow.slice(0, 3).map((skill, idx) => (
                          <span
                            key={idx}
                            className="bg-green-500/20 border border-green-500/30 text-green-400 px-2 py-1 rounded text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Arrow indicating exchange */}
                    <div className="flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-neutral-500 rotate-90 lg:rotate-180" />
                      <ArrowRight className="w-4 h-4 text-neutral-500 -ml-2 rotate-90 lg:rotate-180" />
                    </div>

                    {/* Skills you can teach them */}
                    <div>
                      <p className="text-xs text-neutral-400 mb-2 font-medium">You can teach them:</p>
                      <div className="flex flex-wrap gap-2">
                        {match.skillsTheyWantToLearn.slice(0, 3).map((skill, idx) => (
                          <span
                            key={idx}
                            className="bg-brand-primary/20 border border-brand-primary/30 text-brand-primary px-2 py-1 rounded text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="lg:w-1/4 flex lg:flex-col gap-3 lg:justify-center">
                    <Button
                      onClick={() => handleConnect(match)}
                      className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white group"
                    >
                      <Check className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                      Connect
                    </Button>
                    <Button
                      onClick={() => handleSkip(match.id)}
                      variant="outline"
                      className="flex-1 border-neutral-800 text-neutral-400 hover:bg-neutral-900/40 hover:text-white group"
                    >
                      <X className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                      Skip
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* Match Stats */}
      {matches.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <Card className="bg-neutral-900/40 backdrop-blur-xl border-neutral-800 p-4 text-center">
            <p className="text-2xl font-bold text-brand-primary">{matches.length}</p>
            <p className="text-sm text-neutral-400">Available Matches</p>
          </Card>
          <Card className="bg-neutral-900/40 backdrop-blur-xl border-neutral-800 p-4 text-center">
            <p className="text-2xl font-bold text-green-400">
              {Math.round(matches.reduce((acc, m) => acc + m.matchScore, 0) / matches.length)}%
            </p>
            <p className="text-sm text-neutral-400">Average Match Score</p>
          </Card>
          <Card className="bg-neutral-900/40 backdrop-blur-xl border-neutral-800 p-4 text-center">
            <p className="text-2xl font-bold text-brand-secondary">12</p>
            <p className="text-sm text-neutral-400">Skills in Common</p>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
