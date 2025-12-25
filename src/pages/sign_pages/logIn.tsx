import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../../services/api';

const LogIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [adminLogin, setAdminLogin] = useState(false);
  const [adminRole, setAdminRole] = useState<'editorInChief' | 'admin'>('editorInChief');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(formData);
      
      if (response.data.success) {
        const user = response.data.data.user;
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(user));

        // Admin/editor-in-chief fast path
        if (adminLogin) {
          const roles = user?.roles || {};
          const allowed = adminRole === 'editorInChief' ? roles.editorInChief : roles.admin;
          
          if (allowed) {
            localStorage.setItem('currentRole', adminRole);
            navigate('/admin-dashboard', { replace: true });
            return;
          }
        }

        window.location.href = '/role-selection';
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
            Sign up
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex items-center justify-between rounded-md border border-blue-200 bg-blue-50 px-4 py-3">
              <div>
                <p className="font-medium text-blue-900">Admin / Editor-in-Chief?</p>
                <p className="text-sm text-blue-700">Enable if you want to go straight to the admin dashboard.</p>
              </div>
              <label className="inline-flex items-center gap-2 text-sm font-medium text-blue-900">
                <input
                  type="checkbox"
                  checked={adminLogin}
                  onChange={(e) => setAdminLogin(e.target.checked)}
                  className="h-4 w-4 rounded border-blue-500 text-blue-600 focus:ring-blue-500"
                />
                Use admin login
              </label>
            </div>

            {adminLogin && (
              <div className="rounded-md border border-gray-200 bg-gray-50 p-4">
                <p className="mb-3 text-sm font-medium text-gray-800">Choose admin role</p>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="radio"
                      name="adminRole"
                      value="editorInChief"
                      checked={adminRole === 'editorInChief'}
                      onChange={() => setAdminRole('editorInChief')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    Editor-in-Chief (full administration)
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="radio"
                      name="adminRole"
                      value="admin"
                      checked={adminRole === 'admin'}
                      onChange={() => setAdminRole('admin')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    Admin (user management & assignments)
                  </label>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;