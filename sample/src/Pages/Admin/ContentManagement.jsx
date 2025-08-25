import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Send,
  FileText,
  Megaphone,
  Save,
  XCircle
} from 'lucide-react';
import { mockStaticContent, mockAnnouncements } from '../../data/mokeAdminData'

const ContentManagement = ({isDark}) => {
  const [activeTab, setActiveTab] = useState('static');
  const [staticContent, setStaticContent] = useState(mockStaticContent);
  const [announcements, setAnnouncements] = useState(mockAnnouncements);
  const [searchTerm, setSearchTerm] = useState('');
  const [showContentModal, setShowContentModal] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [editingContent, setEditingContent] = useState(null);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);

  const handleContentAction = (contentId, action) => {
    if (action === 'delete') {
      if (window.confirm('Are you sure you want to delete this content?')) {
        setStaticContent(staticContent.filter(content => content.id !== contentId));
      }
    } else if (action === 'edit') {
      const content = staticContent.find(c => c.id === contentId);
      if (content) {
        setEditingContent(content);
        setShowContentModal(true);
      }
    }
  };

  const handleAnnouncementAction = (announcementId, action) => {
    if (action === 'delete') {
      if (window.confirm('Are you sure you want to delete this announcement?')) {
        setAnnouncements(announcements.filter(ann => ann.id !== announcementId));
      }
    } else if (action === 'edit') {
      const announcement = announcements.find(a => a.id === announcementId);
      if (announcement) {
        setEditingAnnouncement(announcement);
        setShowAnnouncementModal(true);
      }
    } else if (action === 'toggle') {
      setAnnouncements(announcements.map(ann => 
        ann.id === announcementId ? { ...ann, is_active: !ann.is_active } : ann
      ));
    }
  };

  const ContentModal = ({ content, onClose, onSave }) => {
    const [formData, setFormData] = useState({
      page: content?.page || '',
      section: content?.section || '',
      title: content?.title || '',
      content: content?.content || ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
      onClose();
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <motion.div
          className={`rounded-2xl p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto transition-colors duration-300 ${
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
              {content ? 'Edit Content' : 'Add Content'}
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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Page
                </label>
                <input
                  type="text"
                  value={formData.page}
                  onChange={(e) => setFormData({ ...formData, page: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg transition-colors duration-300 ${
                    isDark 
                      ? 'border-gray-600 bg-gray-700 text-white' 
                      : 'border-gray-300 bg-white text-gray-900'
                  }`}
                  placeholder="e.g., about, privacy, terms"
                  required
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Section
                </label>
                <input
                  type="text"
                  value={formData.section}
                  onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg transition-colors duration-300 ${
                    isDark 
                      ? 'border-gray-600 bg-gray-700 text-white' 
                      : 'border-gray-300 bg-white text-gray-900'
                  }`}
                  placeholder="e.g., hero, main, footer"
                  required
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                Content
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={10}
                className={`w-full px-3 py-2 border rounded-lg transition-colors duration-300 ${
                  isDark 
                    ? 'border-gray-600 bg-gray-700 text-white' 
                    : 'border-gray-300 bg-white text-gray-900'
                }`}
                required
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                <Save className="w-4 h-4 mr-2" />
                {content ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
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

  const AnnouncementModal = ({ announcement, onClose, onSave }) => {
    const [formData, setFormData] = useState({
      title: announcement?.title || '',
      content: announcement?.content || '',
      type: announcement?.type || 'info',
      target_audience: announcement?.target_audience || 'all',
      expires_at: announcement?.expires_at ? announcement.expires_at.split('T')[0] : ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave({
        ...formData,
        expires_at: formData.expires_at ? new Date(formData.expires_at).toISOString() : undefined
      });
      onClose();
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <motion.div
          className={`rounded-2xl p-6 w-full max-w-2xl mx-4 transition-colors duration-300 ${
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
              {announcement ? 'Edit Announcement' : 'Create Announcement'}
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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                Content
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={4}
                className={`w-full px-3 py-2 border rounded-lg transition-colors duration-300 ${
                  isDark 
                    ? 'border-gray-600 bg-gray-700 text-white' 
                    : 'border-gray-300 bg-white text-gray-900'
                }`}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
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
                  <option value="info">Info</option>
                  <option value="warning">Warning</option>
                  <option value="success">Success</option>
                  <option value="error">Error</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Target Audience
                </label>
                <select
                  value={formData.target_audience}
                  onChange={(e) => setFormData({ ...formData, target_audience: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg transition-colors duration-300 ${
                    isDark 
                      ? 'border-gray-600 bg-gray-700 text-white' 
                      : 'border-gray-300 bg-white text-gray-900'
                  }`}
                >
                  <option value="all">All Users</option>
                  <option value="premium">Premium Users</option>
                  <option value="free">Free Users</option>
                </select>
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Expires At (Optional)
              </label>
              <input
                type="date"
                value={formData.expires_at}
                onChange={(e) => setFormData({ ...formData, expires_at: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg transition-colors duration-300 ${
                  isDark 
                    ? 'border-gray-600 bg-gray-700 text-white' 
                    : 'border-gray-300 bg-white text-gray-900'
                }`}
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                <Send className="w-4 h-4 mr-2" />
                {announcement ? 'Update' : 'Send'} Announcement
              </button>
              <button
                type="button"
                onClick={onClose}
                className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
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

  const getAnnouncementTypeColor = (type) => {
    switch (type) {
      case 'info':
        return isDark 
          ? 'bg-blue-900/50 text-blue-400' 
          : 'bg-blue-100 text-blue-800';
      case 'warning':
        return isDark 
          ? 'bg-yellow-900/50 text-yellow-400' 
          : 'bg-yellow-100 text-yellow-800';
      case 'success':
        return isDark 
          ? 'bg-emerald-900/50 text-emerald-400' 
          : 'bg-emerald-100 text-emerald-800';
      case 'error':
        return isDark 
          ? 'bg-red-900/50 text-red-400' 
          : 'bg-red-100 text-red-800';
      default:
        return isDark 
          ? 'bg-gray-900/50 text-gray-400' 
          : 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-3xl font-bold transition-colors duration-300 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          Content Management
        </h1>
        <p className={`mt-2 transition-colors duration-300 ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Manage static content, announcements, and blog posts
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
            onClick={() => setActiveTab('static')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'static'
                ? isDark
                  ? 'bg-gray-600 text-white shadow-sm'
                  : 'bg-white text-gray-900 shadow-sm'
                : isDark
                ? 'text-gray-400 hover:text-gray-300'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Static Content ({staticContent.length})
          </button>
          <button
            onClick={() => setActiveTab('announcements')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'announcements'
                ? isDark
                  ? 'bg-gray-600 text-white shadow-sm'
                  : 'bg-white text-gray-900 shadow-sm'
                : isDark
                ? 'text-gray-400 hover:text-gray-300'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Announcements ({announcements.length})
          </button>
          <button
            onClick={() => setActiveTab('blog')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'blog'
                ? isDark
                  ? 'bg-gray-600 text-white shadow-sm'
                  : 'bg-white text-gray-900 shadow-sm'
                : isDark
                ? 'text-gray-400 hover:text-gray-300'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Blog Posts (Coming Soon)
          </button>
        </div>
      </div>

      {/* Static Content Tab */}
      {activeTab === 'static' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 pr-4 py-2 border rounded-lg transition-colors duration-300 ${
                  isDark 
                    ? 'border-gray-600 bg-gray-700 text-white' 
                    : 'border-gray-300 bg-white text-gray-900'
                }`}
              />
            </div>
            <button
              onClick={() => {
                setEditingContent(null);
                setShowContentModal(true);
              }}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Content
            </button>
          </div>

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
                      Page/Section
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-300 ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Title
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-300 ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Last Updated
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
                  {staticContent
                    .filter(content => 
                      content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      content.page.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((content) => (
                      <tr key={content.id} className={`transition-colors duration-200 ${
                        isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                      }`}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className={`text-sm font-medium transition-colors duration-300 ${
                              isDark ? 'text-white' : 'text-gray-900'
                            }`}>
                              {content.page}
                            </div>
                            <div className={`text-sm transition-colors duration-300 ${
                              isDark ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                              {content.section}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`text-sm font-medium transition-colors duration-300 ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}>
                            {content.title}
                          </div>
                          <div className={`text-sm truncate max-w-xs transition-colors duration-300 ${
                            isDark ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {content.content}
                          </div>
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm transition-colors duration-300 ${
                          isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {new Date(content.updated_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => handleContentAction(content.id, 'edit')}
                              className={`transition-colors ${
                                isDark 
                                  ? 'text-emerald-400 hover:text-emerald-300' 
                                  : 'text-emerald-600 hover:text-emerald-900'
                              }`}
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleContentAction(content.id, 'delete')}
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
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Announcements Tab */}
      {activeTab === 'announcements' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search announcements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 pr-4 py-2 border rounded-lg transition-colors duration-300 ${
                  isDark 
                    ? 'border-gray-600 bg-gray-700 text-white' 
                    : 'border-gray-300 bg-white text-gray-900'
                }`}
              />
            </div>
            <button
              onClick={() => {
                setEditingAnnouncement(null);
                setShowAnnouncementModal(true);
              }}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
            >
              <Megaphone className="w-4 h-4 mr-2" />
              Create Announcement
            </button>
          </div>

          <div className="grid gap-6">
            {announcements
              .filter(announcement => 
                announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                announcement.content.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((announcement, index) => (
                <motion.div
                  key={announcement.id}
                  className={`rounded-2xl p-6 shadow-lg border transition-colors duration-300 ${
                    isDark 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-200'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className={`text-lg font-semibold transition-colors duration-300 ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          {announcement.title}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAnnouncementTypeColor(announcement.type)}`}>
                          {announcement.type}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          announcement.is_active
                            ? isDark
                              ? 'bg-emerald-900/50 text-emerald-400'
                              : 'bg-emerald-100 text-emerald-800'
                            : isDark
                            ? 'bg-gray-900/50 text-gray-400'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {announcement.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <p className={`mb-4 transition-colors duration-300 ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {announcement.content}
                      </p>
                      <div className={`flex items-center space-x-4 text-sm transition-colors duration-300 ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        <span>Target: {announcement.target_audience}</span>
                        <span>Created: {new Date(announcement.created_at).toLocaleDateString()}</span>
                        {announcement.expires_at && (
                          <span>Expires: {new Date(announcement.expires_at).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-6">
                      <button
                        onClick={() => handleAnnouncementAction(announcement.id, 'toggle')}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                          announcement.is_active
                            ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                            : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                        }`}
                      >
                        {announcement.is_active ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => handleAnnouncementAction(announcement.id, 'edit')}
                        className={`p-2 transition-colors ${
                          isDark 
                            ? 'text-gray-400 hover:text-gray-300' 
                            : 'text-gray-400 hover:text-gray-600'
                        }`}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleAnnouncementAction(announcement.id, 'delete')}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      )}

      {/* Blog Tab */}
      {activeTab === 'blog' && (
        <div className={`rounded-2xl p-12 shadow-lg border text-center transition-colors duration-300 ${
          isDark 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Blog Management Coming Soon
          </h3>
          <p className={`transition-colors duration-300 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Blog post management features will be available in the next update.
          </p>
        </div>
      )}

      {/* Modals */}
      {showContentModal && (
        <ContentModal
          content={editingContent}
          onClose={() => {
            setShowContentModal(false);
            setEditingContent(null);
          }}
          onSave={(contentData) => {
            if (editingContent) {
              setStaticContent(staticContent.map(content => 
                content.id === editingContent.id 
                  ? { ...content, ...contentData, updated_at: new Date().toISOString() }
                  : content
              ));
            } else {
              const newContent = {
                id: Date.now().toString(),
                ...contentData,
                updated_at: new Date().toISOString(),
                updated_by: 'admin@financeai.com'
              };
              setStaticContent([...staticContent, newContent]);
            }
          }}
        />
      )}

      {showAnnouncementModal && (
        <AnnouncementModal
          announcement={editingAnnouncement}
          onClose={() => {
            setShowAnnouncementModal(false);
            setEditingAnnouncement(null);
          }}
          onSave={(announcementData) => {
            if (editingAnnouncement) {
              setAnnouncements(announcements.map(ann => 
                ann.id === editingAnnouncement.id 
                  ? { ...ann, ...announcementData }
                  : ann
              ));
            } else {
              const newAnnouncement = {
                id: Date.now().toString(),
                ...announcementData,
                is_active: true,
                created_at: new Date().toISOString(),
                created_by: 'admin@financeai.com'
              };
              setAnnouncements([newAnnouncement, ...announcements]);
            }
          }}
        />
      )}
    </div>
  );
};

export default ContentManagement;
