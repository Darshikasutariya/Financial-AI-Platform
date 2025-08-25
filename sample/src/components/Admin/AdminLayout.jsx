import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Users, PieChart, FileText, BarChart3, Menu, X, Brain, Bell, Sun, Moon } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: BarChart3 },
  { name: 'User Management', href: '/admin/users', icon: Users },
  { name: 'Financial Data', href: '/admin/financial', icon: PieChart },
  { name: 'Content Management', href: '/admin/content', icon: FileText },
];

const AdminLayout = ({ isDark, toggleTheme }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Debug logging
  useEffect(() => {
    console.log('AdminLayout - isDark:', isDark);
  }, [isDark]);

  const isActive = (href) => {
    if (href === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(href);
  };

  const handleThemeToggle = () => {
    console.log('Theme toggle clicked, current isDark:', isDark);
    if (toggleTheme) {
      toggleTheme();
    }
  };

  // Base container styles
  const containerStyles = `min-h-screen flex transition-colors duration-300`;
  const containerClasses = isDark ? 'bg-gray-900' : 'bg-gray-100';

  // Sidebar styles - now theme-aware
  const sidebarBaseStyles = `fixed z-50 inset-y-0 left-0 w-64 shadow-xl flex flex-col transition-all duration-300`;
  const sidebarPositionStyles = sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0';
  const sidebarThemeStyles = isDark 
    ? 'bg-gray-800 border-gray-700' 
    : 'bg-white border-gray-200';

  // Header styles
  const headerBaseStyles = `sticky top-0 z-30 h-20 shadow border-b flex items-center px-7 transition-colors duration-300 backdrop-blur-sm`;
  const headerThemeStyles = isDark 
    ? 'bg-gray-800 border-gray-700' 
    : 'bg-white border-gray-200';

  // Main content styles
  const mainBaseStyles = `flex-1 p-7 transition-colors duration-300`;
  const mainThemeStyles = isDark ? 'bg-gray-900' : 'bg-gray-50';

  // Logo section border styles
  const logoSectionBorderStyles = isDark 
    ? 'border-gray-700' 
    : 'border-gray-200';

  // Logo text styles
  const logoTextStyles = isDark 
    ? 'text-white' 
    : 'text-gray-800';

  // User profile section styles
  const userSectionBorderStyles = isDark 
    ? 'border-gray-700' 
    : 'border-gray-200';

  const userNameStyles = isDark 
    ? 'text-white' 
    : 'text-gray-800';

  const userEmailStyles = isDark 
    ? 'text-gray-400' 
    : 'text-gray-500';

  // Mobile close button styles
  const mobileCloseButtonStyles = isDark
    ? 'text-gray-400 hover:text-white'
    : 'text-gray-500 hover:text-gray-700';

  // Navigation link styles
  const getNavLinkStyles = (active) => {
    const baseStyles = `flex items-center gap-3 px-5 py-3 my-1 text-sm font-medium rounded-xl transition-all duration-200`;
    
    if (active) {
      return isDark 
        ? `${baseStyles} bg-emerald-900 bg-opacity-60 text-emerald-400 border border-emerald-500 border-opacity-30`
        : `${baseStyles} bg-emerald-100 text-emerald-700 border border-emerald-200`;
    } else {
      return isDark
        ? `${baseStyles} text-gray-300 hover:bg-gray-700 hover:text-white border border-transparent`
        : `${baseStyles} text-gray-600 hover:bg-gray-100 hover:text-gray-800 border border-transparent`;
    }
  };

  // Button styles
  const getButtonStyles = (variant = 'default') => {
    const baseStyles = `p-2 rounded-lg transition-colors duration-200`;
    
    switch (variant) {
      case 'theme':
        return isDark
          ? `${baseStyles} text-yellow-400 hover:text-yellow-300 hover:bg-gray-700`
          : `${baseStyles} text-slate-600 hover:text-slate-800 hover:bg-gray-100`;
      case 'mobile':
        return isDark
          ? `${baseStyles} text-gray-400 hover:text-gray-300 hover:bg-gray-700`
          : `${baseStyles} text-gray-400 hover:text-gray-500 hover:bg-gray-100`;
      default:
        return isDark
          ? `${baseStyles} text-gray-400 hover:text-gray-300 hover:bg-gray-700`
          : `${baseStyles} text-gray-400 hover:text-gray-500 hover:bg-gray-100`;
    }
  };

  return (
    <div className={`${containerStyles} ${containerClasses}`}>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-30 lg:hidden" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <motion.aside
        className={`${sidebarBaseStyles} ${sidebarPositionStyles} ${sidebarThemeStyles} lg:static lg:translate-x-0`}
        initial={{ x: -256 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Logo Section */}
        <div className={`flex items-center justify-between h-20 px-7 border-b ${logoSectionBorderStyles}`}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${logoTextStyles}`}>
              Admin Panel
            </span>
          </div>
          <button
            className={`lg:hidden p-1 transition-colors duration-200 ${mobileCloseButtonStyles}`}
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 py-6 px-3 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={getNavLinkStyles(active)}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile Section */}
        <div className={`px-5 py-4 border-t ${userSectionBorderStyles} flex items-center gap-3`}>
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-base">AD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-semibold truncate transition-colors duration-300 ${userNameStyles}`}>
              Admin User
            </p>
            <p className={`text-xs truncate transition-colors duration-300 ${userEmailStyles}`}>
              admin@financeai.com
            </p>
          </div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation Bar */}
        <header className={`${headerBaseStyles} ${headerThemeStyles}`}>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className={`lg:hidden mr-4 ${getButtonStyles('mobile')}`}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Spacer */}
          <div className="flex-1"></div>
          
          {/* Theme Toggle Button */}
          <button
            onClick={handleThemeToggle}
            className={`mr-3 ${getButtonStyles('theme')}`}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          {/* Notification Button */}
          <button className={getButtonStyles('default')}>
            <Bell className="w-5 h-5" />
          </button>
        </header>

        {/* Page Content */}
        <main className={`${mainBaseStyles} ${mainThemeStyles}`}>
          <Outlet context={{ isDark, toggleTheme }} />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
