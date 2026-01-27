import React, { useState } from 'react';
import { ShieldCheck, Plus, LogOut } from 'lucide-react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import UserProfileDropdown from '../user/UserProfileDropdown';
import CreateTransactionModal from '../transaction/CreateTransactionModal.tsx';

const Layout: React.FC = () => {
    const { isAuthenticated, logout } = useAuth();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen flex flex-col bg-background selection:bg-accent selection:text-accent-foreground">
            <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-2 group">
                        <div className="bg-black text-white p-1 rounded-md group-hover:bg-accent group-hover:text-black transition-colors">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-black">PayShield</span>
                    </Link>

                    <div className="flex items-center gap-4">
                        {isAuthenticated ? (
                            <>
                                <button
                                    onClick={() => setIsCreateModalOpen(true)}
                                    className="flex items-center gap-2 text-sm font-medium px-4 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-all"
                                >
                                    <Plus className="w-4 h-4" />
                                    Create Transaction
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 text-sm font-medium px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:border-red-500 hover:text-red-600 hover:bg-red-50 transition-all"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </button>
                                <UserProfileDropdown />
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-sm font-medium hover:text-gray-600 transition-colors">Login</Link>
                                <Link to="/signup" className="text-sm font-medium px-5 py-2.5 border border-black rounded-lg hover:bg-black hover:text-white transition-all">Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            </header>

            <main className="flex-grow">
                <Outlet />
            </main>

            <footer className="bg-white border-t border-gray-100 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} PayShield. All rights reserved.
                </div>
            </footer>

            {/* Create Transaction Modal */}
            <CreateTransactionModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            />
        </div>
    );
};

export default Layout;
