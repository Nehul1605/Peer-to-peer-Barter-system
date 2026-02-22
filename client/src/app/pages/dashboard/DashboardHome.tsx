import { useState, useEffect } from 'react';
import { motion } from "motion/react";
import { Coins, Users, Video, TrendingUp } from "lucide-react";
import { Card } from "../../components/ui/card";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

export default function DashboardHome() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await api.get('/sessions');
        if (response.data.success) {
          setSessions(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch sessions", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  const completedSessions = sessions.filter((s:any) => s.status === 'COMPLETED').length;
  const activeMatches = sessions.filter((s:any) => s.status === 'PENDING' || s.status === 'SCHEDULED');
  
  const stats = [
    {
      icon: Coins,
      label: "Total Credits",
      value: user?.credits || 0,
      color: "from-brand-primary to-brand-primary/60",
    },
    {
      icon: Users,
      label: "Active Sessions",
      value: activeMatches.length,
      color: "from-brand-secondary to-brand-secondary/60",
    },
    {
      icon: Video,
      label: "Sessions Completed",
      value: completedSessions,
      color: "from-brand-primary to-brand-secondary",
    },
    {
      icon: TrendingUp,
      label: "Profile Views",
      value: "25",
      color: "from-brand-primary/80 to-brand-secondary/80",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl mb-2">Welcome back, {user?.name}! 👋</h1>
        <p className="text-neutral-400">
          Here's what's happening with your skill exchange journey
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-neutral-900/40 backdrop-blur-xl border-neutral-800 p-6 hover:border-brand-primary/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center p-2.5`}
                  >
                    <Icon className="w-full h-full text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-400">{stat.label}</p>
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Upcoming Sessions</h2>
          {activeMatches.length > 0 ? (
            <div className="space-y-4">
              {activeMatches.slice(0, 3).map((session:any, index:number) => (
                <Card key={index} className="p-4 bg-neutral-900/40 border-neutral-800">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{session.topic}</p>
                      <p className="text-sm text-neutral-400">
                        {session.teacherId === user?.id 
                          ? `Teaching ${session.learner?.name}` 
                          : `Learning from ${session.teacher?.name}`}
                      </p>
                    </div>
                    <div className="text-right">
                      {session.status === 'SCHEDULED' ? (
                         <span className="text-green-400 text-sm">Scheduled</span>
                      ) : (
                         <span className="text-yellow-400 text-sm">Pending</span>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
              <p className="text-neutral-500">No upcoming sessions. Find a match!</p>
          )}
        </div>
      </div>
    </div>
  );
}
