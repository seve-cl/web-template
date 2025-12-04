import React from 'react';
import { ShoppingBag, ChevronUp } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';

const CartBottomBar = () => {
    const { cartItems, cartTotal, toggleCart, isCartOpen } = useCart();

    if (cartItems.length === 0 || isCartOpen) return null;

    return (
        <div
            onClick={toggleCart}
            className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4 z-50 cursor-pointer hover:bg-gray-50 transition-colors animate-slide-up"
        >
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="bg-primary text-white p-2 rounded-full relative">
                        <ShoppingBag size={20} />
                        <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                            {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500 font-medium">Ver tu pedido</span>
                        <span className="font-bold text-secondary text-lg">{formatPrice(cartTotal)}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-primary font-bold">
                    <span>Ver Carrito</span>
                    <ChevronUp size={20} />
                </div>
            </div>
        </div>
    );
};

export default CartBottomBar;
