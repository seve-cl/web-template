import React from 'react';
import { Star, Quote } from 'lucide-react';

const ReviewsSection = () => {
    const reviews = [
        {
            id: 1,
            name: "Walter W.",
            role: "Cliente Frecuente",
            comment: "El mejor pollo frito que he probado. La piel es increíblemente crujiente y el sabor es... adictivo. Definitivamente volveré.",
            rating: 5,
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop"
        },
        {
            id: 2,
            name: "Jesse P.",
            role: "Foodie Local",
            comment: "¡Increíble! El ambiente es súper limpio y el servicio es rápido. Las papas fritas rizadas son un must.",
            rating: 5,
            avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop"
        },
        {
            id: 3,
            name: "Saul G.",
            role: "Abogado",
            comment: "Un lugar perfecto para reuniones rápidas. La comida siempre está fresca y caliente. ¡Mejor llama a Los Pollos!",
            rating: 4,
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop"
        }
    ];

    return (
        <section id="reviews" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-primary font-bold tracking-wider uppercase text-sm">Testimonios</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary mt-2 mb-4">Lo que dicen nuestros clientes</h2>
                    <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 relative group">
                            <div className="absolute top-6 right-8 text-gray-100 group-hover:text-primary/10 transition-colors">
                                <Quote size={60} />
                            </div>

                            <div className="flex gap-1 text-yellow-400 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={18} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-gray-300"} />
                                ))}
                            </div>

                            <p className="text-gray-600 mb-8 leading-relaxed relative z-10">"{review.comment}"</p>

                            <div className="flex items-center gap-4">
                                <img
                                    src={review.avatar}
                                    alt={review.name}
                                    className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                                />
                                <div>
                                    <h4 className="font-bold text-secondary">{review.name}</h4>
                                    <span className="text-sm text-gray-400">{review.role}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ReviewsSection;
