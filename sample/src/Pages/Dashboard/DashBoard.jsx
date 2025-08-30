import React, { useState, useEffect, useRef } from 'react';
import {
    Plus,
    Settings,
    Bell,
    Search,
    TrendingUp,
    TrendingDown,
    Eye,
    EyeOff,
    ArrowUpRight,
    ArrowDownLeft,
    Wallet,
    CreditCard,
    PiggyBank,
    Building,
    Coffee,
    Car,
    Smartphone,
    ShoppingBag,
    User,
    Sun,
    Moon,
    LogOut,
    X
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = ({ isDark, toggleTheme }) => {
    const [balanceVisible, setBalanceVisible] = useState(true);
    const [selectedPeriod, setSelectedPeriod] = useState('30d');
    const [showSettingsMenu, setShowSettingsMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const navigate = useNavigate();
    const settingsMenuRef = useRef(null);

    // Debug logging
    useEffect(() => {
        console.log('Dashboard - isDark:', isDark);
    }, [isDark]);

    // Close settings menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (settingsMenuRef.current && !settingsMenuRef.current.contains(event.target)) {
                setShowSettingsMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Static data
    const spendingData = [
        { day: 'Mon', amount: 120 },
        { day: 'Tue', amount: 85 },
        { day: 'Wed', amount: 200 },
        { day: 'Thu', amount: 150 },
        { day: 'Fri', amount: 300 },
        { day: 'Sat', amount: 180 },
        { day: 'Sun', amount: 90 }
    ];

    const accounts = [
        {
            name: 'Savings',
            balance: 45890.20,
            change: 1.2,
            icon: PiggyBank,
            color: 'green',
            route: 'savings'
        },
        {
            name: 'Credit Card',
            balance: -2150.75,
            change: -5.2,
            icon: CreditCard,
            color: 'red',
            route: 'credit-card'
        },
        {
            name: 'Investment',
            balance: 18750.00,
            change: 8.7,
            icon: TrendingUp,
            color: 'purple',
            route: 'investment'
        },
        {
            name: 'Personal',
            balance: 3250.50,
            change: 0.8,
            icon: User,
            color: 'blue',
            route: 'personal'
        }
    ];

    const recentTransactions = [
        { id: 1, merchant: 'Starbucks Coffee', category: 'Food', amount: -8.50, time: '2h ago', icon: Coffee },
        { id: 2, merchant: 'Shell Gas Station', category: 'Transport', amount: -45.20, time: '5h ago', icon: Car },
        { id: 3, merchant: 'Salary Deposit', category: 'Income', amount: 3200.00, time: '1d ago', icon: Building },
        { id: 4, merchant: 'Netflix', category: 'Entertainment', amount: -15.99, time: '2d ago', icon: Smartphone },
        { id: 5, merchant: 'Amazon Purchase', category: 'Shopping', amount: -67.30, time: '3d ago', icon: ShoppingBag }
    ];

    const categories = [
        { name: 'Food & Dining', spent: 485, budget: 600, color: 'orange' },
        { name: 'Transportation', spent: 245, budget: 400, color: 'blue' },
        { name: 'Shopping', spent: 320, budget: 500, color: 'purple' },
        { name: 'Entertainment', spent: 180, budget: 300, color: 'green' }
    ];

    // Notifications data
    const notifications = [
        {
            id: 1,
            title: 'Payment Received',
            message: 'You received $3,200.00 from Salary Deposit',
            time: '2 hours ago',
            type: 'success',
            icon: Building
        },
        {
            id: 2,
            title: 'Low Balance Warning',
            message: 'Your Credit Card balance is running low',
            time: '5 hours ago',
            type: 'warning',
            icon: CreditCard
        },
        {
            id: 3,
            title: 'Investment Update',
            message: 'Your portfolio gained 8.7% this month',
            time: '1 day ago',
            type: 'info',
            icon: TrendingUp
        },
        {
            id: 4,
            title: 'Subscription Renewal',
            message: 'Netflix subscription renewed for $15.99',
            time: '2 days ago',
            type: 'info',
            icon: Smartphone
        }
    ];

    const handleAccountClick = (accountRoute) => {
        navigate(`/accounts/${accountRoute}`);
    };

    const handleThemeToggle = () => {
        console.log('Theme toggle clicked from Dashboard, current isDark:', isDark);
        if (toggleTheme) {
            toggleTheme();
        }
    };

    const handleProfileClick = () => {
        setShowSettingsMenu(false);
        navigate('/profile');
    };

    const handleLogoutClick = () => {
        setShowSettingsMenu(false);
        // Add logout functionality here
        console.log('Logout clicked');
        // For now, just show an alert
        alert('Logout functionality would go here');
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(Math.abs(amount));
    };

    const getColorClasses = (color) => {
        const colors = {
            blue: 'bg-blue-500 text-white',
            green: 'bg-emerald-500 text-white',
            red: 'bg-red-500 text-white',
            purple: 'bg-purple-500 text-white',
            orange: 'bg-orange-500 text-white'
        };
        return colors[color] || colors.blue;
    };

    // Theme-based styling functions
    const getBackgroundStyle = () => isDark ? 'bg-gray-950' : 'bg-gray-50';

    const getHeaderStyle = () => isDark
        ? 'bg-gray-950/80 border-gray-800'
        : 'bg-white/80 border-gray-200';

    const getCardStyle = () => isDark
        ? 'bg-gray-900 border-gray-800'
        : 'bg-white border-gray-200 shadow-lg';

    const getTextPrimaryStyle = () => isDark ? 'text-white' : 'text-gray-900';

    const getTextSecondaryStyle = () => isDark ? 'text-gray-400' : 'text-gray-600';

    const getTextTertiaryStyle = () => isDark ? 'text-gray-500' : 'text-gray-400';

    const getSearchStyle = () => isDark ? 'bg-gray-800' : 'bg-gray-100';

    const getHoverStyle = () => isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100';

    const getButtonStyle = (variant = 'secondary') => {
        if (variant === 'secondary') {
            return isDark
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200';
        }
        return 'bg-blue-500 text-white hover:bg-blue-600';
    };

    const getThemeButtonStyle = () => isDark
        ? 'text-yellow-400 hover:text-yellow-300 hover:bg-gray-800'
        : 'text-slate-600 hover:text-slate-800 hover:bg-gray-100';

    const getProgressBarStyle = () => isDark ? 'bg-gray-800' : 'bg-gray-200';

    const getTransactionIconStyle = () => isDark ? 'bg-gray-800' : 'bg-gray-100';

    const getAccountCardStyle = () => isDark
        ? 'bg-gray-900 border-gray-800 hover:border-gray-700'
        : 'bg-white border-gray-200 hover:border-gray-300 shadow-lg';

    const getAddAccountStyle = () => isDark
        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700 hover:border-blue-500'
        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-blue-300 shadow-lg';

    const getMenuStyle = () => isDark
        ? 'bg-gray-800 border-gray-700'
        : 'bg-white border-gray-200 shadow-xl';

    const getModalStyle = () => isDark
        ? 'bg-gray-800 border-gray-700'
        : 'bg-white border-gray-200';

    const getNotificationTypeColor = (type) => {
        switch (type) {
            case 'success':
                return 'text-emerald-500';
            case 'warning':
                return 'text-yellow-500';
            case 'info':
                return 'text-blue-500';
            case 'error':
                return 'text-red-500';
            default:
                return isDark ? 'text-gray-400' : 'text-gray-600';
        }
    };

    // Settings Menu Component
    const SettingsMenu = () => (
        <div
            ref={settingsMenuRef}
            className={`absolute right-0 top-12 z-50 w-48 rounded-xl border transition-all duration-200 ${getMenuStyle()}`}
        >
            <div className="py-2">
                <button
                    onClick={handleProfileClick}
                    className={`flex items-center w-full px-4 py-3 text-sm transition-colors duration-200 ${isDark
                            ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                >
                    <User className="w-4 h-4 mr-3" />
                    View Profile
                </button>
                <button
                    onClick={handleLogoutClick}
                    className={`flex items-center w-full px-4 py-3 text-sm transition-colors duration-200 ${isDark
                            ? 'text-gray-300 hover:bg-gray-700 hover:text-red-400'
                            : 'text-gray-700 hover:bg-gray-100 hover:text-red-600'
                        }`}
                >
                    <LogOut className="w-4 h-4 mr-3" />
                    Logout
                </button>
            </div>
        </div>
    );

    // Notifications Modal Component
    const NotificationsModal = () => (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className={`relative w-full max-w-md mx-4 rounded-2xl border transition-colors duration-300 ${getModalStyle()}`}>
                {/* Modal Header */}
                <div className={`flex items-center justify-between p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'
                    }`}>
                    <h3 className={`text-lg font-semibold ${getTextPrimaryStyle()}`}>
                        Notifications
                    </h3>
                    <button
                        onClick={() => setShowNotifications(false)}
                        className={`p-1 rounded-lg transition-colors duration-200 ${getHoverStyle()}`}
                    >
                        <X className={`w-5 h-5 ${getTextSecondaryStyle()}`} />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="max-h-96 overflow-y-auto p-4">
                    <div className="space-y-4">
                        {notifications.map((notification) => {
                            const IconComponent = notification.icon;
                            return (
                                <div
                                    key={notification.id}
                                    className={`p-4 rounded-xl border transition-colors duration-200 ${isDark
                                            ? 'bg-gray-700 border-gray-600 hover:bg-gray-650'
                                            : 'bg-gray-50 border-gray-100 hover:bg-gray-100'
                                        }`}
                                >
                                    <div className="flex items-start space-x-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? 'bg-gray-600' : 'bg-white'
                                            }`}>
                                            <IconComponent className={`w-5 h-5 ${getNotificationTypeColor(notification.type)}`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className={`text-sm font-semibold ${getTextPrimaryStyle()}`}>
                                                {notification.title}
                                            </h4>
                                            <p className={`text-sm mt-1 ${getTextSecondaryStyle()}`}>
                                                {notification.message}
                                            </p>
                                            <p className={`text-xs mt-2 ${getTextTertiaryStyle()}`}>
                                                {notification.time}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Modal Footer */}
                <div className={`p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'
                    }`}>
                    <button
                        onClick={() => setShowNotifications(false)}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-xl font-medium transition-colors duration-200"
                    >
                        Mark All as Read
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className={`min-h-screen transition-colors duration-300 ${getBackgroundStyle()}`}>
            {/* Header */}
            <header className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-300 ${getHeaderStyle()}`}>
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${isDark ? 'bg-blue-600' : 'bg-blue-500'}`}>
                                <Wallet className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className={`text-xl font-bold transition-colors duration-300 ${getTextPrimaryStyle()}`}>
                                    FinanceAI
                                </h1>
                                <p className={`text-sm transition-colors duration-300 ${getTextSecondaryStyle()}`}>
                                    Good morning, Alex
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className={`relative flex items-center rounded-2xl px-4 py-2 transition-colors duration-300 ${getSearchStyle()}`}>
                                <Search className={`w-5 h-5 mr-3 transition-colors duration-300 ${getTextSecondaryStyle()}`} />
                                <input
                                    type="text"
                                    placeholder="Search transactions..."
                                    className={`bg-transparent outline-none placeholder-gray-500 transition-colors duration-300 ${getTextPrimaryStyle()}`}
                                />
                            </div>

                            {/* Theme Toggle Button */}
                            <button
                                onClick={handleThemeToggle}
                                className={`p-2 rounded-xl transition-all duration-200 ${getThemeButtonStyle()}`}
                                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                            >
                                {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                            </button>

                            {/* Notification Button */}
                            <button
                                onClick={() => setShowNotifications(true)}
                                className={`p-2 rounded-xl transition-colors duration-200 ${getHoverStyle()}`}
                            >
                                <Bell className={`w-6 h-6 transition-colors duration-300 ${getTextSecondaryStyle()}`} />
                            </button>

                            {/* Settings Button with Menu */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                                    className={`p-2 rounded-xl transition-colors duration-200 ${getHoverStyle()}`}
                                >
                                    <Settings className={`w-6 h-6 transition-colors duration-300 ${getTextSecondaryStyle()}`} />
                                </button>
                                {showSettingsMenu && <SettingsMenu />}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Balance Overview */}
                <section className="mb-8">
                    <div className={`p-8 rounded-3xl border transition-colors duration-300 ${getCardStyle()}`}>
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className={`text-lg font-semibold mb-1 transition-colors duration-300 ${getTextSecondaryStyle()}`}>
                                    Total Balance
                                </h2>
                                <div className="flex items-center space-x-3">
                                    <span className={`text-4xl font-bold transition-colors duration-300 ${getTextPrimaryStyle()}`}>
                                        {balanceVisible ? '$65,240.95' : '••••••••'}
                                    </span>
                                    <button
                                        onClick={() => setBalanceVisible(!balanceVisible)}
                                        className={`p-2 rounded-xl transition-colors duration-200 ${getHoverStyle()}`}
                                    >
                                        {balanceVisible ? (
                                            <EyeOff className={`w-5 h-5 transition-colors duration-300 ${getTextSecondaryStyle()}`} />
                                        ) : (
                                            <Eye className={`w-5 h-5 transition-colors duration-300 ${getTextSecondaryStyle()}`} />
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <TrendingUp className="w-5 h-5 text-emerald-500" />
                                <span className="text-emerald-500 font-semibold">+2.4%</span>
                                <span className={`text-sm transition-colors duration-300 ${getTextSecondaryStyle()}`}>
                                    vs last month
                                </span>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="flex flex-wrap gap-3">
                            <button className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-2xl font-medium hover:bg-blue-600 transition-colors duration-200">
                                <Plus className="w-4 h-4" />
                                <span>Add Money</span>
                            </button>
                            <button className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-medium transition-colors duration-200 ${getButtonStyle('secondary')}`}>
                                <ArrowUpRight className="w-4 h-4" />
                                <span>Transfer</span>
                            </button>
                            <button className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-medium transition-colors duration-200 ${getButtonStyle('secondary')}`}>
                                <ArrowDownLeft className="w-4 h-4" />
                                <span>Pay Bills</span>
                            </button>
                        </div>
                    </div>
                </section>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Accounts Grid */}
                        <section>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className={`text-xl font-bold transition-colors duration-300 ${getTextPrimaryStyle()}`}>
                                    Accounts
                                </h3>
                                <Link
                                    to="/Addaccountdetails"
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:scale-105 ${getAddAccountStyle()}`}
                                >
                                    <Plus className="w-4 h-4" />
                                    <span>Add New Account</span>
                                </Link>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {accounts.map((account, index) => {
                                    const IconComponent = account.icon;
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => handleAccountClick(account.route)}
                                            className={`p-6 rounded-2xl border transition-all duration-200 hover:scale-105 text-left w-full ${getAccountCardStyle()}`}
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${getColorClasses(account.color)}`}>
                                                    <IconComponent className="w-6 h-6" />
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    {account.change > 0 ? (
                                                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                                                    ) : (
                                                        <TrendingDown className="w-4 h-4 text-red-500" />
                                                    )}
                                                    <span className={`text-sm font-medium ${account.change > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                                        {account.change > 0 ? '+' : ''}{account.change}%
                                                    </span>
                                                </div>
                                            </div>
                                            <h4 className={`font-semibold mb-1 transition-colors duration-300 ${getTextSecondaryStyle()}`}>
                                                {account.name}
                                            </h4>
                                            <p className={`text-2xl font-bold ${account.balance < 0 ? 'text-red-500' : getTextPrimaryStyle()} transition-colors duration-300`}>
                                                {account.balance < 0 ? '-' : ''}{formatCurrency(account.balance)}
                                            </p>
                                        </button>
                                    );
                                })}
                            </div>
                        </section>

                        {/* Spending Chart */}
                        <section>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className={`text-xl font-bold transition-colors duration-300 ${getTextPrimaryStyle()}`}>
                                    Spending Overview
                                </h3>
                                <div className="flex space-x-2">
                                    {['7d', '30d', '90d'].map((period) => (
                                        <button
                                            key={period}
                                            onClick={() => setSelectedPeriod(period)}
                                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200 ${selectedPeriod === period
                                                ? 'bg-blue-500 text-white'
                                                : `${getTextSecondaryStyle()} ${getHoverStyle()}`
                                                }`}
                                        >
                                            {period}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className={`p-6 rounded-2xl border transition-colors duration-300 ${getCardStyle()}`}>
                                <ResponsiveContainer width="100%" height={300}>
                                    <AreaChart data={spendingData}>
                                        <defs>
                                            <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis
                                            dataKey="day"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: isDark ? '#9ca3af' : '#6b7280' }}
                                        />
                                        <YAxis hide />
                                        <Area
                                            type="monotone"
                                            dataKey="amount"
                                            stroke="#3b82f6"
                                            strokeWidth={3}
                                            fill="url(#colorSpending)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </section>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        {/* Recent Transactions */}
                        <section>
                            <h3 className={`text-xl font-bold mb-6 transition-colors duration-300 ${getTextPrimaryStyle()}`}>
                                Recent Activity
                            </h3>
                            <div className={`p-6 rounded-2xl border transition-colors duration-300 ${getCardStyle()}`}>
                                <div className="space-y-4">
                                    {recentTransactions.map((transaction) => {
                                        const IconComponent = transaction.icon;
                                        return (
                                            <div key={transaction.id} className="flex items-center space-x-4">
                                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-300 ${getTransactionIconStyle()}`}>
                                                    <IconComponent className={`w-6 h-6 transition-colors duration-300 ${getTextSecondaryStyle()}`} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className={`font-semibold truncate transition-colors duration-300 ${getTextPrimaryStyle()}`}>
                                                        {transaction.merchant}
                                                    </p>
                                                    <p className={`text-sm transition-colors duration-300 ${getTextSecondaryStyle()}`}>
                                                        {transaction.category} • {transaction.time}
                                                    </p>
                                                </div>
                                                <span className={`font-bold ${transaction.amount < 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                                                    {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </section>

                        {/* Budget Categories */}
                        <section>
                            <h3 className={`text-xl font-bold mb-6 transition-colors duration-300 ${getTextPrimaryStyle()}`}>
                                Budget Overview
                            </h3>
                            <div className={`p-6 rounded-2xl border transition-colors duration-300 ${getCardStyle()}`}>
                                <div className="space-y-6">
                                    {categories.map((category, index) => {
                                        const percentage = (category.spent / category.budget) * 100;
                                        return (
                                            <div key={index}>
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className={`font-medium transition-colors duration-300 ${getTextPrimaryStyle()}`}>
                                                        {category.name}
                                                    </span>
                                                    <span className={`text-sm transition-colors duration-300 ${getTextSecondaryStyle()}`}>
                                                        ${category.spent} / ${category.budget}
                                                    </span>
                                                </div>
                                                <div className={`w-full h-3 rounded-full transition-colors duration-300 ${getProgressBarStyle()}`}>
                                                    <div
                                                        className={`h-3 rounded-full transition-all duration-500 ${getColorClasses(category.color).split(' ')[0]}`}
                                                        style={{ width: `${Math.min(percentage, 100)}%` }}
                                                    />
                                                </div>
                                                <div className="flex justify-between items-center mt-1">
                                                    <span className={`text-xs ${percentage > 90 ? 'text-red-500' : getTextTertiaryStyle()} transition-colors duration-300`}>
                                                        {percentage.toFixed(0)}% used
                                                    </span>
                                                    <span className={`text-xs transition-colors duration-300 ${getTextTertiaryStyle()}`}>
                                                        ${category.budget - category.spent} left
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            {/* Modals */}
            {showNotifications && <NotificationsModal />}
        </div>
    );
};

export default Dashboard;
