import { motion } from 'motion/react';
import { Coins, TrendingUp, TrendingDown, Clock, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card } from '../../components/ui/card';

interface Transaction {
  id: number;
  type: 'earned' | 'spent';
  amount: number;
  description: string;
  partner: string;
  date: string;
  skill: string;
}

export default function Credits() {
  const currentBalance = 240;
  const totalEarned = 540;
  const totalSpent = 300;

  const transactions: Transaction[] = [
    {
      id: 1,
      type: 'earned',
      amount: 60,
      description: 'Teaching session completed',
      partner: 'John Doe',
      date: '2026-02-17',
      skill: 'TypeScript',
    },
    {
      id: 2,
      type: 'spent',
      amount: 90,
      description: 'Learning session completed',
      partner: 'Alex Brown',
      date: '2026-02-15',
      skill: 'Node.js',
    },
    {
      id: 3,
      type: 'earned',
      amount: 45,
      description: 'Teaching session completed',
      partner: 'Lisa Wang',
      date: '2026-02-14',
      skill: 'GraphQL',
    },
    {
      id: 4,
      type: 'spent',
      amount: 60,
      description: 'Learning session completed',
      partner: 'Mike Chen',
      date: '2026-02-12',
      skill: 'Python Programming',
    },
    {
      id: 5,
      type: 'earned',
      amount: 60,
      description: 'Teaching session completed',
      partner: 'Sarah Johnson',
      date: '2026-02-10',
      skill: 'React Development',
    },
    {
      id: 6,
      type: 'spent',
      amount: 90,
      description: 'Learning session completed',
      partner: 'Emma Davis',
      date: '2026-02-08',
      skill: 'UI/UX Design',
    },
    {
      id: 7,
      type: 'earned',
      amount: 75,
      description: 'Teaching session completed',
      partner: 'Tom Wilson',
      date: '2026-02-05',
      skill: 'JavaScript',
    },
    {
      id: 8,
      type: 'spent',
      amount: 60,
      description: 'Learning session completed',
      partner: 'Rachel Green',
      date: '2026-02-03',
      skill: 'Data Science',
    },
  ];

  const monthlyData = [
    { month: 'Jan', earned: 180, spent: 120 },
    { month: 'Feb', earned: 240, spent: 180 },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl mb-2 flex items-center gap-2">
          <Coins className="w-8 h-8 text-yellow-400" />
          Credit Balance
        </h1>
        <p className="text-neutral-400">
          Track your earned and spent credits from skill exchange sessions
        </p>
      </motion.div>

      {/* Balance Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <Card className="bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-amber-500/20 border-yellow-500/30 p-8 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl" />
          
          <div className="relative">
            <p className="text-neutral-300 mb-2">Current Balance</p>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-6xl font-bold text-yellow-400">{currentBalance}</span>
              <span className="text-2xl text-neutral-400">credits</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-neutral-900/40 backdrop-blur-xl rounded-lg p-4 border border-neutral-800">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-400">Total Earned</p>
                    <p className="text-2xl font-bold text-green-400">{totalEarned}</p>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-900/40 backdrop-blur-xl rounded-lg p-4 border border-neutral-800">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-brand-primary/20 flex items-center justify-center">
                    <TrendingDown className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-400">Total Spent</p>
                    <p className="text-2xl font-bold text-brand-primary">{totalSpent}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Monthly Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <Card className="bg-neutral-900/40 backdrop-blur-xl border-neutral-800 p-6">
          <h2 className="text-xl font-semibold mb-6">Monthly Overview</h2>
          
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={data.month} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-400">{data.month} 2026</span>
                  <span className="text-neutral-300">
                    Net: {data.earned - data.spent > 0 ? '+' : ''}{data.earned - data.spent} credits
                  </span>
                </div>
                <div className="flex gap-2 h-8">
                  <div
                    className="bg-green-500/30 border border-green-500/50 rounded flex items-center justify-center text-xs font-medium"
                    style={{ width: `${(data.earned / (data.earned + data.spent)) * 100}%` }}
                  >
                    +{data.earned}
                  </div>
                  <div
                    className="bg-brand-primary/30 border border-brand-primary/50 rounded flex items-center justify-center text-xs font-medium"
                    style={{ width: `${(data.spent / (data.earned + data.spent)) * 100}%` }}
                  >
                    -{data.spent}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Transaction History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="bg-neutral-900/40 backdrop-blur-xl border-neutral-800 p-6">
          <h2 className="text-xl font-semibold mb-6">Transaction History</h2>
          
          <div className="space-y-3">
            {transactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="bg-neutral-900/40 border border-neutral-800 rounded-lg p-4 hover:bg-neutral-900/60 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      transaction.type === 'earned'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-brand-primary/20 text-brand-primary'
                    }`}>
                      {transaction.type === 'earned' ? (
                        <ArrowUpRight className="w-5 h-5" />
                      ) : (
                        <ArrowDownRight className="w-5 h-5" />
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                          <h3 className="font-medium">{transaction.skill}</h3>
                          <p className="text-sm text-neutral-400">{transaction.description}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-3 text-xs text-neutral-500 mt-2">
                        <span className="flex items-center gap-1">
                          👤 {transaction.partner}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(transaction.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className={`text-right flex-shrink-0 ${
                    transaction.type === 'earned'
                      ? 'text-green-400'
                      : 'text-brand-primary'
                  }`}>
                    <p className="text-xl font-bold">
                      {transaction.type === 'earned' ? '+' : '-'}{transaction.amount}
                    </p>
                    <p className="text-xs text-neutral-500">credits</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Info Box */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4"
      >
        <p className="text-sm text-neutral-300">
          💰 <strong>How Credits Work:</strong> Every minute you spend in a session (teaching or learning) 
          earns you 1 credit. A 60-minute session = 60 credits. Use credits to book learning sessions with 
          other users. The system ensures fair exchange—both participants always earn equal credits!
        </p>
      </motion.div>
    </div>
  );
}
