import React from 'react';
import { motion } from 'framer-motion';
import { Users, DollarSign, PieChart, AlertTriangle, TrendingUp, Eye } from 'lucide-react';
import { mockAdminStats } from '../../data/mokeAdminData'

const AdminDashboard = ({isDark}) => {
  const stats = mockAdminStats;

  const statCards = [
    {
      title: 'Total Users',
      value: stats.total_users.toLocaleString(),
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      change: '+12%'
    },
    {
      title: 'Active Users',
      value: stats.active_users.toLocaleString(),
      icon: TrendingUp,
      color: 'from-emerald-500 to-teal-500',
      change: '+8%'
    },
    {
      title: 'New Users (Month)',
      value: stats.new_users_this_month.toLocaleString(),
      icon: Users,
      color: 'from-purple-500 to-pink-500',
      change: '+23%'
    },
    {
      title: 'Total Transactions',
      value: stats.total_transactions.toLocaleString(),
      icon: DollarSign,
      color: 'from-orange-500 to-red-500',
      change: '+15%'
    },
    {
      title: 'Categories',
      value: stats.total_categories.toString(),
      icon: PieChart,
      color: 'from-indigo-500 to-purple-500',
      change: '+2'
    },
    {
      title: 'Pending Reviews',
      value: stats.pending_reviews.toString(),
      icon: AlertTriangle,
      color: 'from-yellow-500 to-orange-500',
      change: '-5'
    }
  ];

  const recentActivities = [
    { action: 'New user registered', user: 'john@example.com', time: '2 minutes ago' },
    { action: 'Transaction flagged for review', user: 'sarah@example.com', time: '15 minutes ago' },
    { action: 'Category updated', user: 'Admin', time: '1 hour ago' },
    { action: 'User account suspended', user: 'spam@example.com', time: '2 hours ago' }
  ];

  const quickActions = [
    { title: 'View Users', icon: Users, href: '/admin/users' },
    { title: 'Review Transactions', icon: Eye, href: '/admin/financial' },
    { title: 'Manage Content', icon: PieChart, href: '/admin/content' },
    { title: 'Send Announcement', icon: AlertTriangle, href: '/admin/content' }
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto px-4">
      {/* Header */}
      <div>
        <h1 className={`text-3xl font-bold transition-colors duration-300 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          Admin Dashboard
        </h1>
        <p className={`mt-2 transition-colors duration-300 ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Overview of your FinanceAI platform
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              className={`rounded-2xl p-6 shadow-lg border transition-all duration-300 ${
                isDark 
                  ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
                  : 'bg-white border-gray-200 hover:shadow-xl'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium transition-colors duration-300 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {card.title}
                  </p>
                  <p className={`text-3xl font-bold mt-2 transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {card.value}
                  </p>
                  <div className="flex items-center mt-2">
                    <span className={`text-sm font-medium transition-colors duration-300 ${
                      isDark ? 'text-emerald-400' : 'text-emerald-600'
                    }`}>
                      {card.change}
                    </span>
                    <span className={`text-sm ml-1 transition-colors duration-300 ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      vs last month
                    </span>
                  </div>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-r ${card.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          className={`rounded-2xl p-6 shadow-lg border transition-all duration-300 ${
            isDark 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          }`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className={`text-lg font-semibold mb-4 transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-300 ${
                isDark ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {activity.action}
                  </p>
                  <p className={`text-xs transition-colors duration-300 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {activity.user} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className={`rounded-2xl p-6 shadow-lg border transition-all duration-300 ${
            isDark 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          }`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className={`text-lg font-semibold mb-4 transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.title}
                  className={`p-4 rounded-xl transition-all duration-200 text-left ${
                    isDark 
                      ? 'bg-gray-700 hover:bg-gray-600' 
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-6 h-6 text-emerald-500 mb-2" />
                  <p className={`text-sm font-medium transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {action.title}
                  </p>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
