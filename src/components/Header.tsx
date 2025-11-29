// import React from 'react';
// import { HelpCircle, Search, User, LogIn } from 'lucide-react';
// import {Link } from 'react-router-dom';

// const Header: React.FC = () => {


//   return (
//     <header className="border-b border-gray-200 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="flex h-16 items-center justify-between">
//           {/* Left Side */}
//           <div className="flex items-center gap-6">
//             <a href="#" className="text-lg font-bold tracking-wider text-brand-orange">ELSEVIER</a>
//             <a href="#" className="flex items-center gap-2">
//               <img src="https://www.sciencedirect.com/assets/search/shared/logo-sd.svg" alt="ScienceDirect Logo" className="h-6" />
//             </a>
//           </div>

//           {/* Right Side */}
//           <div className="hidden items-center space-x-6 text-sm font-medium md:flex">
//             <a href="#" className="flex items-center gap-1 text-gray-600 hover:text-brand-blue">
//               Journals & Books
//             </a>
//             <a href="#" className="flex items-center gap-1 text-gray-600 hover:text-brand-blue">
//               <HelpCircle size={18} /> Help
//             </a>
//             <a href="#" className="flex items-center gap-1 text-gray-600 hover:text-brand-blue">
//               <Search size={18} /> Search
//             </a>



// {/*                 // COMMNENTED CODE


//             <a href="#" className="flex items-center gap-1 text-gray-600 hover:text-brand-blue">
//               <User size={18} /> My account
//             </a>


//             <a href="#" className="flex items-center gap-1 text-gray-600 hover:text-brand-blue">
//             <LogIn size={18} /> Sign in
//             </a>

// */}

            

//             {/* ADDED CODE MINE */}
            
//             <Link to='/signup'  className="flex items-center gap-1 text-gray-600 hover:text-brand-blue"><User size={18}></User>Create Account</Link>
//             <Link to='/login'  className="flex items-center gap-1 text-gray-600 hover:text-brand-blue"><LogIn size={18}></LogIn>Sign In</Link>


//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;




// Adding My Code - Final Full

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { User, LogIn, LogOut, HelpCircle, Search } from 'lucide-react';

// const Header = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [currentRole, setCurrentRole] = useState(null);

//   useEffect(() => {
//     const userData = localStorage.getItem('user');
//     const role = localStorage.getItem('currentRole');
    
//     if (userData) {
//       setUser(JSON.parse(userData));
//     }
//     if (role) {
//       setCurrentRole(role);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     localStorage.removeItem('currentRole');
//     setUser(null);
//     setCurrentRole(null);
//     navigate('/');
//     window.location.reload();
//   };

//   return (
//     <header className="border-b border-gray-200 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="flex h-16 items-center justify-between">
//           {/* Left Side */}
//           <div className="flex items-center gap-6">
//             <div className="text-lg font-bold tracking-wider text-brand-orange">ELSEVIER</div>
//             <div className="flex items-center gap-2">
//               <img src="https://www.sciencedirect.com/assets/search/shared/logo-sd.svg" alt="ScienceDirect Logo" className="h-6" />
//             </div>
//           </div>

//           {/* Right Side */}
//           <div className="hidden items-center space-x-6 text-sm font-medium md:flex">
//             <div className="flex cursor-pointer items-center gap-1 text-gray-600 hover:text-brand-blue">
//               Journals & Books
//             </div>
//             <div className="flex cursor-pointer items-center gap-1 text-gray-600 hover:text-brand-blue">
//               <HelpCircle size={18} /> Help
//             </div>
//             <div className="flex cursor-pointer items-center gap-1 text-gray-600 hover:text-brand-blue">
//               <Search size={18} /> Search
//             </div>

//             {user ? (
//               // ✅ Logged In - Show User Greeting + Current Role + Logout
//               <div className="flex items-center gap-4">
//                 <div className="flex items-center gap-1 text-gray-600">
//                   <User size={18} />
//                   <span>Hi, {user.firstName}</span>
//                   {currentRole && (
//                     <span className="ml-2 rounded bg-gray-100 px-2 py-1 text-xs">
//                       {currentRole}
//                     </span>
//                   )}
//                 </div>
//                 <button 
//                   onClick={handleLogout}
//                   className="flex items-center gap-1 text-gray-600 hover:text-red-600"
//                 >
//                   <LogOut size={18} /> Logout
//                 </button>
//               </div>
//             ) : (
//               // ❌ Not Logged In - Show SignUp/Login
//               <>
//                 <button 
//                   onClick={() => navigate('/signup')}
//                   className="flex items-center gap-1 text-gray-600 hover:text-brand-blue"
//                 >
//                   <User size={18} /> Create Account
//                 </button>
//                 <button 
//                   onClick={() => navigate('/login')}
//                   className="flex items-center gap-1 text-gray-600 hover:text-brand-blue"
//                 >
//                   <LogIn size={18} /> Sign In
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;





import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogIn, LogOut, HelpCircle, Search, Crown } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [currentRole, setCurrentRole] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const role = localStorage.getItem('currentRole');
    
    if (userData) {
      setUser(JSON.parse(userData));
    }
    if (role) {
      setCurrentRole(role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('currentRole');
    setUser(null);
    setCurrentRole(null);
    navigate('/');
    window.location.reload();
  };

  const getRoleDisplay = (role) => {
    const roleConfig = {
      author: { label: 'Author', color: 'bg-blue-100 text-blue-800 border-blue-200' },
      reviewer: { label: 'Reviewer', color: 'bg-green-100 text-green-800 border-green-200' },
      editor: { label: 'Editor', color: 'bg-purple-100 text-purple-800 border-purple-200' },
      editorInChief: { label: 'Editor-in-Chief', color: 'bg-red-100 text-red-800 border-red-200' },
      viewer: { label: 'Viewer', color: 'bg-gray-100 text-gray-800 border-gray-200' }
    };
    
    return roleConfig[role] || { label: role, color: 'bg-gray-100 text-gray-800 border-gray-200' };
  };

  const roleInfo = getRoleDisplay(currentRole);

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left Side */}
          <div className="flex items-center gap-6">
            <div className="text-lg font-bold tracking-wider text-brand-orange">ELSEVIER</div>
            <div className="flex items-center gap-2">
              <img src="https://www.sciencedirect.com/assets/search/shared/logo-sd.svg" alt="ScienceDirect Logo" className="h-6" />
            </div>
          </div>

          {/* Right Side */}
          <div className="hidden items-center space-x-6 text-sm font-medium md:flex">
            <div className="flex cursor-pointer items-center gap-1 text-gray-600 hover:text-brand-blue">
              Journals & Books
            </div>
            <div className="flex cursor-pointer items-center gap-1 text-gray-600 hover:text-brand-blue">
              <HelpCircle size={18} /> Help
            </div>
            <div className="flex cursor-pointer items-center gap-1 text-gray-600 hover:text-brand-blue">
              <Search size={18} /> Search
            </div>

            {user ? (
              // ✅ Logged In - Show User Greeting + Current Role + Logout
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  {currentRole === 'editorInChief' && <Crown size={16} className="text-red-600" />}
                  <User size={18} />
                  <span>Hi, {user.firstName}</span>
                  {currentRole && (
                    <span className={`text-xs px-2 py-1 rounded border ${roleInfo.color}`}>
                      {roleInfo.label}
                    </span>
                  )}
                </div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-gray-600 hover:text-red-600"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            ) : (
              // ❌ Not Logged In - Show SignUp/Login
              <>
                <button 
                  onClick={() => navigate('/signup')}
                  className="flex items-center gap-1 text-gray-600 hover:text-brand-blue"
                >
                  <User size={18} /> Create Account
                </button>
                <button 
                  onClick={() => navigate('/login')}
                  className="flex items-center gap-1 text-gray-600 hover:text-brand-blue"
                >
                  <LogIn size={18} /> Sign In
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;