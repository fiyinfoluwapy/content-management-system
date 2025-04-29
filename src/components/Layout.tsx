import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { HomeIcon, FileTextIcon, SettingsIcon, LogOutIcon, MenuIcon, XIcon } from 'lucide-react';
const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return <div className="flex min-h-screen relative">
      {/* Mobile Menu Button */}
      <button onClick={toggleSidebar} className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#260701] text-[#C69076] hover:bg-[#3D0C02] transition-colors">
        {isSidebarOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
      </button>
      {/* Overlay for mobile */}
      {isSidebarOpen && <div className="lg:hidden fixed inset-0 bg-black/50 z-30" onClick={() => setIsSidebarOpen(false)} />}
      {/* Sidebar */}
      <aside className={`
        w-64 bg-[#260701] text-[#C69076] p-5 fixed h-full z-40 transition-transform duration-300
        lg:translate-x-0 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="mb-8 mt-8 lg:mt-0">
          <h1 className="text-2xl font-bold text-[#AF6E51]">Blog CMS</h1>
        </div>
        <nav className="space-y-2">
          <NavLink to="/admin" end onClick={() => setIsSidebarOpen(false)} className={({
          isActive
        }) => `flex items-center gap-3 p-3 rounded-lg transition-all ${isActive ? 'bg-[#3D0C02] text-[#C69076]' : 'hover:bg-[#3D0C02] text-[#AF6E51]'}`}>
            <HomeIcon size={18} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/admin/create" onClick={() => setIsSidebarOpen(false)} className={({
          isActive
        }) => `flex items-center gap-3 p-3 rounded-lg transition-all ${isActive ? 'bg-[#3D0C02] text-[#C69076]' : 'hover:bg-[#3D0C02] text-[#AF6E51]'}`}>
            <FileTextIcon size={18} />
            <span>New Post</span>
          </NavLink>
          <div className="flex items-center gap-3 p-3 rounded-lg text-[#AF6E51] hover:bg-[#3D0C02] cursor-pointer">
            <SettingsIcon size={18} />
            <span>Settings</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg text-[#AF6E51] hover:bg-[#3D0C02] cursor-pointer mt-auto">
            <LogOutIcon size={18} />
            <span>Logout</span>
          </div>
        </nav>
      </aside>
      {/* Main content */}
      <main className={`
        flex-1 p-4 sm:p-6 lg:p-8 transition-all duration-300
        lg:ml-64
      `}>
        <div className="lg:mt-0 mt-12">
          <Outlet />
        </div>
      </main>
    </div>;
};
export default Layout;