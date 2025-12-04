import React from 'react';

const Hero = ({ config, onReserve }) => {
    if (!config) return null;

    return (
        <div className="relative h-[60vh] min-h-[400px] flex items-center justify-center bg-secondary text-white overflow-hidden">
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <img
                src={config.banner || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"}
                alt="Restaurant Ambience"
                className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="relative z-20 text-center px-4 max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up">
                    Bienvenido a <br />
                    <span className="text-primary">{config.nombre}</span>
                </h1>
                <p className="text-lg md:text-xl mb-8 text-gray-200">
                    Una experiencia gastronómica inolvidable.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="#menu"
                        className="inline-block bg-primary hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-105 shadow-lg hover:shadow-primary/30"
                    >
                        Ver Menú
                    </a>
                    <button
                        onClick={onReserve}
                        className="inline-block bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border-2 border-white/30 font-bold py-3 px-8 rounded-full transition-all hover:scale-105"
                    >
                        Reservar Mesa
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Hero;
