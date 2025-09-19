// "use client";

// import React from "react";
// import { useRouter } from "next/navigation";

// const Header = () => {
//   const navigation = useRouter();
//   const navigatehandler = () => {
//     navigation.push("/addcontact");
//   };
//   return (
//     <header className="row-start-1 flex items-center justify-between container mx-auto p-4 border-b border-gray-200 font-poppins font-semibold bg-amber-100">
//       <h2 className="text-cyan-600 text-2xl ">
//         Contact <span className="text-emerald-600 font-bold">HUB</span>
//       </h2>

//       <button
//         onClick={navigatehandler}
//         className="bg-[#596d98] text-gray-200 px-4 py-2 rounded hover:bg-[#6f85b6] transition cursor-pointer"
//       >
//         Add
//       </button>
//     </header>
//   );
// };

// export default Header;

"use client";

import React, { ChangeEvent, useContext, useState } from "react";
import { Plus, Users, Search, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { UserDataContext } from "@/context/context";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { setQuery } = useContext(UserDataContext);
  const navigate = useRouter();
  const navigateHandler = () => {
    navigate.push("/addcontact");
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("Search contacts:", e?.target?.value);

    setQuery(e.target.value);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Header - Always visible on screens >= 768px */}
        <div className="hidden md:flex items-center justify-between h-16 w-full">
          {/* Left: Logo Section */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold whitespace-nowrap">
                <span className="text-cyan-600">Contact</span>
                <span className="text-emerald-600 ml-2">HUB</span>
              </h1>
              <p className="text-xs text-gray-500 -mt-1">
                Manage your contacts
              </p>
            </div>
          </div>

          {/* Center: Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search contacts..."
                onChange={handleSearch}
                className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200 text-sm"
              />
            </div>
          </div>

          {/* Right: Stats and Add Button */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {/* Contact Count */}
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border">
              <Users className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-semibold text-gray-700">1,234</span>
              <span className="text-xs text-gray-500">contacts</span>
            </div>

            {/* Add Contact Button */}
            <button
              onClick={navigateHandler}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105 cursor-pointer"
            >
              <Plus className="w-5 h-5" />
              Add Contact
            </button>
          </div>
        </div>

        {/* Mobile Header - Only visible on screens < 768px */}
        <div className="md:hidden">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold">
                <span className="text-cyan-600">Contact</span>
                <span className="text-emerald-600 ml-1">HUB</span>
              </h1>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="py-4 border-t border-gray-200 bg-gray-50">
              <div className="space-y-4">
                {/* Mobile Search */}
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search contacts..."
                    onChange={handleSearch}
                    className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                  />
                </div>

                {/* Mobile Stats */}
                <div className="flex items-center justify-center gap-2 py-2">
                  <Users className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-semibold text-gray-700">
                    1,234 contacts
                  </span>
                </div>

                {/* Mobile Add Button */}
                <button
                  onClick={() => {
                    navigateHandler();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 cursor-pointer hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add New Contact
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
