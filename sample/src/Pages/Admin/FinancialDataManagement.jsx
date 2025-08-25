import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  CheckCircle,
  XCircle
} from 'lucide-react';
import { mockCategories, mockPendingTransactions } from '../../data/mokeAdminData'

const FinancialDataManagement = ({isDark}) => {
  const [activeTab, setActiveTab] = useState('categories');
  const [categories, setCategories] = useState(mockCategories);
  const [pendingTransactions, setPendingTransactions] = useState(mockPendingTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const handleCategoryAction = (categoryId, action) => {
    if (action === 'delete') {
      if (window.confirm('Are you sure you want to delete this category?')) {
        setCategories(categories.filter(cat => cat.id !== categoryId));
      }
    } else if (action === 'edit') {
      const category = categories.find(cat => cat.id === categoryId);
      if (category) {
        setEditingCategory(category);
        setShowCategoryModal(true);
      }
    }
  };

  const handleTransactionReview = (transactionId, approved, newCategoryId) => {
    console.log(`Transaction ${transactionId} ${approved ? 'approved' : 'rejected'}`, newCategoryId);
    setPendingTransactions(pendingTransactions.filter(t => t.id !== transactionId));
  };

  const CategoryModal = ({ category, onClose, onSave }) => {
    const [formData, setFormData] = useState({
      name: category?.name || '',
      type: category?.type || 'expense',
      color: category?.color || '#3b82f6',
      icon: category?.icon || '📝'
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
      onClose();
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <motion.div
          className={`rounded-2xl p-6 w-full max-w-md mx-4 transition-colors duration-300 ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-bold transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {category ? 'Edit Category' : 'Add Category'}
            </h2>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              <XCircle className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Category Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg transition-colors duration-300 ${
                  isDark 
                    ? 'border-gray-600 bg-gray-700 text-white' 
                    : 'border-gray-300 bg-white text-gray-900'
                }`}
                required
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg transition-colors duration-300 ${
                  isDark 
                    ? 'border-gray-600 bg-gray-700 text-white' 
                    : 'border-gray-300 bg-white text-gray-900'
                }`}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Color
              </label>
              <input
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className={`w-full h-10 border rounded-lg ${
                  isDark ? 'border-gray-600' : 'border-gray-300'
                }`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Icon (Emoji)
              </label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg transition-colors duration-300 ${
                  isDark 
                    ? 'border-gray-600 bg-gray-700 text-white' 
                    : 'border-gray-300 bg-white text-gray-900'
                }`}
                placeholder="📝"
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg font-medium transition-colors"
              >
                {category ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                  isDark 
                    ? 'bg-gray-600 hover:bg-gray-500 text-gray-200' 
                    : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
                }`}
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-3xl font-bold transition-colors duration-300 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          Financial Data Management
        </h1>
        <p className={`mt-2 transition-colors duration-300 ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Manage transaction categories and review AI categorizations
        </p>
      </div>

      {/* Tabs */}
      <div className={`rounded-2xl p-6 shadow-lg border transition-colors duration-300 ${
        isDark 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className={`flex space-x-1 rounded-lg p-1 ${
          isDark ? 'bg-gray-700' : 'bg-gray-100'
        }`}>
          <button
            onClick={() => setActiveTab('categories')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'categories'
                ? isDark
                  ? 'bg-gray-600 text-white shadow-sm'
                  : 'bg-white text-gray-900 shadow-sm'
                : isDark
                ? 'text-gray-400 hover:text-gray-300'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Categories ({categories.length})
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'reviews'
                ? isDark
                  ? 'bg-gray-600 text-white shadow-sm'
                  : 'bg-white text-gray-900 shadow-sm'
                : isDark
                ? 'text-gray-400 hover:text-gray-300'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Pending Reviews ({pendingTransactions.length})
          </button>
        </div>
      </div>

      {/* Categories Tab */}
      {activeTab === 'categories' && (
        <div className="space-y-6">
          {/* Categories Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 pr-4 py-2 border rounded-lg transition-colors duration-300 ${
                    isDark 
                      ? 'border-gray-600 bg-gray-700 text-white' 
                      : 'border-gray-300 bg-white text-gray-900'
                  }`}
                />
              </div>
            </div>
            <button
              onClick={() => {
                setEditingCategory(null);
                setShowCategoryModal(true);
              }}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </button>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories
              .filter(category => category.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((category, index) => (
                <motion.div
                  key={category.id}
                  className={`rounded-2xl p-6 shadow-lg border hover:shadow-xl transition-all duration-300 ${
                    isDark 
                      ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
                      : 'bg-white border-gray-200'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                        style={{ backgroundColor: category.color + '20' }}
                      >
                        {category.icon}
                      </div>
                      <div>
                        <h3 className={`font-semibold transition-colors duration-300 ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          {category.name}
                        </h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          category.type === 'income'
                            ? isDark
                              ? 'bg-emerald-900/50 text-emerald-400'
                              : 'bg-emerald-100 text-emerald-800'
                            : isDark
                            ? 'bg-red-900/50 text-red-400'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {category.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleCategoryAction(category.id, 'edit')}
                        className={`p-2 transition-colors ${
                          isDark 
                            ? 'text-gray-400 hover:text-gray-300' 
                            : 'text-gray-400 hover:text-gray-600'
                        }`}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleCategoryAction(category.id, 'delete')}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className={`text-sm transition-colors duration-300 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Used in {category.usage_count} transactions
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      )}

      {/* Reviews Tab */}
      {activeTab === 'reviews' && (
        <div className={`rounded-2xl shadow-lg border transition-colors duration-300 ${
          isDark 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className={`p-6 border-b transition-colors duration-300 ${
            isDark ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <h3 className={`text-lg font-semibold transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Transactions Pending Review
            </h3>
            <p className={`text-sm mt-1 transition-colors duration-300 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Review AI categorizations that need manual verification
            </p>
          </div>
          
          {pendingTransactions.length === 0 ? (
            <div className="p-8 text-center">
              <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
              <p className={`transition-colors duration-300 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>No transactions pending review</p>
            </div>
          ) : (
            <div className={`divide-y transition-colors duration-300 ${
              isDark ? 'divide-gray-700' : 'divide-gray-200'
            }`}>
              {pendingTransactions.map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  className={`p-6 transition-colors duration-200 ${
                    isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h4 className={`font-medium transition-colors duration-300 ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}>
                            {transaction.description}
                          </h4>
                          <p className={`text-sm transition-colors duration-300 ${
                            isDark ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {transaction.user_email} • {new Date(transaction.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${
                            transaction.amount < 0 ? 'text-red-600' : 'text-emerald-600'
                          }`}>
                            {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm transition-colors duration-300 ${
                            isDark ? 'text-gray-400' : 'text-gray-500'
                          }`}>AI Suggested:</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            isDark 
                              ? 'bg-blue-900/50 text-blue-400' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {transaction.category_name}
                          </span>
                          <span className="text-xs text-gray-400">
                            ({Math.round((transaction.ai_confidence || 0) * 100)}% confidence)
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-6">
                      <button
                        onClick={() => handleTransactionReview(transaction.id, true)}
                        className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleTransactionReview(transaction.id, false)}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        Reject
                      </button>
                      <select
                        onChange={(e) => handleTransactionReview(transaction.id, true, e.target.value)}
                        className={`px-2 py-1 border rounded-lg text-sm transition-colors duration-300 ${
                          isDark 
                            ? 'border-gray-600 bg-gray-700 text-white' 
                            : 'border-gray-300 bg-white text-gray-900'
                        }`}
                      >
                        <option value="">Change Category</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Category Modal */}
      {showCategoryModal && (
        <CategoryModal
          category={editingCategory}
          onClose={() => {
            setShowCategoryModal(false);
            setEditingCategory(null);
          }}
          onSave={(categoryData) => {
            if (editingCategory) {
              // Update existing category
              setCategories(categories.map(cat => 
                cat.id === editingCategory.id 
                  ? { ...cat, ...categoryData, updated_at: new Date().toISOString() }
                  : cat
              ));
            } else {
              // Add new category
              const newCategory = {
                id: Date.now().toString(),
                ...categoryData,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                usage_count: 0
              };
              setCategories([...categories, newCategory]);
            }
          }}
        />
      )}
    </div>
  );
};

export default FinancialDataManagement;
