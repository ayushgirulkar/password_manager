import React from 'react';
import './Navbar.css';
import lockImage from '../assets/lock2.png';
const Navbar = () => {
  return (
   <nav className="nb">
  <div className="loggo">
    <img className="lock" src={lockImage} alt="Lock Icon" />
    <span className="brand-text">PassQube</span>
  </div>
</nav>

  );
};

export default Navbar;
