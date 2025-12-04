import React, { useState, useMemo } from 'react';
import DishCard from './DishCard';

const MenuGrid = ({ menu, onDishClick }) => {
    const [activeCategory, setActiveCategory] = useState('Todos');
    const [orderType, setOrderType] = useState('presencial'); // 'presencial' or 'delivery'

    const categories = useMemo(() => {
        if (!menu) return [];
        return ['Todos', ...menu.map(c => c.nombre)];
    }, [menu]);

    const filteredMenu = useMemo(() => {
        if (!menu) return [];
        let filtered = menu;

        // Filter by category
        if (activeCategory !== 'Todos') {
            filtered = menu.filter(c => c.nombre === activeCategory);
        }

        // Here you could add logic to filter dishes based on orderType if needed
        // For now, we'll just pass the orderType context visually or logic-wise

        return filtered;
    }, [menu, activeCategory, orderType]);

    if (!menu || menu.length === 0) return null;

    return (
        <section id="menu" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Nuestra Carta</h2>
                    <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-8"></div>

                    {/* Order Type Toggle */}
                    <div className="flex justify-center mb-8">
                        <div className="bg-white p-1 rounded-full shadow-md inline-flex border border-gray-100">
                            <button
                                onClick={() => setOrderType('presencial')}
                                className={`px-6 py-2 rounded-full font-bold transition-all ${orderType === 'presencial'
                                    ? 'bg-secondary text-white shadow-md'
                                    : 'text-gray-500 hover:text-secondary'
                                    }`}
                            >
                                Para Servir
                            </button>
                            <button
                                onClick={() => setOrderType('delivery')}
                                className={`px-6 py-2 rounded-full font-bold transition-all ${orderType === 'delivery'
                                    ? 'bg-primary text-white shadow-md'
                                    : 'text-gray-500 hover:text-primary'
                                    }`}
                            >
                                Delivery
                            </button>
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-full font-medium transition-all ${activeCategory === cat
                                    ? 'bg-secondary text-white shadow-lg scale-105'
                                    : 'bg-white text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {filteredMenu.map((category) => (
                    <div key={category.id} className="mb-16 last:mb-0 animate-fade-in">
                        <h3 className="text-2xl font-bold text-secondary mb-8 border-l-4 border-primary pl-4 flex items-center gap-2">
                            {category.nombre}
                            <span className="text-sm font-normal text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                                {category.platos.filter(d => d.activo).length}
                            </span>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {category.platos
                                .filter(dish => dish.activo)
                                .map((dish) => (
                                    <div key={dish.id} onClick={() => onDishClick({ ...dish, precio: orderType === 'delivery' ? (dish.precio_delivery || dish.precio) : dish.precio })} className="cursor-pointer">
                                        <DishCard dish={{ ...dish, precio: orderType === 'delivery' ? (dish.precio_delivery || dish.precio) : dish.precio }} />
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MenuGrid;
