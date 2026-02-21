import { useState } from 'react';
import { motion } from 'motion/react';
import { Video, Calendar, Clock, ExternalLink, RotateCcw, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { toast } from 'sonner';

interface Session {
  id: number;
  partner: string;
  skill: string;
  date: string;
  time: string;
  duration: number;
  type: 'learning' | 'teaching';
  status: 'upcoming' | 'completed' | 'cancelled';
  meetingLink?: string;
  creditsEarned?: number;
}

export default function Sessions() {
  const [sessions] = useState<Session[]>([
    {
      id: 1,
      partner: 'Sarah Johnson',
      skill: 'React Development',
      date: '2026-02-19',
      time: '10:00 AM',
      duration: 60,
      type: 'learning',
      status: 'upcoming',
      meetingLink: 'https://meet.google.com/abc-defg-hij',
    },
    {
      id: 2,
      partner: 'Mike Chen',
      skill: 'UI/UX Design',
      date: '2026-02-20',
      time: '2:00 PM',
      duration: 60,
      type: 'teaching',
      status: 'upcoming',
      meetingLink: 'https://teams.microsoft.com/meeting/xyz',
    },
    {
      id: 3,
      partner: 'Emma Davis',
      skill: 'Python Programming',
      date: '2026-02-21',
      time: '4:00 PM',
      duration: 60,
      type: 'learning',
      status: 'upcoming',
      meetingLink: 'https://meet.google.com/xyz-abcd-efg',
    },
    {
      id: 4,
      partner: 'John Doe',
      skill: 'TypeScript',
      date: '2026-02-17',
      time: '11:00 AM',
      duration: 60,
      type: 'teaching',
      status: 'completed',
      creditsEarned: 60,
    },
    {
      id: 5,
      partner: 'Alex Brown',
      skill: 'Node.js',
      date: '2026-02-15',
      time: '3:00 PM',
      duration: 90,
      type: 'learning',
      status: 'completed',
      creditsEarned: 90,
    },
    {
      id: 6,
      partner: 'Lisa Wang',
      skill: 'GraphQL',
      date: '2026-02-14',
      time: '1:00 PM',
      duration: 45,
      type: 'teaching',
      status: 'completed',
      creditsEarned: 45,
    },
  ]);

  const upcomingSessions = sessions.filter(s => s.status === 'upcoming');
  const completedSessions = sessions.filter(s => s.status === 'completed');

  const handleJoinSession = (session: Session) => {
    if (session.meetingLink) {
      window.open(session.meetingLink, '_blank');
      toast.success('Opening meeting link...');
    }
  };

  const handleRequestAgain = (session: Session) => {
    toast.success(`Session request sent to ${session.partner} for ${session.skill}!`);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl mb-2 flex items-center gap-2">
          <Video className="w-8 h-8 text-brand-primary" />
          My Sessions
        </h1>
        <p className="text-neutral-400">
          Manage your learning and teaching sessions
        </p>
      </motion.div>

      {/* Session Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
      >
        <Card className="bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 border-brand-primary/30 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">{upcomingSessions.length}</p>
              <p className="text-sm text-neutral-400">Upcoming Sessions</p>
            </div>
            <Calendar className="w-10 h-10 text-brand-primary" />
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-green-500/10 to-teal-500/10 border-green-500/30 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">{completedSessions.length}</p>
              <p className="text-sm text-neutral-400">Completed Sessions</p>
            </div>
            <CheckCircle2 className="w-10 h-10 text-green-400" />
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/30 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">
                {completedSessions.reduce((acc, s) => acc + (s.creditsEarned || 0), 0)}
              </p>
              <p className="text-sm text-neutral-400">Credits Earned</p>
            </div>
            <Clock className="w-10 h-10 text-yellow-400" />
          </div>
        </Card>
      </motion.div>

      {/* Sessions Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="bg-neutral-900/40 border border-neutral-800">
            <TabsTrigger value="upcoming">
              Upcoming ({upcomingSessions.length})
            </TabsTrigger>
            <TabsTrigger value="history">
              History ({completedSessions.length})
            </TabsTrigger>
          </TabsList>

          {/* Upcoming Sessions */}
          <TabsContent value="upcoming" className="mt-6 space-y-4">
            {upcomingSessions.length === 0 ? (
              <Card className="bg-neutral-900/40 backdrop-blur-xl border-neutral-800 p-12 text-center">
                <AlertCircle className="w-16 h-16 text-neutral-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No upcoming sessions</h3>
                <p className="text-neutral-400 mb-4">
                  Connect with learning partners to schedule your first session!
                </p>
                <Button
                  onClick={() => window.location.href = '/dashboard/matching'}
                  className="bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary hover:to-brand-secondary"
                >
                  Find Matches
                </Button>
              </Card>
            ) : (
              upcomingSessions.map((session, index) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-neutral-900/40 backdrop-blur-xl border-neutral-800 p-6 hover:bg-neutral-900/60 transition-all">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold">{session.skill}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            session.type === 'learning' 
                              ? 'bg-brand-primary/20 text-brand-primary border border-brand-primary/30' 
                              : 'bg-green-500/20 text-green-400 border border-green-500/30'
                          }`}>
                            {session.type === 'learning' ? '📚 Learning' : '👨‍🏫 Teaching'}
                          </span>
                        </div>
                        <p className="text-neutral-400 mb-3">with {session.partner}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-neutral-400">
                          <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(session.date).toLocaleDateString('en-US', { 
                              weekday: 'short',
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                          <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {session.time} ({session.duration} min)
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        {session.meetingLink && (
                          <Button
                            onClick={() => handleJoinSession(session)}
                            className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 group"
                          >
                            <ExternalLink className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                            Join Session
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Meeting Link Display */}
                    {session.meetingLink && (
                      <div className="mt-4 pt-4 border-t border-neutral-800">
                        <p className="text-xs text-neutral-400 mb-1">Meeting Link:</p>
                        <div className="bg-neutral-900/40 rounded px-3 py-2 text-sm text-brand-primary font-mono">
                          {session.meetingLink}
                        </div>
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))
            )}
          </TabsContent>

          {/* Session History */}
          <TabsContent value="history" className="mt-6 space-y-4">
            {completedSessions.length === 0 ? (
              <Card className="bg-neutral-900/40 backdrop-blur-xl border-neutral-800 p-12 text-center">
                <CheckCircle2 className="w-16 h-16 text-neutral-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No session history yet</h3>
                <p className="text-neutral-400">
                  Complete your first session to see it here!
                </p>
              </Card>
            ) : (
              completedSessions.map((session, index) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-neutral-900/40 backdrop-blur-xl border-neutral-800 p-6 hover:bg-neutral-900/60 transition-all">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                          <h3 className="text-xl font-semibold">{session.skill}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            session.type === 'learning' 
                              ? 'bg-brand-primary/20 text-brand-primary border border-brand-primary/30' 
                              : 'bg-green-500/20 text-green-400 border border-green-500/30'
                          }`}>
                            {session.type === 'learning' ? '📚 Learned' : '👨‍🏫 Taught'}
                          </span>
                        </div>
                        <p className="text-neutral-400 mb-3">with {session.partner}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-neutral-400">
                          <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(session.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                          <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {session.duration} minutes
                          </span>
                          {session.creditsEarned && (
                            <span className="flex items-center gap-2 text-yellow-400">
                              💰 +{session.creditsEarned} credits
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          onClick={() => handleRequestAgain(session)}
                          variant="outline"
                          className="border-neutral-800 hover:bg-neutral-900/40 group"
                        >
                          <RotateCcw className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                          Request Again
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Info Box */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 bg-brand-primary/10 border border-brand-primary/30 rounded-lg p-4"
      >
        <p className="text-sm text-neutral-300">
          💡 <strong>Session Credits:</strong> Both participants earn equal credits based on session duration 
          (60 min session = 60 credits each). Credits are automatically added after session completion. 
          You can request additional sessions with the same partner from your history!
        </p>
      </motion.div>
    </div>
  );
}
