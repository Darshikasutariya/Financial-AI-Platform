import React, { useState } from 'react';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Edit,
    Save,
    X,
    Camera,
    ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = ({ isDark }) => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        firstName: 'Alex',
        lastName: 'Johnson',
        email: 'alex.johnson@example.com',
        phone: '+1 (555) 123-4567',
        address: 'San Francisco, CA',
        joinDate: 'January 2023',
        bio: 'Finance enthusiast and tech professional passionate about personal financial management and investment strategies.'
    });

    const [tempData, setTempData] = useState(profileData);

    const handleSave = () => {
        setProfileData(tempData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setTempData(profileData);
        setIsEditing(false);
    };

    const handleInputChange = (field, value) => {
        setTempData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Theme-based styling functions
    const getBackgroundStyle = () => isDark ? 'bg-gray-950' : 'bg-gray-50';
    const getCardStyle = () => isDark
        ? 'bg-gray-900 border-gray-800'
        : 'bg-white border-gray-200 shadow-lg';
    const getTextPrimaryStyle = () => isDark ? 'text-white' : 'text-gray-900';
    const getTextSecondaryStyle = () => isDark ? 'text-gray-400' : 'text-gray-600';
    const getInputStyle = () => isDark
        ? 'bg-gray-800 border-gray-700 text-white'
        : 'bg-white border-gray-300 text-gray-900';
    const getHoverStyle = () => isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100';

    return (
        <div className={`min-h-screen transition-colors duration-300 ${getBackgroundStyle()}`}>
            {/* Header */}
            <div className="max-w-4xl mx-auto px-6 py-8">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => navigate(-1)}
                            className={`p-2 rounded-xl transition-colors duration-200 ${getHoverStyle()}`}
                        >
                            <ArrowLeft className={`w-6 h-6 ${getTextSecondaryStyle()}`} />
                        </button>
                        <div>
                            <h1 className={`text-3xl font-bold ${getTextPrimaryStyle()}`}>
                                Profile
                            </h1>
                            <p className={`text-sm ${getTextSecondaryStyle()}`}>
                                Manage your account information
                            </p>
                        </div>
                    </div>

                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors duration-200"
                        >
                            <Edit className="w-4 h-4" />
                            <span>Edit Profile</span>
                        </button>
                    ) : (
                        <div className="flex space-x-3">
                            <button
                                onClick={handleCancel}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-colors duration-200 ${isDark
                                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                <X className="w-4 h-4" />
                                <span>Cancel</span>
                            </button>
                            <button
                                onClick={handleSave}
                                className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition-colors duration-200"
                            >
                                <Save className="w-4 h-4" />
                                <span>Save</span>
                            </button>
                        </div>
                    )}
                </div>

                {/* Profile Card */}
                <div className={`rounded-2xl border transition-colors duration-300 ${getCardStyle()}`}>
                    {/* Profile Header */}
                    <div className="p-8 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-6">
                            <div className="relative">
                                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                    {profileData.firstName[0]}{profileData.lastName[0]}
                                </div>
                                {isEditing && (
                                    <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                                        <Camera className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                            <div className="flex-1">
                                <h2 className={`text-2xl font-bold ${getTextPrimaryStyle()}`}>
                                    {profileData.firstName} {profileData.lastName}
                                </h2>
                                <p className={`${getTextSecondaryStyle()} mt-1`}>
                                    Member since {profileData.joinDate}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="p-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Personal Information */}
                            <div className="space-y-6">
                                <h3 className={`text-lg font-semibold ${getTextPrimaryStyle()}`}>
                                    Personal Information
                                </h3>

                                <div className="space-y-4">
                                    {/* First Name */}
                                    <div>
                                        <label className={`block text-sm font-medium ${getTextSecondaryStyle()} mb-2`}>
                                            First Name
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={tempData.firstName}
                                                onChange={(e) => handleInputChange('firstName', e.target.value)}
                                                className={`w-full px-4 py-3 rounded-xl border transition-colors duration-200 ${getInputStyle()}`}
                                            />
                                        ) : (
                                            <div className={`flex items-center space-x-3 p-3 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-gray-50'
                                                }`}>
                                                <User className={`w-5 h-5 ${getTextSecondaryStyle()}`} />
                                                <span className={getTextPrimaryStyle()}>{profileData.firstName}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Last Name */}
                                    <div>
                                        <label className={`block text-sm font-medium ${getTextSecondaryStyle()} mb-2`}>
                                            Last Name
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={tempData.lastName}
                                                onChange={(e) => handleInputChange('lastName', e.target.value)}
                                                className={`w-full px-4 py-3 rounded-xl border transition-colors duration-200 ${getInputStyle()}`}
                                            />
                                        ) : (
                                            <div className={`flex items-center space-x-3 p-3 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-gray-50'
                                                }`}>
                                                <User className={`w-5 h-5 ${getTextSecondaryStyle()}`} />
                                                <span className={getTextPrimaryStyle()}>{profileData.lastName}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className={`block text-sm font-medium ${getTextSecondaryStyle()} mb-2`}>
                                            Email Address
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="email"
                                                value={tempData.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                className={`w-full px-4 py-3 rounded-xl border transition-colors duration-200 ${getInputStyle()}`}
                                            />
                                        ) : (
                                            <div className={`flex items-center space-x-3 p-3 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-gray-50'
                                                }`}>
                                                <Mail className={`w-5 h-5 ${getTextSecondaryStyle()}`} />
                                                <span className={getTextPrimaryStyle()}>{profileData.email}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="space-y-6">
                                <h3 className={`text-lg font-semibold ${getTextPrimaryStyle()}`}>
                                    Contact Information
                                </h3>

                                <div className="space-y-4">
                                    {/* Phone */}
                                    <div>
                                        <label className={`block text-sm font-medium ${getTextSecondaryStyle()} mb-2`}>
                                            Phone Number
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="tel"
                                                value={tempData.phone}
                                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                                className={`w-full px-4 py-3 rounded-xl border transition-colors duration-200 ${getInputStyle()}`}
                                            />
                                        ) : (
                                            <div className={`flex items-center space-x-3 p-3 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-gray-50'
                                                }`}>
                                                <Phone className={`w-5 h-5 ${getTextSecondaryStyle()}`} />
                                                <span className={getTextPrimaryStyle()}>{profileData.phone}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Address */}
                                    <div>
                                        <label className={`block text-sm font-medium ${getTextSecondaryStyle()} mb-2`}>
                                            Address
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={tempData.address}
                                                onChange={(e) => handleInputChange('address', e.target.value)}
                                                className={`w-full px-4 py-3 rounded-xl border transition-colors duration-200 ${getInputStyle()}`}
                                            />
                                        ) : (
                                            <div className={`flex items-center space-x-3 p-3 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-gray-50'
                                                }`}>
                                                <MapPin className={`w-5 h-5 ${getTextSecondaryStyle()}`} />
                                                <span className={getTextPrimaryStyle()}>{profileData.address}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Join Date */}
                                    <div>
                                        <label className={`block text-sm font-medium ${getTextSecondaryStyle()} mb-2`}>
                                            Member Since
                                        </label>
                                        <div className={`flex items-center space-x-3 p-3 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-gray-50'
                                            }`}>
                                            <Calendar className={`w-5 h-5 ${getTextSecondaryStyle()}`} />
                                            <span className={getTextPrimaryStyle()}>{profileData.joinDate}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bio Section */}
                        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                            <h3 className={`text-lg font-semibold ${getTextPrimaryStyle()} mb-4`}>
                                About
                            </h3>
                            {isEditing ? (
                                <textarea
                                    value={tempData.bio}
                                    onChange={(e) => handleInputChange('bio', e.target.value)}
                                    rows={4}
                                    className={`w-full px-4 py-3 rounded-xl border transition-colors duration-200 ${getInputStyle()}`}
                                    placeholder="Tell us about yourself..."
                                />
                            ) : (
                                <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-gray-50'
                                    }`}>
                                    <p className={getTextPrimaryStyle()}>
                                        {profileData.bio || 'No bio added yet.'}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
