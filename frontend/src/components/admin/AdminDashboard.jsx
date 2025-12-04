import React, { useState } from 'react';
import { LayoutDashboard, Calendar, UtensilsCrossed, LogOut } from 'lucide-react';
import ReservationsView from './ReservationsView';
import MenuManager from './MenuManager';

const AdminDashboard = ({ onLogout }) => {
    const [activeTab, setActiveTab] = useState('reservations');

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-secondary">Admin Panel</h2>
                    <p className="text-sm text-gray-400">Los Pollos Hermanos</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('reservations')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'reservations' ? 'bg-primary/10 text-primary font-bold' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        <Calendar size={20} />
                        Reservas
                    </button>
                    <button
                        onClick={() => setActiveTab('menu')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'menu' ? 'bg-primary/10 text-primary font-bold' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        <UtensilsCrossed size={20} />
                        Gestión de Menú
                    </button>
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                    >
                        <LogOut size={20} />
                        Cerrar Sesión
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="bg-white border-b border-gray-200 p-4 md:hidden flex justify-between items-center">
                    <h2 className="font-bold text-secondary">Admin Panel</h2>
                    <button onClick={onLogout} className="text-red-500"><LogOut size={20} /></button>
                </header>

                <div className="p-8">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-800">
                            {activeTab === 'reservations' ? 'Reservas Recientes' : 'Gestión del Menú'}
                        </h1>
                        <p className="text-gray-500">
                            {activeTab === 'reservations' ? 'Revisa y gestiona las solicitudes de reserva.' : 'Actualiza precios y disponibilidad de platos.'}
                        </p>
                    </div>

                    {activeTab === 'reservations' ? <ReservationsView /> : <MenuManager />}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
