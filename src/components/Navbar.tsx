"use client";
import { useState } from "react";
import { Search, User, Settings, Menu, X } from "lucide-react"; // Icons from Lucide

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md dark:bg-gray-900 p-4">
      <div className="container mx-auto flex justify-between items-center">

        {/* Left Section - Logo & Links */}
        <div className="flex items-center">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            CHKwired
          </span>
          <div className="hidden md:flex space-x-6 ml-6">
            <a href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">Home</a>
            <a href="/features" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">Features</a>
            <a href="/blog" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">Blog</a>
          </div>
        </div>

        {/* Right Section - Search Box & Links */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="border rounded-md px-4 py-2 w-48 text-gray-700 dark:bg-gray-800 dark:text-gray-300 focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          <a href="/profile" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 flex items-center space-x-1">
            <User size={20} />
            <span>Profile</span>
          </a>
          <a href="/settings" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 flex items-center space-x-1">
            <Settings size={20} />
            <span>Settings</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-900 dark:text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-4 py-2 space-y-2">
          <a href="/" className="block text-gray-700 dark:text-gray-300 hover:text-blue-500">Home</a>
          <a href="/features" className="block text-gray-700 dark:text-gray-300 hover:text-blue-500">Features</a>
          <a href="/blog" className="block text-gray-700 dark:text-gray-300 hover:text-blue-500">Blog</a>
          <hr className="border-gray-200 dark:border-gray-700" />
          <a href="/profile" className="block text-gray-700 dark:text-gray-300 hover:text-blue-500">Profile</a>
          <a href="/settings" className="block text-gray-700 dark:text-gray-300 hover:text-blue-500">Settings</a>
        </div>
      )}
    </nav>
  );
}
