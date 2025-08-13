import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion";
import { LuBrain, LuMoon } from "react-icons/lu";
import { HiOutlineSun } from "react-icons/hi2";
import { Link } from 'react-router-dom';

const navItems = [
  { name: "Home", id: "home", path: "" },
  { name: "Features", id: "features", path: "features" },
  { name: "How It Works", id: "how-it-works", path: "how-it-work" },
  { name: "Pricing", id: "pricing", path: "pricing" },
]


const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

const Header = ({ isDark, toggleTheme }) => {

  const textColorClass = isDark ? 'text-white' : 'text-gray-600';

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed w-full top-0 z-50  px-6 py-4 transition-all duration-500 
        ${isDark
            ? 'bg-gray-900/90 backdrop-blur-xl shadow-2xl border-b border-emerald-500/20'
            : 'bg-white/90 backdrop-blur-xl shadow-2xl border-b border-emerald-500/20'
          }`}
      >

        <div className='max-w-7xl mx-auto flex items-center justify-between'>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className='flex items-center space-x-3 cursor-pointer'
          >
            <Link to={"/"} className='flex items-center space-x-2'>
              <div className='w-10 h-10 flex items-center justify-center bg-gradient-to-r from-emerald-400 to-teal-500 shadow-lg rounded-xl'>
                <LuBrain className="w-6 h-6 text-white" />
              </div>
              <span className='text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent'>
                FinanceAI
              </span>
            </Link>
          </motion.div>

          <div className='md:flex items-center justify-center space-x-8 hidden'>
            <ul className="flex flex-row space-x-8 font-medium transition-colors">
              {navItems.map((item) => {
                // For Home, use React Router, for others, use scroll
                if (item.path === "") {
                  return (
                    <Link to={`/${item.path}`} key={item.id}>
                      <li className={`hover:text-emerald-400 cursor-pointer ${textColorClass}`}>
                        {item.name}
                      </li>
                    </Link>
                  );
                }
                return (
                  <li
                    key={item.id}
                    className={`hover:text-emerald-400 cursor-pointer ${textColorClass}`}
                    onClick={e => {
                      e.preventDefault();
                      scrollToSection(item.id);
                    }}
                  >
                    {item.name}
                  </li>
                );
              })}
            </ul>

            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, rotate: -180 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.6 }}
              className={`cursor-pointer p-3 rounded-xl transition-colors ${isDark ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }
            `}>
              {isDark ? <HiOutlineSun className="w-5 h-5" /> : <LuMoon className="w-5 h-5" />}
            </motion.button>

            <motion.div
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Link
                to="/SignInPage"
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${isDark
                  ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
              >
                Sign In
              </Link>
              <Link
                to="/SignUpPage"
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
              >
                Start Free Trial
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.nav>
    </>
  )
}

export default Header


