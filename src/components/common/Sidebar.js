'use client';

import React, { useState } from "react";

const Sidebar = ({ items }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <nav
      className={`${
        collapsed ? "w-[60px]" : "w-[220px]"
      } fixed top-0 left-0 h-screen bg-[#222] text-white shadow-md overflow-hidden transition-all duration-300`}
      aria-label="Main sidebar"
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        aria-expanded={!collapsed}
        className="w-full text-left px-3 py-2 text-white bg-transparent border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
      >
        {collapsed ? "▶" : "◀"}
      </button>

      <ul className="list-none p-0 m-0">
        {items &&
          items.map((item, idx) => (
            <li
              key={idx}
              className="px-5 py-3 truncate cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis"
              role="button"
              tabIndex={0}
            >
              {collapsed ? item.icon || item.label[0] : item.label}
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
