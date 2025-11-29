// import React from 'react';
// import { HelpCircle, Search, User, LogIn } from 'lucide-react';
// import {Link } from 'react-router-dom';

// const Header: React.FC = () => {


//   return (
//     <header className="bg-white border-b border-gray-200">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center h-16">
//           {/* Left Side */}
//           <div className="flex items-center gap-6">
//             <a href="#" className="font-bold text-lg tracking-wider text-brand-orange">ELSEVIER</a>
//             <a href="#" className="flex items-center gap-2">
//               <img src="https://www.sciencedirect.com/assets/search/shared/logo-sd.svg" alt="ScienceDirect Logo" className="h-6" />
//             </a>
//           </div>

//           {/* Right Side */}
//           <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
//             <a href="#" className="text-gray-600 hover:text-brand-blue flex items-center gap-1">
//               Journals & Books
//             </a>
//             <a href="#" className="text-gray-600 hover:text-brand-blue flex items-center gap-1">
//               <HelpCircle size={18} /> Help
//             </a>
//             <a href="#" className="text-gray-600 hover:text-brand-blue flex items-center gap-1">
//               <Search size={18} /> Search
//             </a>



// {/*                 // COMMNENTED CODE


//             <a href="#" className="text-gray-600 hover:text-brand-blue flex items-center gap-1">
//               <User size={18} /> My account
//             </a>


//             <a href="#" className="text-gray-600 hover:text-brand-blue flex items-center gap-1">
//             <LogIn size={18} /> Sign in
//             </a>

// */}

            

//             {/* ADDED CODE MINE */}
            
//             <Link to='/signup'  className="text-gray-600 hover:text-brand-blue flex items-center gap-1"><User size={18}></User>Create Account</Link>
//             <Link to='/login'  className="text-gray-600 hover:text-brand-blue flex items-center gap-1"><LogIn size={18}></LogIn>Sign In</Link>


//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;




// Adding My Code - Final Full

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogIn, LogOut, HelpCircle, Search } from 'lucide-react';

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

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Left Side */}
          <div className="flex items-center gap-6">
            <div className="font-bold text-lg tracking-wider text-brand-orange">ELSEVIER</div>
            <div className="flex items-center gap-2">
              <img src="https://www.sciencedirect.com/assets/search/shared/logo-sd.svg" alt="ScienceDirect Logo" className="h-6" />
            </div>
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <div className="text-gray-600 hover:text-brand-blue flex items-center gap-1 cursor-pointer">
              Journals & Books
            </div>
            <div className="text-gray-600 hover:text-brand-blue flex items-center gap-1 cursor-pointer">
              <HelpCircle size={18} /> Help
            </div>
            <div className="text-gray-600 hover:text-brand-blue flex items-center gap-1 cursor-pointer">
              <Search size={18} /> Search
            </div>

            {user ? (
              // ✅ Logged In - Show User Greeting + Current Role + Logout
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-gray-600">
                  <User size={18} />
                  <span>Hi, {user.firstName}</span>
                  {currentRole && (
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded ml-2">
                      {currentRole}
                    </span>
                  )}
                </div>
                <button 
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-red-600 flex items-center gap-1"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            ) : (
              // ❌ Not Logged In - Show SignUp/Login
              <>
                <button 
                  onClick={() => navigate('/signup')}
                  className="text-gray-600 hover:text-brand-blue flex items-center gap-1"
                >
                  <User size={18} /> Create Account
                </button>
                <button 
                  onClick={() => navigate('/login')}
                  className="text-gray-600 hover:text-brand-blue flex items-center gap-1"
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