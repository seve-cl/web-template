import React from 'react';
import { X, Plus, Flame } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../context/CartContext';

const DishModal = ({ dish, isOpen, onClose }) => {
    const { addToCart } = useCart();

    if (!isOpen || !dish) return null;

    const handleAdd = () => {
        addToCart(dish);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="absolute inset-0" onClick={onClose}></div>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden relative animate-scale-up z-10">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
                >
                    <X size={24} className="text-secondary" />
                </button>

                <div className="grid md:grid-cols-2">
                    <div className="h-64 md:h-full relative">
                        <img
                            src={dish.imagen || dish.foto}
                            alt={dish.nombre}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="p-8 flex flex-col h-full">
                        <div className="mb-auto">
                            <div className="flex justify-between items-start mb-2">
                                <h2 className="text-2xl font-bold text-secondary">{dish.nombre}</h2>
                                <span className="text-xl font-bold text-primary">{formatPrice(dish.precio)}</span>
                            </div>

                            <div className="flex gap-2 mb-4 flex-wrap">
                                {dish.tags?.map(tag => (
                                    <span key={tag} className="px-2 py-1 bg-gray-100 text-xs font-medium text-gray-600 rounded-full uppercase tracking-wide">
                                        {tag}
                                    </span>
                                ))}
                                {dish.spicyLevel > 0 && (
                                    <span className="flex items-center gap-1 px-2 py-1 bg-red-50 text-xs font-medium text-red-500 rounded-full uppercase tracking-wide">
                                        <Flame size={12} /> {Array(dish.spicyLevel).fill('🌶️').join('')}
                                    </span>
                                )}
                            </div>

                            <p className="text-gray-600 mb-6 leading-relaxed">
                                {dish.descripcion}
                            </p>

                            {/* Mock details for "UX & Microinteractions" */}
                            <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-500">
                                <div>
                                    <span className="block font-semibold text-secondary">Calorías</span>
                                    450 kcal
                                </div>
                                <div>
                                    <span className="block font-semibold text-secondary">Tiempo prep.</span>
                                    15-20 min
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleAdd}
                            className="w-full bg-primary hover:bg-opacity-90 text-white font-bold py-3 px-6 rounded-xl transition-transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            <Plus size={20} />
                            Agregar al Pedido
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DishModal;
