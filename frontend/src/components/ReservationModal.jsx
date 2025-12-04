import React, { useState } from 'react';
import { X, Calendar, Clock, Users, Check } from 'lucide-react';

const ReservationModal = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        guests: '2',
        name: '',
        email: '',
        phone: '',
        notes: ''
    });

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/api/reservas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStep(2);
                setTimeout(() => {
                    onClose();
                    setStep(1);
                    setFormData({
                        date: '',
                        time: '',
                        guests: '2',
                        name: '',
                        email: '',
                        phone: '',
                        notes: ''
                    });
                }, 3000);
            } else {
                alert('Hubo un error al guardar la reserva. Inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error submitting reservation:', error);
            alert('Error de conexión. Verifica que el servidor esté corriendo.');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative animate-scale-up">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors"
                >
                    <X size={20} className="text-secondary" />
                </button>

                <div className="p-8">
                    {step === 1 ? (
                        <>
                            <h2 className="text-2xl font-bold text-secondary mb-2">Reservar Mesa</h2>
                            <p className="text-gray-500 mb-6">Completa tus datos para confirmar tu reserva.</p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input
                                                type="date"
                                                name="date"
                                                required
                                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                                onChange={handleChange}
                                                value={formData.date}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Hora</label>
                                        <div className="relative">
                                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <select
                                                name="time"
                                                required
                                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none appearance-none bg-white"
                                                onChange={handleChange}
                                                value={formData.time}
                                            >
                                                <option value="">Seleccionar</option>
                                                <option value="12:00">12:00</option>
                                                <option value="13:00">13:00</option>
                                                <option value="14:00">14:00</option>
                                                <option value="19:00">19:00</option>
                                                <option value="20:00">20:00</option>
                                                <option value="21:00">21:00</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Personas</label>
                                    <div className="relative">
                                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <select
                                            name="guests"
                                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none appearance-none bg-white"
                                            onChange={handleChange}
                                            value={formData.guests}
                                        >
                                            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                                                <option key={num} value={num}>{num} Personas</option>
                                            ))}
                                            <option value="more">+8 Personas</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-2 border-t border-gray-100">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Nombre completo"
                                        required
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                        onChange={handleChange}
                                        value={formData.name}
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Correo electrónico"
                                        required
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                        onChange={handleChange}
                                        value={formData.email}
                                    />
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Teléfono"
                                        required
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                        onChange={handleChange}
                                        value={formData.phone}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-primary hover:bg-opacity-90 text-white font-bold py-3 rounded-xl transition-all hover:scale-[1.02] mt-4"
                                >
                                    Confirmar Reserva
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="text-center py-8">
                            <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                                <Check size={40} strokeWidth={3} />
                            </div>
                            <h2 className="text-2xl font-bold text-secondary mb-2">¡Reserva Confirmada!</h2>
                            <p className="text-gray-500 mb-8">
                                Te hemos enviado un correo con los detalles de tu reserva para el <strong>{formData.date}</strong> a las <strong>{formData.time}</strong>.
                            </p>
                            <button
                                onClick={onClose}
                                className="w-full bg-secondary text-white font-bold py-3 rounded-xl hover:bg-opacity-90 transition-colors"
                            >
                                Entendido
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReservationModal;
