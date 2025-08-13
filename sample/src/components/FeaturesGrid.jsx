import React from 'react'
import { motion } from "framer-motion";
import { LuBell, LuBrain, LuCalendar, LuDollarSign } from 'react-icons/lu';
import { LucidePieChart } from 'lucide-react';

const features = [
    {
        title: 'Income & Expense Tracking',
        description: 'Automatically categorize and track all your financial transactions in real-time.',
        icon: LuDollarSign,
        size: 'large',
        color: 'from-emerald-500 to-teal-500',
        textColor: 'text-white',
        stats: { amount: '$3,247', label: 'This Month' }
    },
    {
        title: 'Smart Budget Creation',
        description: 'AI-powered budget recommendations based on your spending patterns and goals.',
        icon: LucidePieChart,
        size: 'medium',
        color: 'from-blue-500 to-cyan-500',
        textColor: 'text-white',
        stats: { amount: '85%', label: 'Budget Used' }
    },
    {
        title: 'Recurring Transactions',
        description: 'Schedule and automate recurring payments, subscriptions, and transfers.',
        icon: LuCalendar,
        size: 'medium',
        color: 'from-purple-500 to-pink-500',
        textColor: 'text-white',
        stats: { amount: '12', label: 'Active Schedules' }
    },
    {
        title: 'AI Financial Insights',
        description: 'Get personalized recommendations and insights to optimize your spending habits.',
        icon: LuBrain,
        size: 'large',
        color: 'from-gray-800 to-gray-900',
        textColor: 'text-white',
        insights: [
            'Reduce dining out by 20%',
            'Increase savings by $300/month',
            'Consider investment opportunities'
        ]
    },
    {
        title: 'Smart Alerts & Notifications',
        description: 'Email alerts for overspending, upcoming bills, and budget milestones.',
        icon: LuBell,
        size: 'large',
        color: 'from-orange-500 to-red-500',
        textColor: 'text-white',
        alerts: [
            { type: 'warning', message: 'Grocery budget 90% used' },
            { type: 'info', message: 'Rent due in 3 days' },
            { type: 'success', message: 'Savings goal achieved!' }
        ]
    }
];

const FeaturesGrid = ({ isDark }) => {
    return (
        <section id="features" className={` py-24 px-6 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
            <div className='max-w-7xl mx-auto'>
                <motion.div className={`text-center mb-16`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <motion.div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6 ${isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600'
                        }`}
                        whileHover={{ scale: 1.05 }}
                    >
                        POWERFUL FEATURES
                    </motion.div>
                    <h2 className={`text-5xl lg:text-6xl font-bold mb-6 
                        ${isDark ? 'text-white' : 'text-gray-900'}
                        `}>
                        Everything You Need
                    </h2>
                    <p className={`text-xl max-w-3xl mx-auto leading-relaxed
                        ${isDark ? 'text-white' : 'text-gray-900'}
                        `}>Comprehensive personal finance management with AI-powered insights and automation
                    </p>
                </motion.div>
                <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr'>
                    {/* Income & Expense tracking portion */}
                    <motion.div className={`col-span-1 md:col-span-1 lg:col-span-2 p-8 rounded-3xl bg-gradient-to-br ${features[0].color} relative overflow-hidden`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05, y: -5 }}
                    >
                        <div className='flex items-center space-x-3 mb-6'>
                            <div className='w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center'> {React.createElement(features[0].icon, { className: 'w-6 h-6 text-white' })}
                            </div>
                            <div>
                                <h3 className={`text-2xl font-bold ${features[0].textColor}`}>
                                    {features[0].title}
                                </h3>
                                <p className='text-white/80 text-sm'>
                                    {features[0].description}
                                </p>
                            </div>
                        </div>
                        <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                            <div className="text-4xl font-bold text-white mb-2">{features[0].stats.amount}</div>
                            <div className="text-white/70 text-sm">
                                {features[0].stats.label}
                            </div>
                            <div className="mt-4 flex space-x-4">
                                <div className='text-center'>
                                    <div className='text-lg font-bold text-white'>$1,847</div>
                                    <div className='text-xs text-white/70'>Income</div>
                                </div>
                                <div className='text-center'>
                                    <div className='text-lg font-bold text-white'>$1,400</div>
                                    <div className='text-xs text-white/70'>Expenses
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    {/* Smart Budget creation portion */}
                    <motion.div className={`col-span-1 p-6 rounded-3xl bg-gradient-to-br ${features[1].color} relative overflow-hidden`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5, scale: 1.02 }}
                    >
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                            {React.createElement(features[1].icon, { className: 'w-5 h-5 text-white' })}
                        </div>
                        <h3 className={`text-lg font-bold mb-3 ${features[1].textColor}`}>
                            {features[1].title}
                        </h3>
                        <p className='text-white/80 text-sm mb-6'>
                            {features[1].description}
                        </p>
                        <div className='text-center'>
                            <div className="text-3xl font-bold text-white">{features[1].stats.amount}</div>
                            <div className="text-white/70 text-sm">{features[1].stats.label}</div>
                        </div>
                    </motion.div>
                    {/* Recurring Transactions Portion*/}
                    <motion.div
                        className={`col-span-1 p-6 rounded-3xl bg-gradient-to-br ${features[2].color} relative overflow-hidden`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5, scale: 1.02 }}
                    >
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                            {React.createElement(features[2].icon, { className: "w-5 h-5 text-white" })}
                        </div>
                        <h3 className={`text-lg font-bold mb-3 ${features[2].textColor}`}>
                            {features[2].title}
                        </h3>
                        <p className="text-white/80 text-sm mb-6">
                            {features[2].description}
                        </p>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">{features[2].stats.amount}</div>
                            <div className="text-white/70 text-sm">{features[2].stats.label}</div>
                        </div>
                    </motion.div>

                    {/* AI Financial Insights  Portion*/}
                    <motion.div
                        className={`col-span-1 md:col-span-2 lg:col-span-2 p-8 rounded-3xl bg-gradient-to-br ${features[3].color} relative overflow-hidden`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5, scale: 1.02 }}
                    >
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center">
                                {React.createElement(features[3].icon, { className: "w-6 h-6 text-emerald-400" })}
                            </div>
                            <div>
                                <h3 className={`text-2xl font-bold ${features[3].textColor}`}>
                                    {features[3].title}
                                </h3>
                                <p className="text-gray-300 text-sm">
                                    {features[3].description}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {features[3].insights.map((insight, index) => (
                                <motion.div
                                    key={index}
                                    className="flex items-center space-x-3 bg-gray-700/50 rounded-xl p-3"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                                    <span className="text-gray-300 text-sm">{insight}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Smart Alerts  Portion*/}
                    <motion.div
                        className={`col-span-1 md:col-span-2 lg:col-span-2 p-8 rounded-3xl bg-gradient-to-br ${features[4].color} relative overflow-hidden`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5, scale: 1.02 }}
                    >
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                                {React.createElement(features[4].icon, { className: "w-6 h-6 text-white" })}
                            </div>
                            <div>
                                <h3 className={`text-2xl font-bold ${features[4].textColor}`}>
                                    {features[4].title}
                                </h3>
                                <p className="text-white/80 text-sm">
                                    {features[4].description}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {features[4].alerts.map((alert, index) => (
                                <motion.div
                                    key={index}
                                    className={`flex items-center space-x-3 rounded-xl p-3 ${alert.type === 'warning' ? 'bg-yellow-500/20' :
                                        alert.type === 'info' ? 'bg-blue-500/20' : 'bg-green-500/20'
                                        }`}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <div className={`w-2 h-2 rounded-full ${alert.type === 'warning' ? 'bg-yellow-400' :
                                        alert.type === 'info' ? 'bg-blue-400' : 'bg-green-400'
                                        }`}></div>
                                    <span className="text-white text-sm">{alert.message}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default FeaturesGrid