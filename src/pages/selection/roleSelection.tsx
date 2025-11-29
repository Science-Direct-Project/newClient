import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Eye, Edit, FileCheck, LogOut } from 'lucide-react';

const RoleSelection = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleRoleSelect = (role) => {
    // Store selected role in localStorage
    localStorage.setItem('currentRole', role);
    
    // Redirect based on role
    switch(role) {
      case 'author':
        navigate('/author-dashboard');
        break;
      case 'reviewer':
        navigate('/reviewer-dashboard');
        break;
      case 'editor':
        navigate('/editor-dashboard');
        break;
      default:
        navigate('/');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('currentRole');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-lg text-gray-600">
            Choose how you want to access the system
          </p>
        </div>

        {/* Role Selection Cards - TEMPORARY: All roles visible for testing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Author Role - Always visible for testing */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-blue-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <User className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Author</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Submit and manage your research manuscripts, track submission status
            </p>
            <button
              onClick={() => handleRoleSelect('author')}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Enter as Author
            </button>
          </div>

          {/* Reviewer Role - Always visible for testing */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-green-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <FileCheck className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Reviewer</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Review assigned manuscripts, provide feedback and recommendations
            </p>
            <button
              onClick={() => handleRoleSelect('reviewer')}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
            >
              Enter as Reviewer
            </button>
          </div>

          {/* Editor Role - Always visible for testing */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-purple-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <Edit className="text-purple-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Editor</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Manage manuscript workflow, assign reviewers, make editorial decisions
            </p>
            <button
              onClick={() => handleRoleSelect('editor')}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
            >
              Enter as Editor
            </button>
          </div>

          {/* Viewer Role (Default for all) */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gray-100 p-3 rounded-full">
                <Eye className="text-gray-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Viewer</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Browse published articles, read research papers, explore journal content
            </p>
            <button
              onClick={() => handleRoleSelect('viewer')}
              className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
            >
              Enter as Viewer
            </button>
          </div>
        </div>

        {/* Switch Role Button */}
        <div className="text-center mb-6">
          <button
            onClick={() => navigate('/role-selection')}
            className="text-blue-600 hover:text-blue-700 underline"
          >
            Switch Role
          </button>
        </div>

        {/* Logout Button */}
        <div className="text-center">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 mx-auto text-red-600 hover:text-red-700"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;