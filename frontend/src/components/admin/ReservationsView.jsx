import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Phone, Mail } from 'lucide-react';

const ReservationsView = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/reservas');
            const result = await response.json();
            if (result.success) {
                // Sort by newest first
                setReservations(result.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
            }
        } catch (error) {
            console.error('Error fetching reservations:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            const response = await fetch(`http://localhost:3001/api/reservas/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                fetchReservations();
            }
        } catch (error) {
            console.error('Error updating reservation:', error);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Cargando reservas...</div>;

    if (reservations.length === 0) {
        return (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                    <Calendar size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">No hay reservas aún</h3>
                <p className="text-gray-500">Las nuevas solicitudes aparecerán aquí.</p>
            </div>
        );
    }

    return (
        <div className="grid gap-4">
            {reservations.map((res) => (
                <div key={res.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-bold text-lg text-secondary">{res.name}</h3>
                            <span className={`px-2 py-1 text-xs font-bold rounded-full uppercase ${res.status === 'confirmada' ? 'bg-green-100 text-green-700' :
                                    res.status === 'cancelada' ? 'bg-red-100 text-red-700' :
                                        'bg-yellow-100 text-yellow-700'
                                }`}>
                                {res.status || 'pendiente'}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8 text-sm text-gray-600 mt-4">
                            <div className="flex items-center gap-2">
                                <Calendar size={16} className="text-primary" />
                                {res.date}
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={16} className="text-primary" />
                                {res.time}
                            </div>
                            <div className="flex items-center gap-2">
                                <Users size={16} className="text-primary" />
                                {res.guests} Personas
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone size={16} className="text-primary" />
                                {res.phone}
                            </div>
                            <div className="flex items-center gap-2 md:col-span-2">
                                <Mail size={16} className="text-primary" />
                                {res.email}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                        {res.status !== 'confirmada' && (
                            <button
                                onClick={() => handleStatusUpdate(res.id, 'confirmada')}
                                className="flex-1 md:flex-none px-4 py-2 bg-green-50 text-green-600 font-bold rounded-lg hover:bg-green-100 transition-colors"
                            >
                                Confirmar
                            </button>
                        )}
                        {res.status !== 'cancelada' && (
                            <button
                                onClick={() => handleStatusUpdate(res.id, 'cancelada')}
                                className="flex-1 md:flex-none px-4 py-2 bg-red-50 text-red-600 font-bold rounded-lg hover:bg-red-100 transition-colors"
                            >
                                Cancelar
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ReservationsView;
