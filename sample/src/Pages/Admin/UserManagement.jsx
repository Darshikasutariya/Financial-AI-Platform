import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Ban, 
  CheckCircle, 
  XCircle,
  Eye,
  RefreshCw,
  Plus
} from 'lucide-react';
import { mockUsers } from '../../data/mokeAdminData';

const UserManagement = ({isDark}) => {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUserAction = (userId, action) => {
    console.log(`${action} user ${userId}`);
    
    if (action === 'delete') {
      if (window.confirm('Are you sure you want to delete this user?')) {
        setUsers(users.filter(user => user.id !== userId));
      }
    } else if (action === 'suspend') {
      setUsers(users.map(user => 
        user.id === userId ? { ...user, status: 'suspended' } : user
      ));
    } else if (action === 'activate') {
      setUsers(users.map(user => 
        user.id === userId ? { ...user, status: 'active' } : user
      ));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return isDark 
          ? 'bg-emerald-900/50 text-emerald-400' 
          : 'bg-emerald-100 text-emerald-800';
      case 'suspended':
        return isDark 
          ? 'bg-yellow-900/50 text-yellow-400' 
          : 'bg-yellow-100 text-yellow-800';
      case 'deactivated':
        return isDark 
          ? 'bg-red-900/50 text-red-400' 
          : 'bg-red-100 text-red-800';
      default:
        return isDark 
          ? 'bg-gray-900/50 text-gray-400' 
          : 'bg-gray-100 text-gray-800';
    }
  };

  const UserModal = ({ user, onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        className={`rounded-2xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto transition-colors duration-300 ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-2xl font-bold transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            User Details
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            <XCircle className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                First Name
              </label>
              <input
                type="text"
                value={user.first_name || ''}
                className={`w-full px-3 py-2 border rounded-lg transition-colors duration-300 ${
                  isDark 
                    ? 'border-gray-600 bg-gray-700 text-white' 
                    : 'border-gray-300 bg-white text-gray-900'
                }`}
                readOnly
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Last Name
              </label>
              <input
                type="text"
                value={user.last_name || ''}
                className={`w-full px-3 py-2 border rounded-lg transition-colors duration-300 ${
                  isDark 
                    ? 'border-gray-600 bg-gray-700 text-white' 
                    : 'border-gray-300 bg-white text-gray-900'
                }`}
                readOnly
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Email
            </label>
            <input
              type="email"
              value={user.email}
              className={`w-full px-3 py-2 border rounded-lg transition-colors duration-300 ${
                isDark 
                  ? 'border-gray-600 bg-gray-700 text-white' 
                  : 'border-gray-300 bg-white text-gray-900'
              }`}
              readOnly
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Status
              </label>
              <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(user.status)}`}>
                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
              </span>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Role
              </label>
              <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                isDark 
                  ? 'bg-blue-900/50 text-blue-400' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Total Transactions
              </label>
              <p className={`text-2xl font-bold transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {user.total_transactions || 0}
              </p>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Total Accounts
              </label>
              <p className={`text-2xl font-bold transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {user.total_accounts || 0}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Created At
              </label>
              <p className={`transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {new Date(user.created_at).toLocaleDateString()}
              </p>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Last Login
              </label>
              <p className={`transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {user.last_login ? new Date(user.last_login).toLocaleDateString() : 'Never'}
              </p>
            </div>
          </div>

          <div className={`flex space-x-3 pt-4 border-t transition-colors duration-300 ${
            isDark ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <button
              onClick={() => {
                handleUserAction(user.id, user.status === 'active' ? 'suspend' : 'activate');
                onClose();
              }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                user.status === 'active'
                  ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                  : 'bg-emerald-500 hover:bg-emerald-600 text-white'
              }`}
            >
              {user.status === 'active' ? 'Suspend' : 'Activate'}
            </button>
            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors">
              Reset Password
            </button>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this user?')) {
                  handleUserAction(user.id, 'delete');
                  onClose();
                }
              }}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
            >
              Delete User
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            User Management
          </h1>
          <p className={`mt-2 transition-colors duration-300 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Manage and monitor user accounts
          </p>
        </div>
        <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </button>
      </div>

      {/* Filters */}
      <div className={`rounded-2xl p-6 shadow-lg border transition-colors duration-300 ${
        isDark 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users by email or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg transition-colors duration-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                  isDark 
                    ? 'border-gray-600 bg-gray-700 text-white' 
                    : 'border-gray-300 bg-white text-gray-900'
                }`}
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`px-4 py-2 border rounded-lg transition-colors duration-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                isDark 
                  ? 'border-gray-600 bg-gray-700 text-white' 
                  : 'border-gray-300 bg-white text-gray-900'
              }`}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="deactivated">Deactivated</option>
            </select>
            <button className={`p-2 transition-colors ${
              isDark 
                ? 'text-gray-400 hover:text-gray-200' 
                : 'text-gray-500 hover:text-gray-700'
            }`}>
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className={`rounded-2xl shadow-lg border overflow-hidden transition-colors duration-300 ${
        isDark 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`transition-colors duration-300 ${
              isDark ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-300 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  User
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-300 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Status
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-300 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Transactions
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-300 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Accounts
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-300 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Last Login
                </th>
                <th className={`px-6 py-3 text-right text-xs font-medium uppercase tracking-wider transition-colors duration-300 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y transition-colors duration-300 ${
              isDark ? 'divide-gray-700' : 'divide-gray-200'
            }`}>
              {filteredUsers.map((user) => (
                <motion.tr
                  key={user.id}
                  className={`transition-colors duration-200 ${
                    isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {user.first_name?.[0]}{user.last_name?.[0]}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className={`text-sm font-medium transition-colors duration-300 ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          {user.first_name} {user.last_name}
                        </div>
                        <div className={`text-sm transition-colors duration-300 ${
                          isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {user.total_transactions || 0}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {user.total_accounts || 0}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm transition-colors duration-300 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {user.last_login ? new Date(user.last_login).toLocaleDateString() : 'Never'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowUserModal(true);
                        }}
                        className={`transition-colors ${
                          isDark 
                            ? 'text-emerald-400 hover:text-emerald-300' 
                            : 'text-emerald-600 hover:text-emerald-900'
                        }`}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleUserAction(user.id, user.status === 'active' ? 'suspend' : 'activate')}
                        className={user.status === 'active' ? 'text-yellow-600 hover:text-yellow-900' : 'text-emerald-600 hover:text-emerald-900'}
                      >
                        {user.status === 'active' ? <Ban className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleUserAction(user.id, 'delete')}
                        className={`transition-colors ${
                          isDark 
                            ? 'text-red-400 hover:text-red-300' 
                            : 'text-red-600 hover:text-red-900'
                        }`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Modal */}
      {showUserModal && selectedUser && (
        <UserModal
          user={selectedUser}
          onClose={() => {
            setShowUserModal(false);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
};

export default UserManagement;
