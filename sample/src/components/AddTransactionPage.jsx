// AddTransactionPage.jsx
import React, { useState } from 'react';
import {
    ChevronDownIcon,
    CalendarIcon,
    CameraIcon,
    XMarkIcon,
    Bars3Icon,
    UserCircleIcon
} from '@heroicons/react/24/outline';

const AddTransactionPage = () => {
    const [formData, setFormData] = useState({
        type: 'Expense',
        amount: '',
        account: 'personal ($152,124.40)',
        category: '',
        date: 'December 15th, 2024',
        description: '',
        isRecurring: false
    });

    const [showDropdown, setShowDropdown] = useState({
        type: false,
        account: false,
        category: false
    });

    const transactionTypes = ['Expense', 'Income', 'Transfer'];
    const accounts = [
        'personal ($152,124.40)',
        'savings ($45,890.20)',
        'credit card (-$2,150.75)'
    ];
    const categories = [
        'Food & Dining',
        'Shopping',
        'Transportation',
        'Entertainment',
        'Bills & Utilities',
        'Healthcare',
        'Travel',
        'Education',
        'Salary',
        'Freelance',
        'Investment'
    ];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const toggleDropdown = (field) => {
        setShowDropdown(prev => ({
            ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}),
            [field]: !prev[field]
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <div className="text-2xl font-bold text-blue-600">welth</div>
                        </div>

                        {/* Navigation */}
                        <div className="flex items-center space-x-4">
                            <button className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900">
                                <Bars3Icon className="h-5 w-5 mr-2" />
                                Dashboard
                            </button>
                            <button className="flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
                                <span className="mr-2">+</span>
                                Add Transaction
                            </button>
                            <UserCircleIcon className="h-8 w-8 text-gray-400" />
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-2xl mx-auto px-4 py-8">
                <div className="bg-white rounded-xl shadow-lg p-8">
                    {/* Page Title */}
                    <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
                        Add Transaction
                    </h1>

                    {/* Scan Receipt Button */}
                    <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-xl mb-8 flex items-center justify-center hover:from-pink-600 hover:to-purple-700 transition-all">
                        <CameraIcon className="h-5 w-5 mr-2" />
                        Scan Receipt with AI
                    </button>

                    {/* Form */}
                    <form className="space-y-6">
                        {/* Type and Amount Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Type Dropdown */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Type
                                </label>
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => toggleDropdown('type')}
                                        className="w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center justify-between"
                                    >
                                        <span>{formData.type}</span>
                                        <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                                    </button>
                                    {showDropdown.type && (
                                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                                            {transactionTypes.map((type) => (
                                                <button
                                                    key={type}
                                                    type="button"
                                                    onClick={() => {
                                                        handleInputChange('type', type);
                                                        toggleDropdown('type');
                                                    }}
                                                    className="w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                                                >
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Amount Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Amount
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-3 text-gray-500">$</span>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={formData.amount}
                                        onChange={(e) => handleInputChange('amount', e.target.value)}
                                        placeholder="0.00"
                                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Account Dropdown */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Account
                            </label>
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => toggleDropdown('account')}
                                    className="w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center justify-between"
                                >
                                    <span>{formData.account}</span>
                                    <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                                </button>
                                {showDropdown.account && (
                                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                                        {accounts.map((account) => (
                                            <button
                                                key={account}
                                                type="button"
                                                onClick={() => {
                                                    handleInputChange('account', account);
                                                    toggleDropdown('account');
                                                }}
                                                className="w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                                            >
                                                {account}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Category Dropdown */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => toggleDropdown('category')}
                                    className="w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center justify-between"
                                >
                                    <span className={formData.category ? 'text-gray-900' : 'text-gray-500'}>
                                        {formData.category || 'Select category'}
                                    </span>
                                    <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                                </button>
                                {showDropdown.category && (
                                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                                        {categories.map((category) => (
                                            <button
                                                key={category}
                                                type="button"
                                                onClick={() => {
                                                    handleInputChange('category', category);
                                                    toggleDropdown('category');
                                                }}
                                                className="w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                                            >
                                                {category}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Date Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Date
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={formData.date}
                                    onChange={(e) => handleInputChange('date', e.target.value)}
                                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <CalendarIcon className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                            </div>
                        </div>

                        {/* Description Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                placeholder="Enter description"
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            />
                        </div>

                        {/* Recurring Transaction Toggle */}
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <h3 className="font-medium text-gray-900">Recurring Transaction</h3>
                                <p className="text-sm text-gray-500">Set up a recurring schedule for this transaction</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => handleInputChange('isRecurring', !formData.isRecurring)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${formData.isRecurring ? 'bg-blue-600' : 'bg-gray-200'
                                    }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.isRecurring ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                />
                            </button>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 pt-6">
                            <button
                                type="button"
                                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                            >
                                Create Transaction
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddTransactionPage;
