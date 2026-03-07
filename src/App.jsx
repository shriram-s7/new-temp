import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import BreastCancer from './pages/BreastCancer';
import CervicalCancer from './pages/CervicalCancer';
import PCOS from './pages/PCOS';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

const AppLayout = () => {
    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />

                <Route element={<AppLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/breast" element={<BreastCancer />} />
                    <Route path="/cervical" element={<CervicalCancer />} />
                    <Route path="/pcos" element={<PCOS />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
