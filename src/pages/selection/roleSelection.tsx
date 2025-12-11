// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { User, Eye, Edit, FileCheck, LogOut, Crown } from 'lucide-react';

// const RoleSelection = () => {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem('user'));

//   // Backend ke according available roles check karo
//   const getAvailableRoles = () => {
//     const roles = [];
//     const userRoles = user?.roles || {};
    
//     if (userRoles.author) roles.push('author');
//     if (userRoles.reviewer) roles.push('reviewer');
//     if (userRoles.editor) roles.push('editor');
//     if (userRoles.editorInChief) roles.push('editorInChief');
    
//     // Viewer role sabko milti hai
//     roles.push('viewer');
    
//     return roles;
//   };

//   const availableRoles = getAvailableRoles();

//   const handleRoleSelect = (role) => {
//     localStorage.setItem('currentRole', role);
    
//     switch(role) {
//       case 'author':
//         navigate('/author-dashboard');
//         break;
//       case 'reviewer':
//         navigate('/reviewer-dashboard');
//         break;
//       case 'editor':
//         navigate('/editor-dashboard');
//         break;
//       case 'editorInChief':
//         navigate('/admin-dashboard');
//         break;
//       case 'viewer':
//         navigate('/');
//         break;
//       default:
//         navigate('/');
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     localStorage.removeItem('currentRole');
//     navigate('/login');
//   };

//   const getRoleConfig = (role) => {
//     const config = {
//       author: {
//         title: 'Author',
//         icon: User,
//         description: 'Submit and manage your research manuscripts, track submission status',
//         color: 'blue',
//         buttonText: 'Enter as Author'
//       },
//       reviewer: {
//         title: 'Reviewer',
//         icon: FileCheck,
//         description: 'Review assigned manuscripts, provide feedback and recommendations',
//         color: 'green',
//         buttonText: 'Enter as Reviewer'
//       },
//       editor: {
//         title: 'Editor',
//         icon: Edit,
//         description: 'Manage manuscript workflow, assign reviewers, make editorial decisions',
//         color: 'purple',
//         buttonText: 'Enter as Editor'
//       },
//       editorInChief: {
//         title: 'Editor-in-Chief',
//         icon: Crown,
//         description: 'Overall system administration, user management, and final decisions',
//         color: 'red',
//         buttonText: 'Enter as Editor-in-Chief'
//       },
//       viewer: {
//         title: 'Viewer',
//         icon: Eye,
//         description: 'Browse published articles, read research papers, explore journal content',
//         color: 'gray',
//         buttonText: 'Enter as Viewer'
//       }
//     };
    
//     return config[role] || config.viewer;
//   };

//   const getColorClasses = (color) => {
//     const colors = {
//       blue: { border: 'border-blue-200', bg: 'bg-blue-100', text: 'text-blue-600', button: 'bg-blue-600 hover:bg-blue-700' },
//       green: { border: 'border-green-200', bg: 'bg-green-100', text: 'text-green-600', button: 'bg-green-600 hover:bg-green-700' },
//       purple: { border: 'border-purple-200', bg: 'bg-purple-100', text: 'text-purple-600', button: 'bg-purple-600 hover:bg-purple-700' },
//       red: { border: 'border-red-200', bg: 'bg-red-100', text: 'text-red-600', button: 'bg-red-600 hover:bg-red-700' },
//       gray: { border: 'border-gray-200', bg: 'bg-gray-100', text: 'text-gray-600', button: 'bg-gray-600 hover:bg-gray-700' }
//     };
    
//     return colors[color] || colors.gray;
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-4xl">
//         {/* Header */}
//         <div className="mb-12 text-center">
//           <h1 className="mb-4 text-3xl font-bold text-gray-900">
//             Welcome back, {user?.firstName}!
//           </h1>
//           <p className="text-lg text-gray-600">
//             Choose how you want to access the system
//           </p>
//           <div className="mt-2 text-sm text-gray-500">
//             Available roles based on your permissions
//           </div>
//         </div>

//         {/* Role Selection Cards - Only show available roles */}
//         <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {availableRoles.map(role => {
//             const config = getRoleConfig(role);
//             const Icon = config.icon;
//             const colors = getColorClasses(config.color);
            
//             return (
//               <div 
//                 key={role} 
//                 className={`bg-white rounded-lg shadow-md p-6 border ${colors.border} hover:shadow-lg transition-shadow`}
//               >
//                 <div className="mb-4 flex items-center gap-3">
//                   <div className={`p-3 rounded-full ${colors.bg}`}>
//                     <Icon className={colors.text} size={24} />
//                   </div>
//                   <h3 className="text-xl font-semibold text-gray-900">{config.title}</h3>
//                 </div>
//                 <p className="mb-4 text-gray-600">
//                   {config.description}
//                 </p>
//                 <button
//                   onClick={() => handleRoleSelect(role)}
//                   className={`w-full text-white py-2 px-4 rounded-md transition-colors ${colors.button}`}
//                 >
//                   {config.buttonText}
//                 </button>
//               </div>
//             );
//           })}
//         </div>

//         {/* User Info */}
//         <div className="mb-6 rounded-lg bg-white p-6 text-center">
//           <h3 className="mb-2 text-lg font-semibold">Your Account Information</h3>
//           <p className="text-gray-600">
//             <strong>Name:</strong> {user?.firstName} {user?.lastName} | 
//             <strong> Email:</strong> {user?.email} | 
//             <strong> Affiliation:</strong> {user?.profile?.affiliation || 'Not specified'}
//           </p>
//         </div>

//         {/* Logout Button */}
//         <div className="text-center">
//           <button
//             onClick={handleLogout}
//             className="mx-auto flex items-center gap-2 text-red-600 hover:text-red-700"
//           >
//             <LogOut size={18} />
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RoleSelection;





// src/pages/selection/roleSelection.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const RoleCard = ({ title, description, primaryText, onClick, disabled }) => (
  <div
    className={`border rounded-md p-6 shadow-sm w-full max-w-sm ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
  >
    <div className="mb-2 text-lg font-semibold">{title}</div>
    <p className="mb-4 text-sm text-gray-600">{description}</p>
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded ${disabled ? 'bg-gray-300 text-gray-600' : 'bg-blue-600 text-white'}`}
    >
      {primaryText}
    </button>
  </div>
);

export default function RoleSelection() {
  const { user, getAvailableRoles, setRole, hasRole } = useAuth();
  const navigate = useNavigate();

  const roles = getAvailableRoles(); // e.g. ['author','reviewer','editor']
  const available = roles.length ? roles : []; // no fallback viewer for logged-in users

  const handleChoose = (role) => {
    setRole(role);
    if (role === 'author') navigate('/author-dashboard');
    else if (role === 'reviewer') navigate('/reviewer-dashboard');
    else if (role === 'editor' || role === 'editorInChief' || role === 'admin') navigate('/editor-dashboard');
    else navigate('/');
  };

  const showAuthor = available.includes('author');
  const showReviewer = available.includes('reviewer');
  const showEditor = available.includes('editor') || available.includes('editorInChief') || available.includes('admin');

  // Guest (not logged in) behaviour: show viewer card so public can browse
  const isGuest = !user;

  return (
    <div className="px-6 py-12">
      <h1 className="mb-6 text-3xl font-bold">Choose how you want to access the system</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {showAuthor && (
          <RoleCard
            title="Author"
            description="Submit and manage your manuscripts, track submission status."
            primaryText="Enter as Author"
            onClick={() => handleChoose('author')}
            disabled={false}
          />
        )}

        {showReviewer && (
          <RoleCard
            title="Reviewer"
            description="Review manuscripts assigned to you and submit review reports."
            primaryText="Enter as Reviewer"
            onClick={() => handleChoose('reviewer')}
            disabled={false}
          />
        )}

        {showEditor && (
          <RoleCard
            title="Editor"
            description="Manage manuscripts, assign reviewers and make editorial decisions."
            primaryText="Enter as Editor"
            onClick={() => handleChoose('editor')}
            disabled={false}
          />
        )}

        {/* If guest (not logged in) show Viewer card so public can browse */}
        {isGuest && (
          <RoleCard
            title="Viewer"
            description="Browse published articles and read research papers."
            primaryText="Continue as Guest"
            onClick={() => handleChoose('viewer')}
            disabled={false}
          />
        )}
      </div>

      {/* If logged-in user doesn't have reviewer role but is an author, show CTA to request reviewer role */}
      {!isGuest && !showReviewer && hasRole('author') && (
        <div className="mt-8 text-sm text-gray-700">
          Want to be a reviewer?{' '}
          <button
            className="text-blue-600 underline"
            onClick={() => {
              // replace alert with real API or modal flow later
              alert('Request sent to admin (implement API).');
            }}
          >
            Request reviewer role
          </button>
        </div>
      )}

      {/* If logged-in user has no roles at all (rare), give a fallback message */}
      {!isGuest && available.length === 0 && (
        <div className="mt-8 text-sm text-gray-700">
          No roles available for your account. Contact admin if you think this is an error.
        </div>
      )}
    </div>
  );
}
