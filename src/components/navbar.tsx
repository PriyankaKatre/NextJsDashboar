import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <ul className="flex space-x-4 text-white">
        <li>
          <Link href="/dashboard/weather-news">Weather News</Link>
        </li>
        <li>
          <Link href="/dashboard/analytics">Analytics</Link>
        </li>
        <li>
          <Link href="/dashboard/kanban">Kanban</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
