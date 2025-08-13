import React from 'react'
import { motion } from "framer-motion"
import { LuCheck, LuCrown, LuStar, LuZap } from 'react-icons/lu'


const plans = [
    {
        icon: LuZap,
        name: 'Free',
        desc: 'Perfect for getting started with personal finance',
        price: '$0',
        period: 'Forever',
        color: 'from-blue-500 to-cyan-500',
        features: [
            'Connect up to 2 bank accounts',
            'Basic expense tracking',
            'Simple budget creation',
            'Monthly financial reports',
            'Email support'
        ],
        popular: false
    },
    {
        icon: LuStar,
        name: 'Premium',
        desc: 'Advanced features for serious money management',
        price: '$9.99',
        period: 'per Month',
        color: 'from-emerald-500 to-teal-500',
        features: [
            'Unlimited bank accounts',
            'AI-powered insights & recommendations',
            'Smart spending alerts',
            'Recurring transaction scheduling',
            'Advanced budget analytics',
            'Goal tracking & planning',
            'Priority email support'
        ],
        popular: true
    },
    {
        icon: LuCrown,
        name: 'Family',
        desc: 'Comprehensive finance management for families',
        price: '$19.99',
        period: 'per Month',
        color: 'from-purple-500 to-pink-500',
        features: [
            'Everything in Premium',
            'Up to 6 family member accounts',
            'Shared budgets & goals',
            'Family spending insights',
            'Custom categories & tags',
            'Export data & reports',
            'Phone & chat support'
        ],
        popular: false
    }

];

const PricingSection = ({ isDark }) => {
    return (
        <section id="pricing" className={`px-6 py-24 ${isDark ? 'bg-gray-900 ' : 'bg-white'}}`}>
            <div className='max-w-7xl mx-auto'>
                <motion.div
                    className='text-center mb-16'
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >

                    <motion.div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6 ${isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600'}`}
                        whileHover={{ scale: 1.05 }}
                    >
                        SIMPLE PRICING
                    </motion.div>
                    <h2 className={`text-5xl lg:text-6xl font-bold mb-6
                        ${isDark ? 'text-white' : 'text-gray-900'}
                        `}>
                        Choose Your Plan
                    </h2>
                    <p className={`text-xl max-w-3xl mx-auto 
                    ${isDark ? 'text-gray-400' : 'text-gray-600'}
                    `}>
                        Start free and upgrade as your financial management needs grow.
                    </p>
                </motion.div>
                <div className='grid md:grid-clos-2 lg:grid-cols-3 gap-8'>
                    {plans.map((plan, index) => (
                        <motion.div key={plan.name}
                            className={`relative  p-8 rounded-3xl border backdrop-blur-sm
                            ${plan.popular
                                    ? isDark
                                        ? 'bg-gray-800 border-emerald-500 shadow-2xl shadow-emerald-500/20'
                                        : ' bg-white border-emerald-500 shadow-2xl shadow-emerald-500/20'

                                    : isDark
                                        ? 'bg-gray-800/50 border-gray-700 hover:border-emerald-500/50'
                                        : 'bg-white border-gray-200 hover:border-emerald-500/50'
                                } transition-all duration-300 hover:shadow-2xl group `}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10, scale: 1.05 }}
                        >
                            {plan.popular && (
                                <motion.div
                                    className='absolute -top-4 left-1/4 transform -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-2 rounded-full text-sm font-bold'
                                >
                                    Most Popular
                                </motion.div>
                            )}

                            <motion.div className='text-center mb-9'
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                                viewport={{ once: true }}
                            >
                                <motion.div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                                    <plan.icon className='w-8 h-8 text-white' />
                                </motion.div>
                                <h3 className={`text-2xl font-bold  mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {plan.name}
                                </h3>
                                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {plan.desc}
                                </p>
                            </motion.div>
                            <motion.div className='text-center mb-8'
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                                viewport={{ once: true }}
                            >
                                <div className={`text-5xl font-bold mb-2 bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>
                                    {plan.price}
                                </div>
                                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {plan.period}
                                </div>
                            </motion.div>
                            <motion.ul
                                className='space-y-4 mb-8'
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
                                viewport={{ once: true }}
                            >
                                {plan.features.map((feature, featureIndex) => (
                                    <motion.li key={featureIndex}
                                        className='flex items-center space-x-3 '
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.1 + 0.6 + featureIndex * 0.1 }}
                                        viewport={{ once: true }}
                                    >

                                        <div className={`w-5 h-5 bg-gradient-to-r ${plan.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                                            <LuCheck className='w-3 h-3 text-white' />
                                        </div>
                                        <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                            {feature}
                                        </span>
                                    </motion.li>
                                ))}
                            </motion.ul>
                            <motion.button className={`w-full   py-4 rounded-xl font-semibold transition-all duration-300
                                ${plan.popular
                                    ? `bg-gradient-to-r ${plan.color} text-white shadow-lg hover:shadow-xl`
                                    : isDark
                                        ? 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 '
                                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-200'
                                }`}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 + 0.7 }}
                                viewport={{ once: true }}
                            >
                                {plan.price === "$0" ? "Start Free" : "Upgrade Now"}
                            </motion.button>
                        </motion.div>

                    ))}
                </div>
                <motion.div className='text-center mt-16'
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    viewport={{ once: true }}
                >
                    <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>All paid plans include a 14-day trial. Cancel anytime.
                    </p>
                    <motion.button
                        className={`mt-4 text-emerald-500 hover:text-emerald-400 font-semibold transition-colors`}
                        whileHover={{ scale: 1.05 }}>
                        Compare all features →
                    </motion.button>
                </motion.div>
            </div>
        </section >
    )
}

export default PricingSection