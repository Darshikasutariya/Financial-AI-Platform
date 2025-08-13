import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Plus,
    Edit3,
    Trash2,
    Download,
    Filter,
    Search,
    Calendar,
    DollarSign,
    TrendingUp,
    TrendingDown,
    PiggyBank,
    CreditCard,
    User,
    Building2,
    X,
    Save,
    AlertCircle,
    Camera,
    Upload,
    FileImage,
    Scan,
    Loader2,
    CheckCircle,
    AlertTriangle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area } from 'recharts';




// Static data for all account types
const accountsData = {
    savings: {
        name: 'Savings Account',
        number: '...8901',
        balance: 45890.20,
        type: 'Savings',
        totalIncome: 67378.46,
        totalExpenses: 21488.26,
        net: 45890.20,
        icon: PiggyBank,
        color: 'emerald',
        transactions: [
            {
                id: 1,
                date: '2024-01-15',
                description: 'Monthly Salary',
                category: 'Salary',
                amount: 5200.00,
                type: 'income',
                recurring: 'Monthly',
            },
            {
                id: 2,
                date: '2024-01-10',
                description: 'Emergency Fund Transfer',
                category: 'Transfer',
                amount: -1000.00,
                type: 'expense',
                recurring: 'One-time',
            },
            {
                id: 3,
                date: '2024-01-05',
                description: 'Interest Earned',
                category: 'Interest',
                amount: 125.50,
                type: 'income',
                recurring: 'Monthly',
            },
        ]
    },
    'credit-card': {
        name: 'Credit Card',
        number: '...2456',
        balance: -2150.75,
        type: 'Credit',
        totalIncome: 0,
        totalExpenses: 2150.75,
        net: -2150.75,
        icon: CreditCard,
        color: 'red',
        transactions: [
            {
                id: 4,
                date: '2024-01-14',
                description: 'Amazon Purchase',
                category: 'Shopping',
                amount: -150.99,
                type: 'expense',
                recurring: 'One-time',
            },
            {
                id: 5,
                date: '2024-01-12',
                description: 'Restaurant Bill',
                category: 'Food',
                amount: -85.50,
                type: 'expense',
                recurring: 'One-time',
            },
            {
                id: 6,
                date: '2024-01-08',
                description: 'Gas Station',
                category: 'Transport',
                amount: -45.25,
                type: 'expense',
                recurring: 'One-time',
            },
            // Add these to your existing transactions array in accountsData
            {
                id: 13,
                date: '2024-12-15',
                description: 'December Salary',
                category: 'Salary',
                amount: 5200.00,
                type: 'income',
                recurring: 'Monthly',
            },
            {
                id: 14,
                date: '2023-11-01',
                description: 'Investment Return',
                category: 'Interest',
                amount: 800.00,
                type: 'income',
                recurring: 'One-time',
            },
            {
                id: 15,
                date: '2023-06-15',
                description: 'Emergency Withdrawal',
                category: 'Transfer',
                amount: -2000.00,
                type: 'expense',
                recurring: 'One-time',
            },

        ]
    },
    investment: {
        name: 'Investment Portfolio',
        number: '...7890',
        balance: 18750.00,
        type: 'Investment',
        totalIncome: 22450.00,
        totalExpenses: 3700.00,
        net: 18750.00,
        icon: TrendingUp,
        color: 'purple',
        transactions: [
            {
                id: 7,
                date: '2024-01-15',
                description: 'Stock Dividend - AAPL',
                category: 'Dividend',
                amount: 250.00,
                type: 'income',
                recurring: 'Quarterly',
            },
            {
                id: 8,
                date: '2024-01-10',
                description: 'Investment Purchase - TSLA',
                category: 'Investment',
                amount: -1500.00,
                type: 'expense',
                recurring: 'One-time',
            },
            {
                id: 9,
                date: '2024-01-05',
                description: 'Portfolio Rebalance Fee',
                category: 'Fee',
                amount: -25.00,
                type: 'expense',
                recurring: 'Monthly',
            },
        ]
    },
    personal: {
        name: 'Personal Account',
        number: '...3456',
        balance: 3250.50,
        type: 'Checking',
        totalIncome: 8750.50,
        totalExpenses: 5500.00,
        net: 3250.50,
        icon: User,
        color: 'blue',
        transactions: [
            {
                id: 10,
                date: '2024-01-12',
                description: 'Freelance Payment',
                category: 'Freelance',
                amount: 800.00,
                type: 'income',
                recurring: 'One-time',
            },
            {
                id: 11,
                date: '2024-01-08',
                description: 'Grocery Shopping',
                category: 'Food',
                amount: -120.75,
                type: 'expense',
                recurring: 'Weekly',
            },
            {
                id: 12,
                date: '2024-01-03',
                description: 'Rent Payment',
                category: 'Housing',
                amount: -1200.00,
                type: 'expense',
                recurring: 'Monthly',
            },
        ]
    }
};

// Chart data for visualization
// Enhanced chart data function with time period filtering
const getChartData = (transactions, period = 'weekly') => {
    const now = new Date();
    let data = [];

    switch (period) {
        case 'weekly':
            // Last 7 days
            for (let i = 6; i >= 0; i--) {
                const date = new Date(now);
                date.setDate(date.getDate() - i);
                const dayTransactions = transactions.filter(t => {
                    const transactionDate = new Date(t.date);
                    return transactionDate.toDateString() === date.toDateString();
                });

                const dayIncome = dayTransactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
                const dayExpenses = Math.abs(dayTransactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0));

                data.push({
                    period: date.toLocaleDateString('en-US', { weekday: 'short' }),
                    amount: dayIncome + dayExpenses,
                    income: dayIncome,
                    expenses: dayExpenses
                });
            }
            break;

        case 'monthly':
            // Last 6 months
            for (let i = 5; i >= 0; i--) {
                const date = new Date(now);
                date.setMonth(date.getMonth() - i);
                const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
                const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);

                const monthTransactions = transactions.filter(t => {
                    const transactionDate = new Date(t.date);
                    return transactionDate >= monthStart && transactionDate <= monthEnd;
                });

                const monthIncome = monthTransactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
                const monthExpenses = Math.abs(monthTransactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0));

                data.push({
                    period: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
                    amount: monthIncome + monthExpenses,
                    income: monthIncome,
                    expenses: monthExpenses
                });
            }
            break;

        case 'yearly':
            // Last 3 years
            for (let i = 2; i >= 0; i--) {
                const year = now.getFullYear() - i;
                const yearStart = new Date(year, 0, 1);
                const yearEnd = new Date(year, 11, 31);

                const yearTransactions = transactions.filter(t => {
                    const transactionDate = new Date(t.date);
                    return transactionDate >= yearStart && transactionDate <= yearEnd;
                });

                const yearIncome = yearTransactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
                const yearExpenses = Math.abs(yearTransactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0));

                data.push({
                    period: year.toString(),
                    amount: yearIncome + yearExpenses,
                    income: yearIncome,
                    expenses: yearExpenses
                });
            }
            break;

        default:
            return data;
    }

    return data;
};


const AccountDetail = ({ isDark = false }) => {
    const { name } = useParams();
    const navigate = useNavigate();
    const account = accountsData[name];

    const [transactions, setTransactions] = useState(account?.transactions || []);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [transactionToDelete, setTransactionToDelete] = useState(null);
    const [showReceiptScanner, setShowReceiptScanner] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [scanResult, setScanResult] = useState(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [videoStream, setVideoStream] = useState(null);
    const [showCamera, setShowCamera] = useState(false);
    const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);
    const [selectedTimePeriod, setSelectedTimePeriod] = useState('weekly');




    const [newTransaction, setNewTransaction] = useState({
        date: new Date().toISOString().split('T')[0],
        description: '',
        category: '',
        amount: '',
        type: 'expense',
        recurring: 'One-time'
    });

    if (!account) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Not Found</h2>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    const IconComponent = account.icon;

    // Start camera for receipt scanning
    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'environment', // Use rear camera on mobile
                    width: { ideal: 1920 },
                    height: { ideal: 1080 }
                }
            });
            setVideoStream(stream);
            setShowCamera(true);
        } catch (error) {
            console.error('Error accessing camera:', error);
            alert('Unable to access camera. Please check permissions.');
        }
    };

    // Stop camera
    const stopCamera = () => {
        if (videoStream) {
            videoStream.getTracks().forEach(track => track.stop());
            setVideoStream(null);
        }
        setShowCamera(false);
        setCapturedImage(null);
    };

    // Capture image from camera
    const captureImage = () => {
        const video = document.getElementById('camera-video');
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);

        const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
        setCapturedImage(imageDataUrl);
        stopCamera();
    };

    // Convert image to base64
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    // Mock Gemini API call (replace with actual API)
    const analyzeReceiptWithGemini = async (imageBase64) => {
        const base64Image = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');

        try {
            const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyD6RceI9Dbi3hbfFyZ0WlSeRjfzD5fGOLI', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [
                            {
                                text: "Analyze this receipt image and extract the following information in JSON format: merchant name, date (YYYY-MM-DD format), total amount (number only), and suggest a category. Return only the JSON object with keys: merchant, date, amount, category."
                            },
                            {
                                inline_data: {
                                    mime_type: "image/jpeg",
                                    data: base64Image
                                }
                            }
                        ]
                    }]
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }


            const result = await response.json();
            console.log('API Response:', result); // For debugging

            // Check if response has the expected structure
            if (!result.candidates || !result.candidates[0] || !result.candidates[0].content || !result.candidates[0].content.parts || !result.candidates[0].content.parts[0]) {
                throw new Error('Invalid API response structure');
            }

            const extractedText = result.candidates[0].content.parts[0].text;

            // Clean the response text to extract JSON
            let cleanedText = extractedText.trim();

            // Remove markdown code blocks if present
            if (cleanedText.startsWith('```')) {
                cleanedText = cleanedText.replace(/^```json\s*/, '').replace(/\s*```$/g, '');
            } else if (cleanedText.startsWith('```')) {
                cleanedText = cleanedText.replace(/^```.*```$/g, '');
            }

            // Parse the JSON response from Gemini
            // Try to parse the JSON response from Gemini
            let parsedData;
            try {
                parsedData = JSON.parse(cleanedText);
            } catch (parseError) {
                console.error('JSON parse error:', parseError);
                console.error('Raw response:', cleanedText);

                // Fallback: try to extract data using regex if JSON parsing fails
                const merchantMatch = cleanedText.match(/["']?merchant["']?\s*:\s*["']([^"']+)["']?/i);
                const dateMatch = cleanedText.match(/["']?date["']?\s*:\s*["'](\d{4}-\d{2}-\d{2})["']?/i);
                const amountMatch = cleanedText.match(/["']?amount["']?\s*:\s*["']?(\d+\.?\d*)["']?/i);
                const categoryMatch = cleanedText.match(/["']?category["']?\s*:\s*["']([^"']+)["']?/i);

                parsedData = {
                    merchant: merchantMatch ? merchantMatch[1] : 'Unknown Merchant',
                    date: dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0],
                    amount: amountMatch ? amountMatch[1] : '0.00',
                    category: categoryMatch ? categoryMatch[1] : 'Other'
                };
            }

            return {
                success: true,
                data: {
                    merchant: parsedData.merchant || 'Unknown Merchant',
                    date: parsedData.date || new Date().toISOString().split('T')[0],
                    amount: parsedData.amount?.toString() || '0.00',
                    category: parsedData.category || 'Other',
                    description: `Receipt scan - ${parsedData.merchant || 'Unknown Merchant'}`
                }
            };

        } catch (error) {
            console.error('Error analyzing receipt:', error);
            return {
                success: false,
                error: `Failed to analyze receipt: ${error.message}. Please try again.`
            };
        }
    };

    // Handle file upload
    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        setIsScanning(true);

        try {
            const base64Image = await convertToBase64(file);
            setCapturedImage(base64Image);

            const result = await analyzeReceiptWithGemini(base64Image);
            setScanResult(result);
        } catch (error) {
            console.error('Error processing file:', error);
            setScanResult({
                success: false,
                error: 'Error processing image. Please try again.'
            });
        }

        setIsScanning(false);
    };

    // Process captured image
    const processCapturedImage = async () => {
        if (!capturedImage) return;

        setIsScanning(true);

        try {
            const result = await analyzeReceiptWithGemini(capturedImage);
            setScanResult(result);
        } catch (error) {
            console.error('Error processing image:', error);
            setScanResult({
                success: false,
                error: 'Error processing image. Please try again.'
            });
        }

        setIsScanning(false);
    };

    // Use scanned data to populate transaction form
    const useScannedData = () => {
        if (scanResult && scanResult.success) {
            const data = scanResult.data;
            setNewTransaction({
                date: data.date,
                description: data.description,
                category: data.category,
                amount: data.amount,
                type: 'expense',
                recurring: 'One-time'
            });

            // Close scanner and open add transaction modal
            setShowReceiptScanner(false);
            setScanResult(null);
            setCapturedImage(null);
            setShowAddModal(true);
        }
    };

    // Reset scanner state
    const resetScanner = () => {
        setShowReceiptScanner(false);
        setIsScanning(false);
        setScanResult(null);
        setCapturedImage(null);
        stopCamera();
    };


    // Categories based on account type
    const getCategories = (accountType) => {
        const categories = {
            'Savings': ['Salary', 'Interest', 'Transfer', 'Bonus'],
            'Credit': ['Shopping', 'Food', 'Transport', 'Entertainment', 'Bills'],
            'Investment': ['Dividend', 'Investment', 'Fee', 'Capital Gain'],
            'Checking': ['Freelance', 'Food', 'Housing', 'Utilities', 'Entertainment']
        };
        return categories[accountType] || [];
    };

    const categories = getCategories(account.type);
    const chartData = getChartData(transactions, selectedTimePeriod);


    // Filter transactions
    const filteredTransactions = transactions.filter(transaction => {
        const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || transaction.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getBadgeColor = (category) => {
        const colors = {
            'Salary': 'bg-emerald-100 text-emerald-700',
            'Shopping': 'bg-purple-100 text-purple-700',
            'Food': 'bg-orange-100 text-orange-700',
            'Transport': 'bg-blue-100 text-blue-700',
            'Entertainment': 'bg-pink-100 text-pink-700',
            'Housing': 'bg-yellow-100 text-yellow-700',
            'Investment': 'bg-indigo-100 text-indigo-700',
            'Dividend': 'bg-green-100 text-green-700',
            'Fee': 'bg-red-100 text-red-700',
            'Interest': 'bg-teal-100 text-teal-700',
            'Transfer': 'bg-gray-100 text-gray-700',
            'Freelance': 'bg-cyan-100 text-cyan-700',
            'Utilities': 'bg-amber-100 text-amber-700',
            'Bills': 'bg-slate-100 text-slate-700',
        };
        return colors[category] || 'bg-gray-100 text-gray-500';
    };

    const getColorClasses = (color) => {
        const colors = {
            blue: 'text-blue-600 bg-blue-100',
            emerald: 'text-emerald-600 bg-emerald-100',
            red: 'text-red-600 bg-red-100',
            purple: 'text-purple-600 bg-purple-100'
        };
        return colors[color] || colors.blue;
    };

    const handleAddTransaction = () => {
        const amount = parseFloat(newTransaction.amount);
        const finalAmount = newTransaction.type === 'expense' ? -Math.abs(amount) : Math.abs(amount);

        const transaction = {
            id: Date.now(),
            ...newTransaction,
            amount: finalAmount
        };

        setTransactions([transaction, ...transactions]);
        setNewTransaction({
            date: new Date().toISOString().split('T')[0],
            description: '',
            category: '',
            amount: '',
            type: 'expense',
            recurring: 'One-time'
        });
        setShowAddModal(false);
    };

    const handleEditTransaction = () => {
        const amount = parseFloat(editingTransaction.amount);
        const finalAmount = editingTransaction.type === 'expense' ? -Math.abs(amount) : Math.abs(amount);

        const updatedTransaction = {
            ...editingTransaction,
            amount: finalAmount
        };

        setTransactions(transactions.map(t =>
            t.id === editingTransaction.id ? updatedTransaction : t
        ));
        setShowEditModal(false);
        setEditingTransaction(null);
    };

    const handleDeleteTransaction = (transaction) => {
        setTransactionToDelete(transaction);
        setShowDeleteModal(true);
    };

    const confirmDeleteTransaction = () => {
        if (transactionToDelete) {
            setTransactions(transactions.filter(t => t.id !== transactionToDelete.id));
        }
        setShowDeleteModal(false);
        setTransactionToDelete(null);
    };

    const openEditModal = (transaction) => {
        setEditingTransaction({
            ...transaction,
            amount: Math.abs(transaction.amount),
            type: transaction.amount < 0 ? 'expense' : 'income'
        });
        setShowEditModal(true);
    };


    // Drop-Down 
    // Handle period selection
    const handlePeriodSelect = (period) => {
        setSelectedTimePeriod(period);
        setShowPeriodDropdown(false);
    };

    // Close dropdown when clicking outside
    const handleDropdownClickOutside = (event) => {
        if (!event.target.closest('.period-dropdown')) {
            setShowPeriodDropdown(false);
        }
    };

    // Add event listener for clicking outside (place in useEffect)
    React.useEffect(() => {
        document.addEventListener('click', handleDropdownClickOutside);
        return () => {
            document.removeEventListener('click', handleDropdownClickOutside);
        };
    }, []);

    return (
        <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-950' : 'bg-gray-50'
            }`}>
            {/* Header */}
            <header className={`border-b transition-colors duration-300 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
                }`}>
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => navigate('/dashboard')}
                                className={`p-2 rounded-xl transition-colors ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                                    }`}
                            >
                                <ArrowLeft className={`w-6 h-6 ${isDark ? 'text-gray-400' : 'text-gray-600'
                                    }`} />
                            </button>
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${getColorClasses(account.color)
                                }`}>
                                <IconComponent className="w-6 h-6" />
                            </div>
                            <div>
                                <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'
                                    }`}>
                                    {account.name}
                                </h1>
                                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'
                                    }`}>
                                    {account.type} • {account.number}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowAddModal(true)}
                            className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Add Transaction</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Balance Overview */}
                <section className="mb-8">
                    <div className={`p-8 rounded-3xl border transition-colors ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-lg'
                        }`}>
                        <div className="grid md:grid-cols-4 gap-6">
                            <div className="md:col-span-2">
                                <h2 className={`text-lg font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'
                                    }`}>
                                    Current Balance
                                </h2>
                                <div className={`text-4xl font-bold ${account.balance < 0
                                    ? 'text-red-500'
                                    : isDark ? 'text-white' : 'text-gray-900'
                                    }`}>
                                    {formatCurrency(account.balance)}
                                </div>
                            </div>
                            <div>
                                <h3 className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'
                                    }`}>
                                    Total Income
                                </h3>
                                <div className="text-2xl font-bold text-emerald-500">
                                    {formatCurrency(account.totalIncome)}
                                </div>
                            </div>
                            <div>
                                <h3 className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'
                                    }`}>
                                    Total Expenses
                                </h3>
                                <div className="text-2xl font-bold text-red-500">
                                    {formatCurrency(account.totalExpenses)}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Chart Section */}
                <section className="mb-8">
                    <div className={`p-6 rounded-2xl border ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-lg'
                        }`}>
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                            <h3 className={`text-lg font-bold mb-4 md:mb-0 ${isDark ? 'text-white' : 'text-gray-900'
                                }`}>
                                Transaction Overview
                            </h3>

                            {/* Modern Dropdown Filter */}
                            <div className="relative period-dropdown">
                                <button
                                    onClick={() => setShowPeriodDropdown(!showPeriodDropdown)}
                                    className={`flex items-center justify-between min-w-[140px] px-4 py-3 rounded-xl border transition-all duration-200 ${isDark
                                        ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700 hover:border-gray-600'
                                        : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50 hover:border-gray-300 shadow-sm'
                                        } ${showPeriodDropdown ? (isDark ? 'ring-2 ring-blue-500' : 'ring-2 ring-blue-400') : ''}`}
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-2 h-2 rounded-full ${selectedTimePeriod === 'weekly' ? 'bg-green-500' :
                                            selectedTimePeriod === 'monthly' ? 'bg-blue-500' :
                                                'bg-purple-500'
                                            }`}></div>
                                        <span className="font-medium">
                                            {selectedTimePeriod === 'weekly' ? 'Weekly' :
                                                selectedTimePeriod === 'monthly' ? 'Monthly' : 'Yearly'}
                                        </span>
                                    </div>
                                    <svg
                                        className={`w-4 h-4 transition-transform duration-200 ${showPeriodDropdown ? 'rotate-180' : ''
                                            } ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* Dropdown Menu */}
                                {showPeriodDropdown && (
                                    <div className={`absolute top-full left-0 right-0 mt-2 py-2 rounded-xl border shadow-lg z-50 ${isDark
                                        ? 'bg-gray-800 border-gray-700'
                                        : 'bg-white border-gray-200'
                                        }`}>
                                        {[
                                            {
                                                value: 'weekly',
                                                label: 'Weekly',
                                                desc: 'Last 7 Days',
                                                color: 'bg-green-500',
                                                icon: '📊'
                                            },
                                            {
                                                value: 'monthly',
                                                label: 'Monthly',
                                                desc: 'Last 6 Months',
                                                color: 'bg-blue-500',
                                                icon: '📈'
                                            },
                                            {
                                                value: 'yearly',
                                                label: 'Yearly',
                                                desc: 'Last 3 Years',
                                                color: 'bg-purple-500',
                                                icon: '📉'
                                            }
                                        ].map((period) => (
                                            <button
                                                key={period.value}
                                                onClick={() => handlePeriodSelect(period.value)}
                                                className={`w-full flex items-center px-4 py-3 text-left transition-colors duration-150 ${selectedTimePeriod === period.value
                                                    ? isDark
                                                        ? 'bg-blue-600/20 text-blue-300'
                                                        : 'bg-blue-50 text-blue-600'
                                                    : isDark
                                                        ? 'text-gray-300 hover:bg-gray-700'
                                                        : 'text-gray-700 hover:bg-gray-50'
                                                    }`}
                                            >
                                                <div className="flex items-center space-x-3 flex-1">
                                                    <div className={`w-3 h-3 rounded-full ${period.color}`}></div>
                                                    <div>
                                                        <div className="font-medium text-sm">
                                                            {period.icon} {period.label}
                                                        </div>
                                                        <div className={`text-xs ${selectedTimePeriod === period.value
                                                            ? isDark ? 'text-blue-400' : 'text-blue-500'
                                                            : isDark ? 'text-gray-500' : 'text-gray-500'
                                                            }`}>
                                                            {period.desc}
                                                        </div>
                                                    </div>
                                                </div>
                                                {selectedTimePeriod === period.value && (
                                                    <svg
                                                        className="w-4 h-4 text-blue-500"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Chart Info with Enhanced Design */}
                        <div className={`flex items-center space-x-4 mb-4 p-3 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'
                            }`}>
                            <div className={`flex items-center space-x-2 ${isDark ? 'text-gray-300' : 'text-gray-600'
                                }`}>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-sm font-medium">
                                    Showing {
                                        selectedTimePeriod === 'weekly' ? 'last 7 days' :
                                            selectedTimePeriod === 'monthly' ? 'last 6 months' :
                                                'last 3 years'
                                    } data
                                </span>
                            </div>

                            {/* Data Points Counter */}
                            <div className={`text-xs px-2 py-1 rounded-full ${isDark ? 'bg-blue-600/20 text-blue-300' : 'bg-blue-100 text-blue-600'
                                }`}>
                                {chartData.length} data points
                            </div>
                        </div>

                        {/* Rest of your chart code remains the same */}
                        <div className="relative">
                            <ResponsiveContainer width="100%" height={350}>
                                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                                        </linearGradient>
                                        <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis
                                        dataKey="period"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{
                                            fill: isDark ? '#9ca3af' : '#6b7280',
                                            fontSize: 12
                                        }}
                                        interval={0}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{
                                            fill: isDark ? '#9ca3af' : '#6b7280',
                                            fontSize: 12
                                        }}
                                        tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="income"
                                        stackId="1"
                                        stroke="#10b981"
                                        strokeWidth={2}
                                        fill="url(#colorIncome)"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="expenses"
                                        stackId="2"
                                        stroke="#ef4444"
                                        strokeWidth={2}
                                        fill="url(#colorExpenses)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>

                            {/* Enhanced Chart Legend */}
                            <div className="flex items-center justify-center space-x-8 mt-4">
                                <div className="flex items-center space-x-2">
                                    <div className="w-4 h-3 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-sm"></div>
                                    <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                        Income
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-4 h-3 bg-gradient-to-r from-red-500 to-red-400 rounded-sm"></div>
                                    <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                        Expenses
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Summary Stats */}
                        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <div className="text-center p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
                                <div className={`text-xs font-semibold mb-2 text-emerald-600 dark:text-emerald-400 uppercase tracking-wider`}>
                                    Total Income
                                </div>
                                <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                                    {formatCurrency(chartData.reduce((sum, item) => sum + item.income, 0))}
                                </div>
                            </div>
                            <div className="text-center p-3 rounded-lg bg-red-50 dark:bg-red-900/20">
                                <div className={`text-xs font-semibold mb-2 text-red-600 dark:text-red-400 uppercase tracking-wider`}>
                                    Total Expenses
                                </div>
                                <div className="text-xl font-bold text-red-600 dark:text-red-400">
                                    {formatCurrency(chartData.reduce((sum, item) => sum + item.expenses, 0))}
                                </div>
                            </div>
                            <div className="text-center p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                                <div className={`text-xs font-semibold mb-2 text-blue-600 dark:text-blue-400 uppercase tracking-wider`}>
                                    Net Flow
                                </div>
                                <div className={`text-xl font-bold ${chartData.reduce((sum, item) => sum + (item.income - item.expenses), 0) >= 0
                                    ? 'text-emerald-600 dark:text-emerald-400'
                                    : 'text-red-600 dark:text-red-400'
                                    }`}>
                                    {formatCurrency(chartData.reduce((sum, item) => sum + (item.income - item.expenses), 0))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>



                {/* Filters and Search */}
                <section className="mb-6">
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className={`relative flex items-center ${isDark ? 'bg-gray-800' : 'bg-white'
                                } rounded-xl px-4 py-2 border ${isDark ? 'border-gray-700' : 'border-gray-200'
                                }`}>
                                <Search className={`w-5 h-5 mr-3 ${isDark ? 'text-gray-400' : 'text-gray-500'
                                    }`} />
                                <input
                                    type="text"
                                    placeholder="Search transactions..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className={`bg-transparent outline-none placeholder-gray-500 ${isDark ? 'text-white' : 'text-gray-900'
                                        }`}
                                />
                            </div>

                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className={`px-4 py-2 rounded-xl border outline-none ${isDark
                                    ? 'bg-gray-800 border-gray-700 text-white'
                                    : 'bg-white border-gray-200 text-gray-900'
                                    }`}
                            >
                                <option value="All">All Categories</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        <div className="text-sm text-gray-500">
                            Showing {filteredTransactions.length} of {transactions.length} transactions
                        </div>
                    </div>
                </section>

                {/* Transactions Table */}
                <section>
                    <div className={`rounded-2xl border overflow-hidden ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-lg'
                        }`}>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className={isDark ? 'bg-gray-800' : 'bg-gray-50'}>
                                    <tr>
                                        <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'
                                            }`}>
                                            Date
                                        </th>
                                        <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'
                                            }`}>
                                            Description
                                        </th>
                                        <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'
                                            }`}>
                                            Category
                                        </th>
                                        <th className={`px-6 py-4 text-right text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'
                                            }`}>
                                            Amount
                                        </th>
                                        <th className={`px-6 py-4 text-center text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'
                                            }`}>
                                            Type
                                        </th>
                                        <th className={`px-6 py-4 text-center text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'
                                            }`}>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
                                    {filteredTransactions.map((transaction, index) => (
                                        <tr key={transaction.id} className={
                                            isDark
                                                ? index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'
                                                : index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                        }>
                                            <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-300' : 'text-gray-900'
                                                }`}>
                                                {formatDate(transaction.date)}
                                            </td>
                                            <td className={`px-6 py-4 text-sm ${isDark ? 'text-gray-300' : 'text-gray-900'
                                                }`}>
                                                {transaction.description}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getBadgeColor(transaction.category)
                                                    }`}>
                                                    {transaction.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <span className={`text-sm font-bold ${transaction.amount < 0 ? 'text-red-500' : 'text-emerald-500'
                                                    }`}>
                                                    {formatCurrency(transaction.amount)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                                    {transaction.recurring}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <div className="flex items-center justify-center space-x-2">
                                                    <button
                                                        onClick={() => openEditModal(transaction)}
                                                        className={`p-1 rounded transition-colors ${isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                                                            }`}
                                                    >
                                                        <Edit3 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteTransaction(transaction)}
                                                        className="p-1 rounded transition-colors hover:bg-red-100 text-red-600"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>

                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {filteredTransactions.length === 0 && (
                            <div className="text-center py-12">
                                <AlertCircle className={`mx-auto h-12 w-12 ${isDark ? 'text-gray-600' : 'text-gray-400'
                                    }`} />
                                <h3 className={`mt-2 text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-900'
                                    }`}>
                                    No transactions found
                                </h3>
                                <p className={`mt-1 text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'
                                    }`}>
                                    Try adjusting your search or filter criteria.
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            {/* Add Transaction Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className={`max-w-md w-full rounded-2xl p-6 ${isDark ? 'bg-gray-900' : 'bg-white'
                        }`}>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'
                                }`}>
                                Add Transaction
                            </h3>
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={() => setShowReceiptScanner(true)}
                                    className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium border transition-colors ${isDark
                                        ? 'border-gray-700 text-gray-300 hover:bg-gray-800'
                                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    <Scan className="w-4 h-4" />
                                    <span>Scan Receipt</span>
                                </button>
                            </div>


                            <button
                                onClick={() => setShowAddModal(false)}
                                className={`p-2 rounded-xl transition-colors ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                                    }`}
                            >
                                <X className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'
                                    }`} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'
                                    }`}>
                                    Description
                                </label>
                                <input
                                    type="text"
                                    value={newTransaction.description}
                                    onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                                    className={`w-full px-4 py-2 rounded-xl border outline-none ${isDark
                                        ? 'bg-gray-800 border-gray-700 text-white'
                                        : 'bg-white border-gray-200 text-gray-900'
                                        }`}
                                    placeholder="Enter description"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'
                                        }`}>
                                        Amount
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={newTransaction.amount}
                                        onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                                        className={`w-full px-4 py-2 rounded-xl border outline-none ${isDark
                                            ? 'bg-gray-800 border-gray-700 text-white'
                                            : 'bg-white border-gray-200 text-gray-900'
                                            }`}
                                        placeholder="0.00"
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'
                                        }`}>
                                        Type
                                    </label>
                                    <select
                                        value={newTransaction.type}
                                        onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
                                        className={`w-full px-4 py-2 rounded-xl border outline-none ${isDark
                                            ? 'bg-gray-800 border-gray-700 text-white'
                                            : 'bg-white border-gray-200 text-gray-900'
                                            }`}
                                    >
                                        <option value="expense">Expense</option>
                                        <option value="income">Income</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'
                                        }`}>
                                        Category
                                    </label>
                                    <select
                                        value={newTransaction.category}
                                        onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
                                        className={`w-full px-4 py-2 rounded-xl border outline-none ${isDark
                                            ? 'bg-gray-800 border-gray-700 text-white'
                                            : 'bg-white border-gray-200 text-gray-900'
                                            }`}
                                    >
                                        <option value="">Select category</option>
                                        {categories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'
                                        }`}>
                                        Recurring
                                    </label>
                                    <select
                                        value={newTransaction.recurring}
                                        onChange={(e) => setNewTransaction({ ...newTransaction, recurring: e.target.value })}
                                        className={`w-full px-4 py-2 rounded-xl border outline-none ${isDark
                                            ? 'bg-gray-800 border-gray-700 text-white'
                                            : 'bg-white border-gray-200 text-gray-900'
                                            }`}
                                    >
                                        <option value="One-time">One-time</option>
                                        <option value="Daily">Daily</option>
                                        <option value="Weekly">Weekly</option>
                                        <option value="Monthly">Monthly</option>
                                        <option value="Quarterly">Quarterly</option>
                                        <option value="Yearly">Yearly</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'
                                    }`}>
                                    Date
                                </label>
                                <input
                                    type="date"
                                    value={newTransaction.date}
                                    onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                                    className={`w-full px-4 py-2 rounded-xl border outline-none ${isDark
                                        ? 'bg-gray-800 border-gray-700 text-white'
                                        : 'bg-white border-gray-200 text-gray-900'
                                        }`}
                                />
                            </div>
                        </div>

                        <div className="flex space-x-4 mt-6">
                            <button
                                onClick={() => setShowAddModal(false)}
                                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${isDark
                                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddTransaction}
                                disabled={!newTransaction.description || !newTransaction.amount || !newTransaction.category}
                                className="flex-1 py-3 px-4 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Add Transaction
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Transaction Modal */}
            {showEditModal && editingTransaction && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className={`max-w-md w-full rounded-2xl p-6 ${isDark ? 'bg-gray-900' : 'bg-white'
                        }`}>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'
                                }`}>
                                Edit Transaction
                            </h3>
                            <button
                                onClick={() => {
                                    setShowEditModal(false);
                                    setEditingTransaction(null);
                                }}
                                className={`p-2 rounded-xl transition-colors ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                                    }`}
                            >
                                <X className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'
                                    }`} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'
                                    }`}>
                                    Description
                                </label>
                                <input
                                    type="text"
                                    value={editingTransaction.description}
                                    onChange={(e) => setEditingTransaction({ ...editingTransaction, description: e.target.value })}
                                    className={`w-full px-4 py-2 rounded-xl border outline-none ${isDark
                                        ? 'bg-gray-800 border-gray-700 text-white'
                                        : 'bg-white border-gray-200 text-gray-900'
                                        }`}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'
                                        }`}>
                                        Amount
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={editingTransaction.amount}
                                        onChange={(e) => setEditingTransaction({ ...editingTransaction, amount: e.target.value })}
                                        className={`w-full px-4 py-2 rounded-xl border outline-none ${isDark
                                            ? 'bg-gray-800 border-gray-700 text-white'
                                            : 'bg-white border-gray-200 text-gray-900'
                                            }`}
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'
                                        }`}>
                                        Type
                                    </label>
                                    <select
                                        value={editingTransaction.type}
                                        onChange={(e) => setEditingTransaction({ ...editingTransaction, type: e.target.value })}
                                        className={`w-full px-4 py-2 rounded-xl border outline-none ${isDark
                                            ? 'bg-gray-800 border-gray-700 text-white'
                                            : 'bg-white border-gray-200 text-gray-900'
                                            }`}
                                    >
                                        <option value="expense">Expense</option>
                                        <option value="income">Income</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'
                                        }`}>
                                        Category
                                    </label>
                                    <select
                                        value={editingTransaction.category}
                                        onChange={(e) => setEditingTransaction({ ...editingTransaction, category: e.target.value })}
                                        className={`w-full px-4 py-2 rounded-xl border outline-none ${isDark
                                            ? 'bg-gray-800 border-gray-700 text-white'
                                            : 'bg-white border-gray-200 text-gray-900'
                                            }`}
                                    >
                                        {categories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'
                                        }`}>
                                        Recurring
                                    </label>
                                    <select
                                        value={editingTransaction.recurring}
                                        onChange={(e) => setEditingTransaction({ ...editingTransaction, recurring: e.target.value })}
                                        className={`w-full px-4 py-2 rounded-xl border outline-none ${isDark
                                            ? 'bg-gray-800 border-gray-700 text-white'
                                            : 'bg-white border-gray-200 text-gray-900'
                                            }`}
                                    >
                                        <option value="One-time">One-time</option>
                                        <option value="Daily">Daily</option>
                                        <option value="Weekly">Weekly</option>
                                        <option value="Monthly">Monthly</option>
                                        <option value="Quarterly">Quarterly</option>
                                        <option value="Yearly">Yearly</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'
                                    }`}>
                                    Date
                                </label>
                                <input
                                    type="date"
                                    value={editingTransaction.date}
                                    onChange={(e) => setEditingTransaction({ ...editingTransaction, date: e.target.value })}
                                    className={`w-full px-4 py-2 rounded-xl border outline-none ${isDark
                                        ? 'bg-gray-800 border-gray-700 text-white'
                                        : 'bg-white border-gray-200 text-gray-900'
                                        }`}
                                />
                            </div>
                        </div>

                        <div className="flex space-x-4 mt-6">
                            <button
                                onClick={() => {
                                    setShowEditModal(false);
                                    setEditingTransaction(null);
                                }}
                                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${isDark
                                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleEditTransaction}
                                className="flex-1 py-3 px-4 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Receipt Scanner Modal */}
            {showReceiptScanner && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className={`max-w-lg w-full rounded-2xl p-6 max-h-[90vh] overflow-y-auto ${isDark ? 'bg-gray-900' : 'bg-white'
                        }`}>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'
                                }`}>
                                Scan Receipt
                            </h3>
                            <button
                                onClick={resetScanner}
                                className={`p-2 rounded-xl transition-colors ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                                    }`}
                            >
                                <X className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'
                                    }`} />
                            </button>
                        </div>

                        {!showCamera && !capturedImage && !scanResult && (
                            <div className="space-y-4">
                                <p className={`text-center mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'
                                    }`}>
                                    Choose how you'd like to scan your receipt
                                </p>

                                <div className="grid grid-cols-1 gap-4">
                                    <button
                                        onClick={startCamera}
                                        className={`flex items-center justify-center space-x-3 p-4 border-2 border-dashed rounded-2xl transition-colors ${isDark
                                            ? 'border-gray-700 hover:border-blue-500 hover:bg-gray-800'
                                            : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                                            }`}
                                    >
                                        <Camera className={`w-6 h-6 ${isDark ? 'text-gray-400' : 'text-gray-600'
                                            }`} />
                                        <div className="text-left">
                                            <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'
                                                }`}>
                                                Take Photo
                                            </div>
                                            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'
                                                }`}>
                                                Use your camera to capture receipt
                                            </div>
                                        </div>
                                    </button>

                                    <div className="relative">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileUpload}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            disabled={isScanning}
                                        />
                                        <div className={`flex items-center justify-center space-x-3 p-4 border-2 border-dashed rounded-2xl transition-colors ${isDark
                                            ? 'border-gray-700 hover:border-blue-500 hover:bg-gray-800'
                                            : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                                            }`}>
                                            <Upload className={`w-6 h-6 ${isDark ? 'text-gray-400' : 'text-gray-600'
                                                }`} />
                                            <div className="text-left">
                                                <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'
                                                    }`}>
                                                    Upload Image
                                                </div>
                                                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'
                                                    }`}>
                                                    Select an image from your device
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Camera View */}
                        {showCamera && (
                            <div className="space-y-4">
                                <div className="relative rounded-2xl overflow-hidden bg-black">
                                    <video
                                        id="camera-video"
                                        autoPlay
                                        playsInline
                                        className="w-full h-64 object-cover"
                                        ref={(video) => {
                                            if (video && videoStream) {
                                                video.srcObject = videoStream;
                                            }
                                        }}
                                    />
                                    <div className="absolute inset-0 border-2 border-dashed border-white/30 m-4 rounded-xl pointer-events-none">
                                        <div className="absolute top-2 left-2 text-white text-sm bg-black/50 px-2 py-1 rounded">
                                            Position receipt within frame
                                        </div>
                                    </div>
                                </div>

                                <div className="flex space-x-4">
                                    <button
                                        onClick={stopCamera}
                                        className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${isDark
                                            ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={captureImage}
                                        className="flex-1 py-3 px-4 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
                                    >
                                        Capture
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Captured Image Preview */}
                        {capturedImage && !scanResult && (
                            <div className="space-y-4">
                                <div className="text-center">
                                    <img
                                        src={capturedImage}
                                        alt="Captured receipt"
                                        className="w-full h-64 object-cover rounded-2xl border"
                                    />
                                </div>

                                <div className="flex space-x-4">
                                    <button
                                        onClick={() => {
                                            setCapturedImage(null);
                                            startCamera();
                                        }}
                                        className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${isDark
                                            ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        Retake
                                    </button>
                                    <button
                                        onClick={processCapturedImage}
                                        disabled={isScanning}
                                        className="flex-1 py-3 px-4 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                                    >
                                        {isScanning && <Loader2 className="w-4 h-4 animate-spin" />}
                                        <span>{isScanning ? 'Processing...' : 'Analyze Receipt'}</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Scanning Progress */}
                        {isScanning && (
                            <div className="text-center py-8">
                                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-500" />
                                <p className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'
                                    }`}>
                                    Analyzing Receipt...
                                </p>
                                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'
                                    }`}>
                                    Using AI to extract transaction details
                                </p>
                            </div>
                        )}

                        {/* Scan Results */}
                        {scanResult && (
                            <div className="space-y-4">
                                {scanResult.success ? (
                                    <div>
                                        <div className="flex items-center space-x-2 mb-4">
                                            <CheckCircle className="w-6 h-6 text-green-500" />
                                            <h4 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'
                                                }`}>
                                                Receipt Scanned Successfully
                                            </h4>
                                        </div>

                                        <div className={`p-4 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
                                            }`}>
                                            <div className="space-y-3">
                                                <div className="flex justify-between">
                                                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'
                                                        }`}>Merchant:</span>
                                                    <span className={isDark ? 'text-white' : 'text-gray-900'}>
                                                        {scanResult.data.merchant}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'
                                                        }`}>Date:</span>
                                                    <span className={isDark ? 'text-white' : 'text-gray-900'}>
                                                        {formatDate(scanResult.data.date)}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'
                                                        }`}>Amount:</span>
                                                    <span className="text-lg font-bold text-green-600">
                                                        ${scanResult.data.amount}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'
                                                        }`}>Category:</span>
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getBadgeColor(scanResult.data.category)
                                                        }`}>
                                                        {scanResult.data.category}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex space-x-4">
                                            <button
                                                onClick={resetScanner}
                                                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${isDark
                                                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                            >
                                                Scan Another
                                            </button>
                                            <button
                                                onClick={useScannedData}
                                                className="flex-1 py-3 px-4 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors"
                                            >
                                                Use This Data
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="flex items-center space-x-2 mb-4">
                                            <AlertTriangle className="w-6 h-6 text-red-500" />
                                            <h4 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'
                                                }`}>
                                                Scan Failed
                                            </h4>
                                        </div>

                                        <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'
                                            }`}>
                                            {scanResult.error}
                                        </p>

                                        <div className="flex space-x-4">
                                            <button
                                                onClick={() => {
                                                    setScanResult(null);
                                                    setCapturedImage(null);
                                                }}
                                                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${isDark
                                                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                            >
                                                Try Again
                                            </button>
                                            <button
                                                onClick={() => setShowAddModal(true)}
                                                className="flex-1 py-3 px-4 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
                                            >
                                                Manual Entry
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Custom Delete Confirmation Modal */}
            {showDeleteModal && transactionToDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className={`max-w-sm w-full rounded-2xl p-6 ${isDark ? 'bg-gray-900' : 'bg-white'
                        }`}>
                        <div className="text-center">
                            <div className={`mx-auto flex items-center justify-center w-12 h-12 rounded-full mb-4 ${isDark ? 'bg-red-900/20' : 'bg-red-100'
                                }`}>
                                <Trash2 className="w-6 h-6 text-red-500" />
                            </div>

                            <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'
                                }`}>
                                Delete Transaction
                            </h3>

                            <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'
                                }`}>
                                Are you sure you want to delete "{transactionToDelete.description}"? This action cannot be undone.
                            </p>

                            <div className="flex space-x-3">
                                <button
                                    onClick={() => {
                                        setShowDeleteModal(false);
                                        setTransactionToDelete(null);
                                    }}
                                    className={`flex-1 py-2 px-4 rounded-xl font-medium transition-colors ${isDark
                                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDeleteTransaction}
                                    className="flex-1 py-2 px-4 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default AccountDetail;
