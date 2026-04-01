import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Video, Calendar, Clock, User, ChevronRight, CheckCircle2, XCircle, AlertCircle, Sparkles } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { format } from 'date-fns';

export default function Sessions() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await api.get('/sessions');
      if (response.data.success) {
        setSessions(response.data.data);
      }
    } catch (error) {
      toast.error('Failed to load sessions');
    } finally {
      setLoading(false);
    }
  };

  const updateSessionStatus = async (sessionId: string, status: string) => {
    try {
      const response = await api.put(`/sessions/${sessionId}`, { status });
      if (response.data.success) {
        toast.success(`Session ${status.toLowerCase()}`);
        fetchSessions();
      }
    } catch (error) {
      toast.error('Failed to update session');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SCHEDULED': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'PENDING': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'COMPLETED': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'CANCELLED': return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
      default: return 'bg-neutral-500/10 text-neutral-500 border-neutral-500/20';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 px-4 md:px-0 mt-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-secondary/50 border border-border/50 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-primary" /> Manage Connections</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-2">Your Sessions</h1>
          <p className="text-muted-foreground text-lg">Connect, teach, and learn with your matches.</p>
        </motion.div>
      </div>

      <div className="grid gap-6">
        <AnimatePresence mode="popLayout">
          {sessions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="col-span-1"
            >
              <Card className="flex flex-col items-center justify-center p-12 text-center border-border/50 backdrop-blur-sm rounded-3xl bg-card/50">
                <div className="w-20 h-20 rounded-full bg-secondary/30 flex items-center justify-center mb-6 border border-border/50 shadow-sm">
                  <Calendar className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">No active sessions</h3>
                <p className="text-muted-foreground mb-8 max-w-sm text-lg">
                  You don't have any upcoming or pending sessions. Explore matches to start learning!
                </p>
                <Button onClick={() => navigate('/dashboard/matching')} className="rounded-full px-8 py-6 text-lg font-medium">
                  Find Matches <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </Card>
            </motion.div>
          ) : (
            sessions.map((session: any, index: number) => {
              const isRequester = session.learnerId === user?.id;
              const otherPerson = isRequester ? session.teacher : session.learner;
              const isPending = session.status === 'PENDING';
              const canJoin = session.status === 'SCHEDULED';
              
              return (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="group relative overflow-hidden bg-neutral-950/40 border border-white/5 backdrop-blur-3xl hover:border-white/10 transition-all duration-500 rounded-3xl w-full">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    <div className="relative p-6 sm:p-8 flex flex-col lg:flex-row gap-8 lg:items-center justify-between">
                      <div className="flex-1 space-y-6">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className={`${getStatusColor(session.status)} px-3 py-1 rounded-full uppercase tracking-wider text-xs font-bold`}>
                            {session.status}
                          </Badge>
                          <span className="text-sm font-medium text-neutral-400 flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full">
                            {isRequester ? '📚 Learning' : '🎓 Teaching'} • <span className="text-white">{session.Skill?.name || 'Skill Room'}</span>
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-5">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-700 flex items-center justify-center border-2 border-neutral-700/50 shadow-xl overflow-hidden">
                            {otherPerson?.avatar ? (
                              <img src={otherPerson.avatar} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                              <User className="w-8 h-8 text-neutral-400" />
                            )}
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-2">
                              {otherPerson?.name || 'Unknown User'}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-neutral-400">
                              <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-md">
                                <Calendar className="w-4 h-4 text-emerald-400" />
                                {session.scheduledAt ? format(new Date(session.scheduledAt), 'MMM dd, yyyy') : 'No Date'}
                              </span>
                              <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-md">
                                <Clock className="w-4 h-4 text-blue-400" />
                                {session.scheduledAt ? format(new Date(session.scheduledAt), 'h:mm a') : 'No Time'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-stretch lg:items-end gap-3 pt-6 border-t border-white/5 lg:border-t-0 lg:pt-0 min-w-[200px] z-10">
                        {isPending && !isRequester ? (
                          <div className="flex flex-col gap-3 w-full">
                            <Button 
                              variant="outline" 
                              className="w-full bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/50 hover:text-emerald-300 transition-all rounded-xl py-6 text-base font-medium"
                              onClick={() => updateSessionStatus(session.id, 'SCHEDULED')}
                            >
                              <CheckCircle2 className="w-5 h-5 mr-2" /> Accept Request
                            </Button>
                            <Button 
                              variant="ghost" 
                              className="w-full text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors rounded-xl py-6"
                              onClick={() => updateSessionStatus(session.id, 'CANCELLED')}
                            >
                              <XCircle className="w-5 h-5 mr-2" /> Decline
                            </Button>
                          </div>
                        ) : null}

                        {isPending && isRequester ? (
                           <div className="w-full p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 flex items-center justify-center gap-3 text-sm text-amber-500/80 font-medium">
                             <AlertCircle className="w-5 h-5" /> Awaiting tutor's response
                           </div>
                        ) : null}

                        {canJoin && (
                          <Button 
                            className="w-full relative group/btn overflow-hidden rounded-xl px-8 py-8 bg-white text-black hover:bg-neutral-200 transition-all shadow-[0_0_40px_-5px_rgba(255,255,255,0.4)] hover:shadow-[0_0_60px_-5px_rgba(255,255,255,0.6)] border-none"
                            onClick={() => navigate(`/dashboard/session/${session.id}/room`)}
                          >
                            <span className="relative z-10 flex flex-col items-center gap-1">
                              <span className="flex items-center gap-2 text-lg font-bold">
                                <Video className="w-6 h-6" /> Join Session
                              </span>
                              <span className="text-xs font-semibold uppercase tracking-wider text-black/60">Room is ready</span>
                            </span>
                          </Button>
                        )}

                        {!isPending && !canJoin && (
                          <div className="w-full">
                            {session.status === 'COMPLETED' ? (
                               <div className="w-full p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 flex items-center justify-center gap-3 text-sm text-blue-400 font-medium">
                                 <CheckCircle2 className="w-5 h-5" /> Session Completed
                               </div>
                            ) : session.status === 'CANCELLED' ? (
                               <div className="w-full p-4 rounded-xl bg-rose-500/5 border border-rose-500/10 flex items-center justify-center gap-3 text-sm text-rose-400 font-medium">
                                 <XCircle className="w-5 h-5" /> Session Cancelled
                               </div>
                            ) : null}
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
