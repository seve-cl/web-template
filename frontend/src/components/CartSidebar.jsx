import React from 'react';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';

const CartSidebar = () => {
    const {
        cartItems,
        isCartOpen,
        toggleCart,
        updateQuantity,
        removeFromCart,
        cartTotal
    } = useCart();

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
                onClick={toggleCart}
            ></div>

            {/* Sidebar */}
            <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <div className="flex items-center gap-3">
                        <ShoppingBag className="text-primary" />
                        <h2 className="text-xl font-bold text-secondary">Tu Pedido</h2>
                    </div>
                    <button
                        onClick={toggleCart}
                        className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                    >
                        <X size={24} className="text-gray-500" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {cartItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                            <ShoppingBag size={64} className="opacity-20" />
                            <p className="text-lg font-medium">Tu carrito está vacío</p>
                            <button
                                onClick={toggleCart}
                                className="text-primary font-bold hover:underline"
                            >
                                Volver al menú
                            </button>
                        </div>
                    ) : (
                        cartItems.map(item => (
                            <div key={item.id} className="flex gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                <img
                                    src={item.imagen || item.foto}
                                    alt={item.nombre}
                                    className="w-20 h-20 rounded-lg object-cover bg-gray-100"
                                />
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-bold text-secondary line-clamp-1">{item.nombre}</h3>
                                        <p className="text-primary font-bold">{formatPrice(item.precio)}</p>
                                    </div>

                                    <div className="flex justify-between items-center mt-2">
                                        <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                                            <button
                                                onClick={() => item.quantity > 1 ? updateQuantity(item.id, -1) : removeFromCart(item.id)}
                                                className="p-1 hover:bg-white rounded-md shadow-sm transition-all text-gray-600"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="p-1 hover:bg-white rounded-md shadow-sm transition-all text-gray-600"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="p-6 border-t border-gray-100 bg-gray-50">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-gray-600 font-medium">Total</span>
                            <span className="text-2xl font-bold text-primary">{formatPrice(cartTotal)}</span>
                        </div>
                        <button className="w-full bg-primary hover:bg-opacity-90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 transition-transform hover:scale-[1.02] active:scale-[0.98]">
                            Confirmar Pedido
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartSidebar;
