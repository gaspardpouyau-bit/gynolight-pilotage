import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Calendar, Phone, MapPin, Edit2, Save, X } from 'lucide-react';

const UserProfile: React.FC = () => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);

    // Mock user data
    const [userData, setUserData] = useState({
        name: 'Marie Dupont',
        email: 'marie.dupont@email.com',
        phone: '+33 6 12 34 56 78',
        birthdate: '15/03/1985',
        address: 'Paris, France'
    });

    const [editedData, setEditedData] = useState({ ...userData });

    const handleSave = () => {
        setUserData({ ...editedData });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedData({ ...userData });
        setIsEditing(false);
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-white overflow-y-auto">
            {/* Header */}
            <div className="px-4 sm:px-6 pt-8 sm:pt-12 pb-4 sm:pb-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/settings')} className="p-3 hover:bg-pink-50 rounded-full transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center">
                        <ArrowLeft className="w-6 h-6 text-gray-700" />
                    </button>
                    <h1 className="text-lg sm:text-xl font-bold text-gray-800">Profil Utilisatrice</h1>
                </div>
                <div className="flex gap-2">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleCancel}
                                className="p-3 hover:bg-gray-100 rounded-full transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                            >
                                <X className="w-5 h-5 text-gray-600" />
                            </button>
                            <button
                                onClick={handleSave}
                                className="p-3 hover:bg-pink-50 rounded-full transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                            >
                                <Save className="w-5 h-5 text-pink-500" />
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="p-3 hover:bg-pink-50 rounded-full transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                        >
                            <Edit2 className="w-5 h-5 text-gray-600" />
                        </button>
                    )}
                </div>
            </div>

            <div className="px-4 sm:px-6 space-y-4 sm:space-y-6">
                {/* Profile Picture */}
                <div className="flex flex-col items-center py-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg">
                        <User className="w-12 h-12 text-white" />
                    </div>
                    {isEditing ? (
                        <input
                            type="text"
                            value={editedData.name}
                            onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                            className="text-xl font-bold text-gray-800 mt-4 text-center border-b-2 border-pink-300 focus:outline-none focus:border-pink-500 px-2"
                        />
                    ) : (
                        <h2 className="text-xl font-bold text-gray-800 mt-4">{userData.name}</h2>
                    )}
                    <p className="text-sm text-gray-500">Utilisatrice GYNOlight</p>
                </div>

                {/* User Information */}
                <section className="space-y-3">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Informations personnelles</h3>

                    {/* Email */}
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                        <Mail className="w-5 h-5 text-pink-500" />
                        <div className="flex-1">
                            <p className="text-xs text-gray-500 font-medium">Email</p>
                            {isEditing ? (
                                <input
                                    type="email"
                                    value={editedData.email}
                                    onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                                    className="text-sm font-semibold text-gray-800 w-full bg-transparent border-b border-pink-300 focus:outline-none focus:border-pink-500"
                                />
                            ) : (
                                <p className="text-sm font-semibold text-gray-800">{userData.email}</p>
                            )}
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                        <Phone className="w-5 h-5 text-pink-500" />
                        <div className="flex-1">
                            <p className="text-xs text-gray-500 font-medium">Téléphone</p>
                            {isEditing ? (
                                <input
                                    type="tel"
                                    value={editedData.phone}
                                    onChange={(e) => setEditedData({ ...editedData, phone: e.target.value })}
                                    className="text-sm font-semibold text-gray-800 w-full bg-transparent border-b border-pink-300 focus:outline-none focus:border-pink-500"
                                />
                            ) : (
                                <p className="text-sm font-semibold text-gray-800">{userData.phone}</p>
                            )}
                        </div>
                    </div>

                    {/* Birthdate */}
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                        <Calendar className="w-5 h-5 text-pink-500" />
                        <div className="flex-1">
                            <p className="text-xs text-gray-500 font-medium">Date de naissance</p>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={editedData.birthdate}
                                    onChange={(e) => setEditedData({ ...editedData, birthdate: e.target.value })}
                                    className="text-sm font-semibold text-gray-800 w-full bg-transparent border-b border-pink-300 focus:outline-none focus:border-pink-500"
                                />
                            ) : (
                                <p className="text-sm font-semibold text-gray-800">{userData.birthdate}</p>
                            )}
                        </div>
                    </div>

                    {/* Address */}
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                        <MapPin className="w-5 h-5 text-pink-500" />
                        <div className="flex-1">
                            <p className="text-xs text-gray-500 font-medium">Localisation</p>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={editedData.address}
                                    onChange={(e) => setEditedData({ ...editedData, address: e.target.value })}
                                    className="text-sm font-semibold text-gray-800 w-full bg-transparent border-b border-pink-300 focus:outline-none focus:border-pink-500"
                                />
                            ) : (
                                <p className="text-sm font-semibold text-gray-800">{userData.address}</p>
                            )}
                        </div>
                    </div>
                </section>

                {/* Medical Information */}
                <section className="space-y-3">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Informations médicales</h3>

                    <div className="p-5 bg-pink-50 rounded-2xl border border-pink-100">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-sm font-bold text-gray-700">Nombre de séances</span>
                            <span className="text-2xl font-bold text-pink-600">47</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-bold text-gray-700">Depuis</span>
                            <span className="text-sm font-semibold text-gray-600">Janvier 2024</span>
                        </div>
                    </div>
                </section>

                <div className="pb-8"></div>
            </div>
        </div>
    );
};

export default UserProfile;
