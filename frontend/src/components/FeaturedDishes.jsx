import React from 'react';
import DishCard from './DishCard';

const FeaturedDishes = ({ menu, onDishClick }) => {
    if (!menu) return null;

    // Flatten menu and filter for items with specific tags like 'popular', 'combo', 'familia'
    // AND filter for active dishes
    const featured = menu
        .flatMap(cat => cat.platos)
        .filter(dish => dish.activo && dish.tags?.some(tag => ['popular', 'combo', 'familia'].includes(tag)))
        .slice(0, 3); // Show top 3

    if (featured.length === 0) return null;

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="text-primary font-bold tracking-wider uppercase text-sm">Favoritos de la Casa</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary mt-2">Lo Más Popular</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featured.map(dish => (
                        <div key={dish.id} onClick={() => onDishClick(dish)} className="cursor-pointer">
                            <DishCard dish={dish} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedDishes;
