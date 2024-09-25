import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { navItems } from '../nav-items';
import { Menu, X } from 'lucide-react';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Budget Tracker</Link>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <ul className={`md:flex md:space-x-4 ${isMenuOpen ? 'block' : 'hidden'} md:block absolute md:relative top-16 md:top-0 left-0 md:left-auto right-0 md:right-auto bg-gray-800 md:bg-transparent p-4 md:p-0`}>
          {navItems.map((item) => (
            <li key={item.to} className="mb-2 md:mb-0">
              <Link 
                to={item.to} 
                className="hover:text-gray-300 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon}
                <span className="ml-1">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
