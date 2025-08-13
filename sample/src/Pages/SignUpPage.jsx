import { Brain } from 'lucide-react'
import React from 'react'
import { FiCheckCircle } from "react-icons/fi";
import { LuUser, LuMail, LuLock, LuEye, LuEyeOff } from "react-icons/lu";

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '@/components/header';

const benefits = [
  'AI powered financial insights',
  'Tools for tracking and analyzing investments',
  'Real-time spending insights',
  'Smart budget recommendations',
  'Smart savings goals',
  'Automatic expense categorization'

]
const SignUpPage = ({ isDark, toggleTheme }) => {
  return (
    <>
      {/* Header */}
      <Header isDark={isDark} toggleTheme={toggleTheme} />
      <div className={`min-h-screen pt-32 pb-20 px-6 relative   overflow-hidden 
      ${isDark
          ? 'bg-gradient-to-br from-slate-950 via-gray-900 to-gray-900/90'
          : 'bg-gradient-to-br from-gray-50 via-white to-emerald-50'
        }`}>
        {/* design */}
        <div className='absolute inset-0 overflow-hidden'>
          <motion.div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1]
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

        <div className='max-w-7xl mx-auto z-10 relative '>
          <div className='grid lg:grid-cols-2 gap-x-4 items-center'>
            {/* left side-branding */}
            <motion.div className='space-y-8'
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <motion.div className={`inline-flex items-center px-6 py-3  rounded-full border backdrop-blur-xl bg-amber-100 mb-6
                  ${isDark ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-600'}`
                }
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Brain className='w-4 h-4 mr-2' />
                  <span className='text-sm font-semibold'>Join FinancialAI Today</span>
                </motion.div>
                <motion.h1 className={`text-5xl lg:text-6xl font-bold mb-6 leading-regular
              ${isDark ? 'text-white' : 'text-gray-900'}
              `}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  Start Your <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">Smart Investment</span> Journey
                </motion.h1>
                <motion.p className={`text-md leading-relaxed mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Join thousunds of investors who have already started their journey with us. We offer a wide range of investment opportunities and tools to help you make informed decisions.
                </motion.p>
              </div>
              {/* benefits */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <ul className='space-y-4'
                >
                  {benefits.map((benefit, index) => (
                    <motion.li className='flex item-center space-x-3'
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
                    >
                      <div className='w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center '>
                        <FiCheckCircle className='w-4 h-4' />
                      </div>
                      <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{benefit}

                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
            {/* right side-form */}
            <motion.div className='relative'
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.div className={` p-8 lg:p-12 rounded-3xl backdrop-blur-xl border  shadow-2xl ${isDark ? 'bg-gray-900/80 border-gray-700' : 'bg-white/80 border-gray-200'}`}>
                <div className='text-center mb-8'>
                  <h2 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Create Account</h2>
                  <span className={`${isDark ? 'text-gray-400' : 'text-gray-900'}`}>Start your financial journey today!</span>
                </div>

                <form action="" className="space-y-6">
                  {/* Name Fields */}
                  <div className='flex justify-between gap-4'>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.45 }}
                    >
                      <label className={`block mb-2 text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>First Name</label>
                      <div className='relative'>
                        <LuUser className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                        <input type="text" name="firstname" id="" placeholder='John'
                          className={`w-full pl-12 pr-4 py-4 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${isDark
                            ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                            }`}
                          required />
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.45 }}
                    >
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Last Name</label>
                      <input type="text" name="lastname" id="" placeholder='Doe'
                        className={`w-full pl-12 pr-4 py-4 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${isDark
                          ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                          }`}
                        required />
                    </motion.div>
                  </div>
                  {/* Email Field */}
                  <div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Email Address</label>
                      <div className='relative'>
                        <LuMail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                        <input type="email" name="email" id="" placeholder='johndoe@example.com'
                          className={`w-full pl-12 pr-4 py-4 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${isDark
                            ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                            }`}
                          required />
                      </div>
                    </motion.div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Password
                      </label>
                      <div className="relative">
                        <LuLock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                        <input type="password" name="password" id="" placeholder='Password'
                          className={`w-full pl-12 pr-4 py-4 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${isDark
                            ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                            }`}
                          required />
                        <button className={`absolute right-3 top-1/2 transform -translate-1/2 ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}>
                          <LuEye className='w-5 h-5' /> <LuEyeOff className='w-5 h-5' />
                        </button>
                      </div>
                    </motion.div>
                    {/* Confirm Password Field */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Confirm Password</label>
                      <div className='relative'>
                        <LuLock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                        <input type="password" name="confirmpassword" id="" placeholder='confirm password'
                          className={`w-full pl-12 pr-12 py-4 rounded-xl border transition-all duration-300 focus:ring-2 ${isDark ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                          required />
                        <button className={`absolute right-3 top-1/2 transform -translate-1/2 ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}>
                          <LuEye /> <LuEyeOff />
                        </button>
                      </div>
                    </motion.div>
                  </div>

                  {/* Terms For Agreement */}
                  <motion.div
                    className='flex items-center space-x-3 '
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.65 }}
                  >
                    <input type="checkbox" name="checkbox" id=""
                      className="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 mt-1"
                      required />
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      I agree to the{' '}
                      <button className="text-emerald-500 hover:text-emerald-400 transition-colors">Terms of Service</button>
                      {' '}and{' '}
                      <button className="text-emerald-500 hover:text-emerald-400 transition-colors">Privacy Policy

                      </button>
                    </span>
                  </motion.div>

                  {/* SignUp Button */}
                  <motion.button
                    type='submit'
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700
                  text-white rounded-xl py-4 font-semibold cursor-pointer text-lg hover:shadow-emerald-500/25 flex items-center justify-center"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    Create Account
                  </motion.button>

                  {/* Sign In link */}
                  <motion.div
                    className={`text-center ${isDark ? 'text-gray-300' : 'text-gray-600'} `}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <p>
                      Already have an account?{' '}
                      <Link to={'/SignInPage'}
                        className='text-emerald-500 hover:text-emerald-400 font-semibold transition-colors'
                      >
                        Sign in here
                      </Link>
                    </p>
                  </motion.div>
                </form>
              </motion.div>
            </motion.div>
          </div>
        </div >
      </div >
    </>

  )
}

export default SignUpPage