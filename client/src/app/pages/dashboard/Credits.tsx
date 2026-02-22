import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Coins, History, TrendingUp, Clock, Calendar, ArrowUpRight, ArrowDownRight, Users, Star } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

interface Transaction {
  id: string;
  type: 'earned' | 'spent';
  amount: number;
  description: string;
  partner: string;
  date: string;
  skill: string;
}

export default function Credits() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalEarned, setTotalEarned] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get('/sessions');
        if (response.data.success) {
          const sessions = response.data.data;
          
          // Filter only completed sessions
          const completedSessions = sessions.filter((s:any) => s.status === 'COMPLETED');
          
          const history: Transaction[] = completedSessions.map((s:any) => {
             const isTeacher = s.teacherId === user?.id;
             return {
                 id: s.id,
                 type: isTeacher ? 'earned' : 'spent',
                 amount: 60, // Fixed rate per session for now
                 description: isTeacher ? 'Teaching Session' : 'Learning Session',
                 partner: isTeacher ? s.learner?.name : s.teacher?.name,
                 date: new Date(s.updatedAt).toLocaleDateString(),
                 skill: s.topic
             }
          });

          setTransactions(history);
          
          // Calculate totals
          const earned = history.filter(t => t.type === 'earned').reduce((acc, curr) => acc + curr.amount, 0);
          const spent = history.filter(t => t.type === 'spent').reduce((acc, curr) => acc + curr.amount, 0);
          setTotalEarned(earned);
          setTotalSpent(spent);
        }
      } catch (error) {
        console.error("Failed to fetch history", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
        fetchHistory();
    }
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Credits Overview</h1>
        <p className="text-neutral-400">Track your earnings and spending across the platform</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-neutral-900/40 backdrop-blur-xl border-neutral-800 p-6 relative overflow-hidden group hover:border-brand-primary/50 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 rounded-full blur-2xl -translate-y-16 translate-x-16 group-hover:bg-brand-primary/20 transition-colors" />
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-brand-primary/20 flex items-center justify-center">
                <Coins className="w-6 h-6 text-brand-primary" />
              </div>
              <p className="text-sm text-neutral-400 font-medium">Current Balance</p>
            </div>
            <h3 className="text-3xl font-bold mb-2">{user?.credits || 0}</h3>
            <div className="flex items-center text-sm text-neutral-400">
              <span>Available Credits</span>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-neutral-900/40 backdrop-blur-xl border-neutral-800 p-6 relative overflow-hidden group hover:border-brand-secondary/50 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-2xl -translate-y-16 translate-x-16 group-hover:bg-green-500/20 transition-colors" />
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                <ArrowUpRight className="w-6 h-6 text-green-500" />
              </div>
              <p className="text-sm text-neutral-400 font-medium">Total Earned</p>
            </div>
            <h3 className="text-3xl font-bold mb-2">{totalEarned}</h3>
            <div className="flex items-center text-green-400 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+12% vs last month</span>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-neutral-900/40 backdrop-blur-xl border-neutral-800 p-6 relative overflow-hidden group hover:border-red-500/50 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl -translate-y-16 translate-x-16 group-hover:bg-red-500/20 transition-colors" />
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                <ArrowDownRight className="w-6 h-6 text-red-500" />
              </div>
              <p className="text-sm text-neutral-400 font-medium">Total Spent</p>
            </div>
            <h3 className="text-3xl font-bold mb-2">{totalSpent}</h3>
            <div className="flex items-center text-neutral-400 text-sm">
              <Clock className="w-4 h-4 mr-1" />
              <span>Last spent 2 days ago</span>
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-neutral-900/40 backdrop-blur-xl border-neutral-800 p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <History className="w-5 h-5" />
                Transaction History
              </h3>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-neutral-800/30 border border-neutral-800/50 hover:border-neutral-700 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === 'earned' 
                          ? 'bg-green-500/20 text-green-500' 
                          : 'bg-red-500/20 text-red-500'
                      }`}>
                        {transaction.type === 'earned' ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="font-medium text-white">{transaction.description}</p>
                        <div className="flex items-center gap-2 text-sm text-neutral-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {transaction.date}
                          </span>
                          <span>•</span>
                          <span>{transaction.partner}</span>
                        </div>
                      </div>
                    </div>
                    <div className={`text-lg font-bold ${
                      transaction.type === 'earned' ? 'text-green-400' : 'text-white'
                    }`}>
                      {transaction.type === 'earned' ? '+' : '-'}{transaction.amount}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
        
        <div className="lg:col-span-1">
            <Card className="bg-neutral-900/40 backdrop-blur-xl border-neutral-800 p-6 mb-6">
              <h3 className="text-xl font-bold mb-6">Ways to Earn</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                     <Coins className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Teach a Session</h4>
                    <p className="text-sm text-neutral-400">Earn 60 credits per hour by teaching your skills</p>
                  </div>
                </div>
                 <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center shrink-0">
                     <Star className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Get Rated 5 Stars</h4>
                    <p className="text-sm text-neutral-400">Bonus 10 credits for excellent teaching reviews</p>
                  </div>
                </div>
              </div>
            </Card>
        </div>

      </div>
    </div>
  );
}
