import React, { useState, useEffect, useRef } from 'react'
import { color, motion, number } from "framer-motion"
import { LuArrowRight, LuBrain, LuCheck, LuCreditCard, LuPlay, LuUserPlus } from 'react-icons/lu'
import { FiCheckCircle } from "react-icons/fi";

const steps = [
    {
        number: '01',
        title: 'Create Account',
        desc: 'Sign up securely and connect your bank accounts with bank-level encryption.',
        icon: LuUserPlus,
        details: [
            'Quick 2-minute signup process',
            'Bank-level 256-bit encryption',
            'Connect multiple accounts',
            'Instant verification'
        ]

    },
    {
        number: '02',
        title: 'Track Finances',
        description: 'Automatically categorize income and expenses with AI-powered transaction analysis.',
        icon: LuCreditCard,
        details: [
            'Automatic transaction categorization',
            'Real-time expense tracking',
            'Income vs expense analysis',
            'Smart spending insights'
        ]
    },
    {

        number: '03',
        title: 'Get AI Insights',
        description: 'Receive personalized recommendations and smart alerts to optimize your finances.',
        icon: LuBrain,
        details: [
            'Personalized budget recommendations',
            'Smart spending alerts',
            'Goal achievement tracking',
            'Financial health score'
        ],
    }
]

const features = [
    {
        name: 'Income Tracking',
        icon: '💰',
        color: 'from-emerald-500 to-teal-500'
    },
    {
        name: 'Budget Planning',
        icon: '📊',
        color: 'from-blue-500 to-cyan-500'
    },
    {
        name: 'Smart Alerts',
        icon: '🔔',
        color: 'from-yellow-500 to-orange-500'
    }
]

const HowItWorksSection = ({ isDark }) => {

    const [activeStep, setActiveStep] = useState(0);
    const [isAutoPlay, setIsAutoPlay] = useState(true);
    const intervalRef = useRef(null);

    // Auto change steps
    useEffect(() => {
        if (!isAutoPlay) return; // ✅ if stopped, skip interval

        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % steps.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [isAutoPlay]);

    // stop autoplay function
    const stopAutoPlay = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    // Handle manual click
    const handleStepClick = (index) => {
        setActiveStep(index);
        stopAutoPlay(); // stop automatic rotation once user clicks
    };

    return (
        <section id='how-it-works' className={`py-24 px-6 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className='max-w-7xl mx-auto'>
                {/* header */}
                <motion.div className='text-center mb-16'
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <motion.div className={`inline-block font-semibold px-4 py-2 mb-6 rounded-full ${isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600'}`}
                        whileHover={{ scale: 1.05 }}
                    >
                        SAMPLE SETUP
                    </motion.div>
                    <h2 className={`text-5xl lg:text-6xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        How it works?
                    </h2>
                    <button
                        onClick={() => setIsAutoPlay(!isAutoPlay)}
                        className={`mt-4 px-5 py-2 rounded-lg font-semibold transition ${isDark
                            ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                            : 'bg-emerald-500 text-white hover:bg-emerald-600'
                            }`}
                    >
                        {isAutoPlay ? '⏸ Pause Auto Change' : '▶ Resume Auto Change'}
                    </button>
                </motion.div>

                {/* Steps for Processing */}
                <motion.div
                    className="flex flex-col lg:flex-row gap-4 mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    {steps.map((step, index) => {
                        const StepIcon = step.icon;
                        return (
                            <motion.button key={step.number}
                                onClick={() => setActiveStep(index)}
                                className={`flex-1 p-6 rounded-2xl border transition-all  duration-300 text-left 
                                    ${activeStep === index
                                        ? isDark
                                            ? 'bg-gray-800 border-emerald-500/50 shadow-lg shadow-emerald-500/10'
                                            : 'bg-white border-emerald-500/50 shadow-lg shadow-emerald-500/10'
                                        : isDark
                                            ? 'bg-gray-800/50 border-gray-700 hover:border-emerald-500/30'
                                            : 'bg-white/50 border-gray-200 hover:border-emerald-500/30'
                                    }`}
                                whileHover={{ scale: 1.05, y: -5 }}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                            >
                                <div className='flex items-center space-x-4'>
                                    <div className={`w-12 h-12  flex items-center justify-center rounded-xl
                                        ${activeStep === index
                                            ? 'bg-emerald-500'
                                            : isDark
                                                ? 'bg-gray-700'
                                                : 'bg-gray-200'
                                        }`}>
                                        <StepIcon className={`w-6 h-6 
                                            ${activeStep === index
                                                ? 'text-white'
                                                : isDark
                                                    ? 'text-gray-400'
                                                    : 'text-gray-600'
                                            }
                                            `} />
                                    </div>
                                    <div>
                                        <h3 className={`font-bold text-lg 
                                            ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                            {step.title}
                                        </h3>
                                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'
                                            }`}>
                                            {step.number}
                                        </span>
                                    </div>
                                </div>
                            </motion.button>
                        )
                    })}
                </motion.div>

                {/* Active Step Content */}
                <div className='grid lg:grid-cols-2 gap-16 items-start '>
                    {/* Left Side - Step Details */}
                    <motion.div
                        key={activeStep}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className='space-y-8'>
                            <div>
                                <motion.h3
                                    className={`text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                >
                                    {steps[activeStep].number}.
                                    <br />
                                    {steps[activeStep].title.split(' ').map((word, index) => (
                                        <span key={index}>
                                            {word}<br />
                                        </span>
                                    ))}
                                </motion.h3>
                                <motion.p
                                    className={`text-lg leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                >
                                    {steps[activeStep].desc}
                                </motion.p>

                                {/* Step Details */}
                                <motion.div className="space-y-3 mb-8"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}>
                                    {steps[activeStep].details.map((detail, index) => (
                                        <motion.div key={index}
                                            className="flex items-center space-x-3"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                                        >
                                            <FiCheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                                            <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{detail}</span>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                            <motion.button
                                className='bg-gradient-to-r  from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 flex items-center'
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.7 }}
                            >
                                {activeStep === 0
                                    ? 'Start Free Trial'
                                    : activeStep === 1
                                        ? 'Connect Account'
                                        : 'Get AI Insights'
                                }
                                <LuArrowRight className='w-5 h-5 ml-2' />
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* right side - Interactive Dashboard */}
                    <motion.div
                        key={`dashboaed-${activeStep}`}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className={`rounded-3xl p-8 border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-2xl`}>
                            {/*Dashboard Header*/}
                            <motion.div className="flex items-center space-x-3 mb-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}>
                                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                                    {React.createElement(steps[activeStep].icon, { className: 'w-4 h-4 text-white' })}
                                </div>
                                <div>
                                    <h4 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{steps[activeStep].title}</h4>
                                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Step {activeStep + 1} of 3
                                    </p>
                                </div>
                            </motion.div>

                            {/* Dashboard Image */}
                            {/* Feature Cards */}
                            {activeStep === 0 && (
                                <div className='grid grid-cols-3 gap-4 mb-6'>
                                    {features.map((feature, index) => (
                                        <motion.div
                                            key={feature.name}
                                            className={`p-4 rounded-2xl border text-center ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}
                                            whileHover={{ y: -5, scale: 1.05 }}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                                        >
                                            <div className="text-2xl mb-2">{feature.icon}</div>
                                            <h5 className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{feature.name}</h5>
                                        </motion.div>
                                    ))}
                                </div>
                            )}

                            {/* Stats Preview */}
                            <motion.div className={`rounded-2xl p-4 mb-6 ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}>
                                <div className='flex justify-between items-center'>
                                    <div>
                                        <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                            {activeStep === 0
                                                ? '$0'
                                                : activeStep === 1
                                                    ? '$4,247'
                                                    : '$5,680'
                                            }
                                        </div>
                                        <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                            {activeStep === 0
                                                ? 'Ready To Start'
                                                : activeStep === 1
                                                    ? 'Monthly Balance'
                                                    : 'Optimized Savings'}
                                        </div>
                                    </div>
                                    <div className='text-emerald-500 font-semibold'>
                                        {activeStep === 0
                                            ? 'New'
                                            : activeStep === 1
                                                ? '+12.5%'
                                                : '+28.4%'}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Action Button */}
                            <motion.div
                                className="flex space-x-3"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                <motion.button
                                    className={`flex-1 py-3 px-4 rounded-xl font-medium ${isDark ? 'bg-emerald-600 text-white' : 'bg-emerald-500 text-white'
                                        }`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {activeStep === 0
                                        ? 'Sign Up'
                                        : activeStep === 1
                                            ? 'Connect Bank'
                                            : 'View Insights'}
                                </motion.button>
                                <motion.button
                                    className={`px-4 py-3 rounded-xl font-medium border ${isDark ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-600'
                                        }`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <LuPlay className='w-4 h-4 mr-2' />
                                </motion.button>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default HowItWorksSection