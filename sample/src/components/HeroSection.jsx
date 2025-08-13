import React from 'react'
import { motion } from 'framer-motion'
import { LuArrowRight, LuBrain, LuPlay, LuShield } from 'react-icons/lu'
import Lottie from 'react-lottie'
import Finance from '../assets/Finance.json'

const HeroSection = ({ isDark }) => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Finance,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <>
            <section id="home" className={`min-h-screen pt-32 pb-20 px-6 relative overflow-hidden 
            ${isDark
                    ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-slate-950'
                    : 'bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50'
                }`}>
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"
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
                        className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"
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

                <div>
                    <div className='flex items-center sm:flex-col md:flex-row gap-6'>
                        {/* left Content */}
                        <div>
                            <motion.div className={`inline-flex items-center px-6 py-4  border rounded-full backdrop-blur-sm
                            ${isDark
                                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                    : 'bg-emerald-50 border-emerald-200 text-emerald-600'
                                }
                                `}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.9 }}
                                viewport={{ once: true }}
                            >
                                <LuBrain className='w-5 h-5 mr-2' />
                                <span className='text-sm font-semibold'>AI-Powered Personal Finance</span>
                                <LuArrowRight className='w-4 h-4 ml-2' />
                            </motion.div>
                            <motion.h1
                                className={`text-6xl lg:text-7xl mt-10 mb-10 font-bold leading-tight ${isDark ? 'text-white' : 'text-gray-900'
                                    }`}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                Smart Money{' '}
                                <br />
                                Management{' '}
                                <br />
                                <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
                                    Made Simple
                                </span>
                            </motion.h1>
                            <motion.p
                                className={`text-xl leading-relaxed max-w-2xl mt-5 mb-5 ${isDark ? 'text-gray-300' : 'text-gray-600'
                                    }`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                Take control of your finances with AI-powered insights. Track expenses, create budgets,
                                schedule transactions, and get personalized recommendations to achieve your financial goals.
                            </motion.p>

                            <motion.div
                                className="flex flex-col sm:flex-row gap-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                            >
                                <motion.button
                                    className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-10 py-4 rounded-xl font-semibold text-lg flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Start Managing Money
                                    <LuArrowRight className="w-5 h-5 ml-2" />
                                </motion.button>

                                <motion.button
                                    onClick={() => scrollToSection('how-it-works')}
                                    className={`px-10 py-4 rounded-xl font-semibold text-lg flex items-center justify-center border transition-all duration-300 ${isDark
                                        ? 'border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-emerald-500/50'
                                        : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-emerald-500/50'
                                        }`}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <LuPlay className="w-5 h-5 mr-2" />
                                    See How It Works
                                </motion.button>
                            </motion.div>
                            <motion.div
                                className="flex items-center space-x-8 pt-8"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.8 }}
                            >
                                <div className="flex items-center space-x-2">
                                    <LuBrain className="w-5 h-5 text-emerald-500" />
                                    <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                        AI-Powered Insights
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <LuShield className="w-5 h-5 text-emerald-500" />
                                    <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Bank-Level Security
                                    </span>
                                </div>
                            </motion.div>
                        </div>
                        {/* right content */}
                        <div>
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1, delay: 0.3 }}>
                                <Lottie options={defaultOptions}
                                    height={500}
                                    width={500}
                                    className='mt-10 mx-auto hidden sm:block'
                                />
                            </motion.div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HeroSection