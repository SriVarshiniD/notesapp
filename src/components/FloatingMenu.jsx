import React from 'react';
import '../styles/style.css';

const FloatingMenu = ({ items, position }) => {
  return (
    <div className="floating-menu" style={{ top: `${position.top}px` }}>
      <ul>
        {items.map((item, idx) => (
          <li key={idx}>
            <a href={item.href}>{item.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FloatingMenu;
