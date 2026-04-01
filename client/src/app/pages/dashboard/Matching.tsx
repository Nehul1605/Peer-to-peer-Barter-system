import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, Star, MessageCircle, RefreshCw } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card } from '../../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import api from '../../services/api';
import { toast } from 'sonner';
import { useAuth } from '../../context/AuthContext';

export default function Matching() {
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasLoadedDefaults, setHasLoadedDefaults] = useState(false);

  useEffect(() => {
    if (user?.Skills && !hasLoadedDefaults) {
      const skillsToLearn = user.Skills.filter((s: any) => s.type === 'LEARN').map((s: any) => s.name);
      if (skillsToLearn.length > 0) {
        const defaultQuery = skillsToLearn.join(', ');
        setQuery(defaultQuery);
        fetchMultipleMatches(skillsToLearn);
      }
      setHasLoadedDefaults(true);
    }
  }, [user, hasLoadedDefaults]);

  const fetchMultipleMatches = async (skills: string[]) => {
      setLoading(true);
      try {
          const allResults = [];
          const seenSkillIds = new Set();
          
          for (const skill of skills) {
              const response = await api.get('/skills/search', {
                  params: { query: skill.trim(), type: 'TEACH' }
              });
              if (response.data.success) {
                  for (const match of response.data.data) {
                      if (!seenSkillIds.has(match.id)) {
                          seenSkillIds.add(match.id);
                          allResults.push(match);
                      }
                  }
              }
          }
          setResults(allResults);
      } catch (error) {
          console.error(error);
          toast.error("Search failed");
      } finally {
          setLoading(false);
      }
  };

  const fetchMatches = async (searchQuery: string) => {
      // If the user manually types comma-separated skills, we can search them one by one
      const skills = searchQuery.split(',').map(s => s.trim()).filter(Boolean);
      if (skills.length > 0) {
          await fetchMultipleMatches(skills);
      } else {
          setResults([]);
      }
  };

  const handleSearch = () => {
      fetchMatches(query);
  };

  const handleRequestSession = async (teacherId: string, skillId: string, topic: string) => {
      try {
          const response = await api.post('/sessions/request', {
              teacherId,
              skillId,
              topic: `Learning ${topic}`,
              scheduledAt: new Date(Date.now() + 86400000).toISOString(),
              durationMinutes: 60
          });
          if(response.data.success) {
              toast.success("Request sent!");
          }
      } catch (error: any) {
          toast.error(error.response?.data?.message || "Failed to request session");
      }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Input 
            placeholder="What do you want to learn today?" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-neutral-900/40 border-neutral-800"
        />
        <Button onClick={handleSearch} disabled={loading}>
            {loading ? <RefreshCw className="animate-spin" /> : <Search className="w-4 h-4 mr-2" />}
            Find Tutors
        </Button>
      </div>

      <div className="grid gap-4">
        {results.map((skill: any) => (
            <motion.div key={skill.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Card className="p-4 bg-neutral-900/40 border-neutral-800 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar>
                            <AvatarImage src={skill.User.avatar} />
                            <AvatarFallback>{skill.User.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="font-semibold">{skill.User.name}</h3>
                            <p className="text-sm text-neutral-400">Teaches: {skill.name}</p>
                            <div className="flex gap-2 mt-1">
                                <Badge variant="secondary" className="text-xs">
                                    {skill.User.credits} Credits Cost
                                </Badge>
                            </div>
                        </div>
                    </div>
                    <Button onClick={() => handleRequestSession(skill.User.id, skill.id, skill.name)}>
                        Request Session
                    </Button>
                </Card>
            </motion.div>
        ))}
        {!loading && results.length === 0 && query && (
            <p className="text-center text-neutral-500">No matching tutors found.</p>
        )}
      </div>
    </div>
  );
}
