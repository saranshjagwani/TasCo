import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Home, LogOut, Menu, X } from 'lucide-react'; // Or any icon lib you're using

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const currentPage = location.pathname.includes('register')
    ? 'register'
    : location.pathname.includes('tasks')
    ? 'tasks'
    : 'login';

  const onNavigate = (page) => {
    navigate(`/${page}`);
  };

  const onLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-8 w-8 text-white" />
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Tasco
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {currentPage === 'tasks' && (
              <>
                <button
                  onClick={() => onNavigate('tasks')}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200"
                >
                  <Home className="h-4 w-4" />
                  <span>Tasks</span>
                </button>
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-red-500/20 transition-all duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            )}

            {(currentPage === 'login' || currentPage === 'register') && (
              <div className="flex space-x-4">
                <button
                  onClick={() => onNavigate('login')}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                    currentPage === 'login' ? 'bg-white/20 backdrop-blur-sm' : 'hover:bg-white/10'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => onNavigate('register')}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                    currentPage === 'register' ? 'bg-white/20 backdrop-blur-sm' : 'hover:bg-white/10'
                  }`}
                >
                  Register
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-white/20 transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-white/20 mt-2 pt-4 space-y-2">
            {currentPage === 'tasks' ? (
              <>
                <button
                  onClick={() => {
                    onNavigate('tasks');
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 w-full px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm"
                >
                  <Home className="h-4 w-4" />
                  <span>Tasks</span>
                </button>
                <button
                  onClick={() => {
                    onLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 w-full px-4 py-2 rounded-lg hover:bg-red-500/20"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    onNavigate('login');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full px-4 py-2 rounded-lg text-left transition-all duration-200 ${
                    currentPage === 'login' ? 'bg-white/20 backdrop-blur-sm' : 'hover:bg-white/10'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    onNavigate('register');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full px-4 py-2 rounded-lg text-left transition-all duration-200 ${
                    currentPage === 'register' ? 'bg-white/20 backdrop-blur-sm' : 'hover:bg-white/10'
                  }`}
                >
                  Register
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
