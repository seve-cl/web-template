import React from 'react';
import { Plus } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../context/CartContext';

const DishCard = ({ dish, onOpenModal }) => {
    const { addToCart } = useCart();

    const handleAdd = (e) => {
        e.stopPropagation();
        addToCart(dish);
    };

    return (
        <div
            className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full cursor-pointer"
            onClick={() => onOpenModal && onOpenModal(dish)}
        >
            <div className="relative h-48 overflow-hidden">
                <img
                    src={dish.imagen || dish.foto}
                    alt={dish.nombre}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-primary shadow-sm">
                    {formatPrice(dish.precio)}
                </div>
            </div>

            <div className="p-5 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-secondary mb-2">{dish.nombre}</h3>
                <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-1">{dish.descripcion}</p>

                <button
                    onClick={handleAdd}
                    className="w-full bg-gray-50 hover:bg-primary hover:text-white text-secondary font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-white"
                >
                    <Plus size={18} />
                    Agregar
                </button>
            </div>
        </div>
    );
};

export default DishCard;
