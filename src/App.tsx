import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
export function App() {
  return <BrowserRouter>
      <div className="min-h-screen bg-[#F8F5F2] text-[#260701]">
        <Toaster position="top-right" toastOptions={{
        style: {
          background: '#C69076',
          color: '#260701',
          border: '1px solid #843722'
        }
      }} />
        <Routes>
          <Route path="/" element={<Navigate to="/admin" replace />} />
          <Route path="/admin" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="create" element={<CreatePost />} />
            <Route path="edit/:id" element={<EditPost />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>;
}