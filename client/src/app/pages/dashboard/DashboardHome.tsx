import { useState, useEffect } from 'react';
import { motion } from "motion/react";
import { Coins, Users, Video, TrendingUp, Sparkles, Calendar, ArrowRight, Clock } from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { useAuth } from "../../context/AuthContext";
import { Link } from 'react-router-dom';
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
  const upcomingSession = sessions.find((s:any) => s.status === 'SCHEDULED');

  const stats = [
    { icon: Coins, label: "Total Credits", value: user?.credits || 0, change: "+12%" },
    { icon: Users, label: "Active Sessions", value: activeMatches.length, change: "Current" },
    { icon: Video, label: "Completed", value: completedSessions, change: "All time" },
    { icon: TrendingUp, label: "Profile Views", value: "25", change: "This week" },
  ];

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-8">
      {/* Hero Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}, {user?.name?.split(' ')[0]}
          </h1>
          <p className="text-muted-foreground mt-1">Ready to learn something new today?</p>
        </motion.div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Calendar className="w-4 h-4" /> Schedule
          </Button>
          <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20">
            <Sparkles className="w-4 h-4" /> Find Match
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-5 border-border/50 bg-card/60 backdrop-blur-sm hover:border-border transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-secondary/10 rounded-lg text-primary">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary/5 text-muted-foreground">
                    {stat.change}
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight">{stat.value}</h3>
                  <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Session Banner */}
          {upcomingSession ? (
            <Card className="p-6 border-primary/20 bg-primary/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 text-primary font-medium mb-1">
                    <Clock className="w-4 h-4" /> Upcoming Session
                  </div>
                  <h3 className="text-xl font-bold">Python Basics with Sarah</h3>
                  <p className="text-muted-foreground mt-1">Today, 3:00 PM • 60 mins</p>
                </div>
                <Button className="w-full sm:w-auto">Join Meeting</Button>
              </div>
            </Card>
          ) : (
            <Card className="p-8 border-dashed border-border flex flex-col items-center justify-center text-center space-y-4 bg-muted/5">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">No upcoming sessions</h3>
                <p className="text-muted-foreground text-sm max-w-sm mx-auto mt-1">
                  You don't have any sessions scheduled. Find a match to start learning!
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link to="/dashboard/matching">Browse Mentors</Link>
              </Button>
            </Card>
          )}

          {/* Quick Actions Grid */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              Learning Path <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Card className="p-5 hover:bg-muted/5 transition-colors cursor-pointer group border-border/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                    <code className="text-sm font-bold">JS</code>
                  </div>
                  <div>
                    <h4 className="font-semibold group-hover:text-primary transition-colors">JavaScript Fundamentals</h4>
                    <div className="w-full bg-secondary/20 h-1.5 rounded-full mt-2 w-24">
                      <div className="bg-blue-500 h-full rounded-full w-[60%]" />
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-5 hover:bg-muted/5 transition-colors cursor-pointer group border-border/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                    <code className="text-sm font-bold">Py</code>
                  </div>
                  <div>
                    <h4 className="font-semibold group-hover:text-primary transition-colors">Python Data Science</h4>
                    <div className="w-full bg-secondary/20 h-1.5 rounded-full mt-2 w-24">
                      <div className="bg-emerald-500 h-full rounded-full w-[30%]" />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Sidebar Activity */}
        <div className="space-y-6">
          <Card className="p-5 border-border/50 h-full">
            <h3 className="font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-border">
              {/* Activity Item 1 */}
              <div className="relative pl-6">
                <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-background border-2 border-primary z-10" />
                <p className="text-sm font-medium">Completed session</p>
                <p className="text-xs text-muted-foreground">React Hooks Masterclass</p>
                <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
              </div>
              
              {/* Activity Item 2 */}
              <div className="relative pl-6">
                <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-background border-2 border-muted-foreground/30 z-10" />
                <p className="text-sm font-medium">New match request</p>
                <p className="text-xs text-muted-foreground">Alex wants to learn Figma</p>
                <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
              </div>

              {/* Activity Item 3 */}
              <div className="relative pl-6">
                <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-background border-2 border-emerald-500/50 z-10" />
                <p className="text-sm font-medium">Earned 50 Credits</p>
                <p className="text-xs text-muted-foreground">Teaching Web Design</p>
                <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

