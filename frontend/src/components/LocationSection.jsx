import React from 'react';
import { MapPin, Clock, Navigation, Phone } from 'lucide-react';

const LocationSection = ({ config }) => {
    if (!config) return null;

    return (
        <section id="contact" className="py-20 bg-white relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-primary font-bold tracking-wider uppercase text-sm">Visítanos</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-secondary mt-2 mb-4">Dónde Encontrarnos</h2>
                    <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
                    {/* Info Cards */}
                    <div className="space-y-6">
                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-5">
                                <div className="bg-white p-4 rounded-xl shadow-sm text-primary shrink-0">
                                    <MapPin size={28} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-2xl text-secondary mb-2">Dirección</h3>
                                    <p className="text-gray-600 text-lg leading-relaxed mb-3">{config.contacto.direccion}</p>
                                    <a
                                        href="#"
                                        className="inline-flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors"
                                    >
                                        <Navigation size={18} />
                                        Cómo llegar
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-5">
                                <div className="bg-white p-4 rounded-xl shadow-sm text-primary shrink-0">
                                    <Clock size={28} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-2xl text-secondary mb-4">Horarios de Atención</h3>
                                    <ul className="space-y-3">
                                        {config.horario && Object.entries(config.horario).map(([key, value]) => (
                                            <li key={key} className="flex justify-between items-center border-b border-gray-200 pb-2 last:border-0 last:pb-0">
                                                <span className="font-medium text-gray-500 capitalize">{key.replace(/_/g, ' ')}</span>
                                                <span className="font-bold text-secondary">{value}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="bg-secondary text-white p-8 rounded-2xl shadow-lg flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-xl mb-1">¿Tienes dudas?</h3>
                                <p className="text-white/80">Llámanos directamente</p>
                            </div>
                            <a href={`tel:${config.contacto.telefono}`} className="bg-white text-secondary p-3 rounded-full hover:bg-primary hover:text-white transition-colors shadow-md">
                                <Phone size={24} />
                            </a>
                        </div>
                    </div>

                    {/* Map Container */}
                    <div className="h-[600px] bg-gray-200 rounded-3xl overflow-hidden shadow-2xl border-4 border-white relative group">
                        <img
                            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1748&auto=format&fit=crop"
                            alt="Mapa de ubicación"
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>

                        <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                            <div className="flex items-center gap-4">
                                <div className="bg-primary p-3 rounded-full text-white">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <p className="font-bold text-secondary text-lg">Los Pollos Hermanos</p>
                                    <p className="text-gray-500 text-sm">El mejor pollo frito de Albuquerque</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LocationSection;
