
import React from 'react';
import { Link } from 'react-router-dom';


const Navbar: React.FC = () => {
  return (
    <nav className="navbar1">
      <div className="navbar-logo">
        <Link to="/">Image Editor</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">tui-image-editor</Link></li>
        <li><Link to="/filerobot">react-filerobot-image-editor</Link></li>
        <li><Link to="/pqina">Pqina</Link></li>
        <li><Link to="/syncfusion">Syncfusion</Link></li>
        <li><Link to="/avatareditor">Avatar Editor</Link></li>

        {/* <li><Link to="/contact">Contact</Link></li> */}
      </ul>
    </nav>
  );
};

export default Navbar;


