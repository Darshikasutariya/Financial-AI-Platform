
import { motion } from 'framer-motion';
import React from 'react'
import { LuBrain, LuArrowRight, LuBell, LuTarget } from "react-icons/lu";

const features = [
    { icon: LuBrain, title: 'AI-Powered Insights', desc: 'Smart financial recommendations' },
    { icon: LuBell, title: 'Real-Time Alerts', desc: 'Stay on top of your finances' },
    { icon: LuTarget, title: 'Goal Tracking', desc: 'Achieve your financial dreams' }
]

const Footer = ({ isDark }) => {
    return (
        <section className={`py-24 px-6 relative overflow-hidden
        ${isDark
                ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-slate-950'
                : 'bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50'
            }`}>

            {/* animation */}
            <div className={`absolute inset-0 ${isDark
                ? 'bg-gradient-to-br from-gray-900/90 via-slate-900/80 to-emerald-950/90'
                : 'bg-gradient-to-br from-slate-50/80 via-blue-50/60 to-emerald-50/80'
                }`}>
                <motion.div
                    className={`absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl ${isDark ? 'bg-emerald-500/10' : 'bg-emerald-500/20'
                        }`}
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className={`absolute bottom-20 right-20 w-80 h-80 rounded-full blur-3xl ${isDark ? 'bg-teal-500/10' : 'bg-teal-500/20'
                        }`}
                    animate={{
                        x: [0, -80, 0],
                        y: [0, 60, 0],
                        scale: [1, 0.8, 1],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>
            <div className='max-w-6xl mx-auto text-center relative z-10'>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <motion.div className={`inline-flex items-center px-6 py-3 rounded-full border mb-8 ${isDark
                        ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400'
                        : 'bg-emerald-100 border-emerald-200 text-emerald-700'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-sm font-semibold">✨ Advanced AI-Powered Finance</span>
                    </motion.div>

                    <motion.h2 className={`font-bold text-5xl lg:text-7xl mb-12 leading-tight ${isDark ? 'text-gray-100' : 'text-slate-800'
                        }`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        Start Your{' '}
                        <span className={`bg-gradient-to-r text-transparent bg-clip-text ${isDark
                            ? 'from-emerald-400 to-teal-300'
                            : 'from-emerald-600 to-teal-600'
                            }`}>Smart Money</span>
                        {' '}Journey Today!
                    </motion.h2>

                    <motion.p className={`text-xl mb-12 max-w-4xl mx-auto leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-600'
                        }`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        Join thousands of users who have already taken control of their finances with FinanceAI's intelligent platform. Experience AI-powered personal finance management that actually works.
                    </motion.p>

                    <motion.div className='flex flex-col justify-center items-center gap-6 mb-16 sm:flex-row sm:gap-x-4'
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <motion.button className="font-bold flex items-center justify-center text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-xl py-5 px-12 text-xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
                            whileHover={{ scale: 1.05, y: -3 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Start Free Trial
                            <LuArrowRight className='ml-2 w-5 h-5' />
                        </motion.button>

                        <motion.button className={`font-bold py-5 px-12 border-2 rounded-xl text-xl shadow-lg transition-all duration-300 flex items-center justify-center backdrop-blur-sm ${isDark
                            ? 'border-gray-600 hover:border-emerald-500 text-gray-300 hover:text-white'
                            : 'border-slate-300 hover:border-emerald-500 text-slate-700 hover:text-emerald-600 hover:bg-white/50'
                            }`}
                            whileHover={{ scale: 1.05, y: -3 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            How It Works
                        </motion.button>
                    </motion.div>

                    {/* Features Highlights */}
                    <motion.div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        {features.map((feature, index) => (
                            <motion.div key={feature.title} className='text-center'
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                            >
                                <motion.div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border ${isDark
                                    ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-emerald-500/30'
                                    : 'bg-gradient-to-r from-emerald-100 to-teal-100 border-emerald-200'
                                    }`}
                                    whileHover={{ scale: 1.1, rotateZ: 5 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <feature.icon className={`w-8 h-8 ${isDark ? 'text-emerald-400' : 'text-emerald-600'
                                        }`} />
                                </motion.div>
                                <h3 className={`font-bold text-lg mb-2 ${isDark ? 'text-gray-100' : 'text-slate-800'
                                    }`}>{feature.title}</h3>
                                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-600'
                                    }`}>{feature.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

export default Footer;