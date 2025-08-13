import React, { useEffect } from 'react'
import { LuBrain, LuDollarSign, LuTarget, LuUser } from 'react-icons/lu'
import { motion } from 'framer-motion'

const stats = [
    {
        icon: LuDollarSign, value: '$50M+', label: 'Money Managed', color: 'from-emerald-500 to-teal-500'
    },
    {
        icon: LuUser, value: '25K+', label: 'Active Users', color: 'from-blue-600 to-cyan-500'
    },
    {
        icon: LuTarget, value: '89%', label: 'Budeget Accuracy', color: 'from-purple-500 to-indigo-400'
    },
    {
        icon: LuBrain, value: '24/7', label: 'AI Monitoring', color: 'from-orange-500 to-red-500'
    }
];


const StatsSection = ({ isDark }) => {

    useEffect(() => {

    }, [isDark])

    return (

        <section className={`py-20 px-6 
            ${isDark
                ? 'bg-gray-800'
                : 'bg-white'}`}
        >
            <div className='max-w-7xl mx-auto'>
                <motion.div
                    className='text-center mb-12'
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2
                        className={`text-3xl lg:text-4xl font-bold mb-4 
                        ${isDark ? 'text-white' : 'text-gray-900'

                            }`}
                    >Trusted by Thousands</h2>
                    <p className={`text-lg leading-relaxed ${isDark ? 'text-white' : 'text-gray-600'}`}>
                        Join users who have transformed their financial lives with our AI-powered budgeting tool.
                    </p>
                </motion.div>
                <motion.div className='grid grid-cols-2 lg:grid-cols-4 gap-8'
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    {stats.map((stat, index) => (
                        <motion.div key={stat.label}
                            className='text-center'
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                        >
                            <motion.div
                                className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl  flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all  duration-300`}

                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <stat.icon className='w-8 h-8 text-white' />
                            </motion.div>
                            <motion.div
                                className={`text-4xl lg:text-5xl font-bold mb-3 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, delay: index * 0.1 + 0.3 }}
                                viewport={{ once: true }}
                            >
                                {stat.value}
                            </motion.div>
                            <div className={`text-lg font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section >
    )
}

export default StatsSection