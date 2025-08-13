import React from 'react'
import useTheme from '../hooks/useTheme';
import { LuBrain, LuMail, LuLock, LuEye, LuEyeOff, LuShield, LuZap } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/header';

const features = [
  { icon: LuShield, title: 'Secure Login', description: "Bank-level encryption" },
  { icon: LuZap, title: 'Instant Access', description: "Real-time dashboard" }
]

const SignInPage = ({ isDark, toggleTheme }) => {

  return (
    <>
      {/* Header */}
      <Header isDark={isDark} toggleTheme={toggleTheme} />
      <div className={`min-h-screen pt-32 pb-20 px-6 relative overflow-hidden ${isDark
        ? 'bg-gradient-to-br from-slate-950 via-gray-900 to-gray-900/90'
        : 'bg-gradient-to-br from-slate-50 via-white to-emerald-50'
        }`}>
        {/* Animataion Background Elements  */}
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
        {/* design  */}
        <div className=' max-w-7xl relative '>
          <div className='grid lg:grid-cols-2 gap-16 items-center'>
            {/* left side -Branding */}
            <motion.div className=' space-y-8'
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div className={` inline-flex rouunded-full items-center px-6 py-4 rounded-full border backdrop-blur-sm mb-6 ${isDark
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-emerald-50 border-emerald-200 text-emerald-600'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <LuBrain className='w-5 h-5 mr-2' />
                <span className='text-sm font-semibold'>Welcome Back to FinanceAI</span>
              </motion.div>
              <motion.h1 className={`font-bold text-5xl lg:text-6xl  mb-6 ${isDark ? 'text-white' : 'text-black'}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Continue Your {' '}
                <span className='bg-gradient-to-r from-emerald-400 to-teal-500 text-transparent bg-clip-text'>Financial Journey</span>
              </motion.h1>
              <motion.p className={`text-xl leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Access your personalized financial dashboard and continue building your finance with AI-powered insights.
              </motion.p>
              {/* Feture List */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    className={`p-4 rounded-2xl border backdrop-blur-sm ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white/50 border-gray-200'
                      }`}
                    whileHover={{ y: -5, scale: 1.02 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  >
                    <feature.icon className="h-8 w-8 text-emerald-500 mb-3" />
                    <h3 className={`font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {feature.title}
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            {/* right side -Form */}
            <motion.div
              className='relative'
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.div className={`p-8 lg:p-12 rounded-3xl backdrop-blur-xl border shadow-2xl ${isDark
                ? 'bg-gray-900/80 border-gray-700'
                : 'bg-white/80 border-gray-200'
                }`}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}

              >
                <div className='mb-8 text-center'>
                  <h2 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>Sign In</h2>
                  <span className={`text-lg xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Access your financial dashboard</span>
                </div>
                <form action="" className='space-y-5'>
                  {/* Email field */}
                  <motion.div className='text-left'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <label className={`block  text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Email Address
                    </label>
                    <div className='relative'>
                      <LuMail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                      <input type="email" name="email" id=""
                        className={`w-full pl-12 pr-4 py-4 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${isDark
                          ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                          }`}
                        placeholder='Enter your email'
                        required
                      />
                    </div>
                  </motion.div>
                  {/* Password Field */}
                  <div className='text-left'>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.55 }}
                    >
                      <label className={`block text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Password</label>
                      <div className='relative'>
                        <LuLock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                        <input
                          type="password"
                          name="password" id=""
                          className={`w-full pl-12 pr-12 py-4 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${isDark
                            ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                            }`}
                          placeholder='Enter your password'
                          required
                        />
                        <button className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}>
                          {`${isDark ? <LuEye className='w-5 h-5' /> : <LuEyeOff className='w-5 h-5' />}}`}</button>
                      </div>
                    </motion.div>
                  </div>
                  {/* Remember me & Forgot Password */}
                  <div className='flex justify-between items-center'>
                    <label className='flex items-center'>
                      <input type="checkbox" name="checkbox" id=""
                        className="w-4 h-5 rounded-md border text-emerald-600 bg-gray-100 border-gray-300 "
                      />
                      <span className={`ml-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Remember me</span>
                    </label>
                    <button
                      type="button"
                      className="text-sm text-emerald-500 hover:text-emerald-400 transition-colors"
                    >Forgot Password?</button>
                  </div>
                  {/* SignIn */}
                  <button type="submit" className="text-white flex justify-center items-center w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 font-semibold py-4 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 ">Sign In Now</button>
                  {/* Sign Up link */}
                  <div className=''>
                    <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Don't have an account?</span>
                    <Link
                      to="/signup"
                      className="font-semibold text-emerald-500 hover:text-emerald-400 transition-colors"
                    >
                      Sign up here
                    </Link>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </>

  )
}

export default SignInPage;
