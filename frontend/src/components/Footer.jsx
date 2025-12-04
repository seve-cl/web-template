import React from 'react';
import { Instagram, Facebook, MapPin, Phone, Mail, ArrowUp } from 'lucide-react';

const Footer = ({ config }) => {
    if (!config) return null;

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer id="contacto" className="bg-secondary text-white pt-20 pb-10 relative">
            {/* Top Border Accent */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-primary"></div>

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            {config.logo ? (
                                <img src={config.logo} alt={config.nombre} className="h-12 w-auto object-contain" />
                            ) : (
                                <h3 className="text-3xl font-bold text-white tracking-tight">{config.nombre}</h3>
                            )}
                        </div>
                        <p className="text-white/70 mb-8 leading-relaxed">
                            {config.descripcion || "Creando momentos deliciosos y experiencias memorables para nuestros clientes."}
                        </p>
                        <div className="flex gap-4">
                            {config.contacto.redes.instagram && (
                                <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-primary hover:text-white transition-all hover:-translate-y-1">
                                    <Instagram size={20} />
                                </a>
                            )}
                            {config.contacto.redes.facebook && (
                                <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-primary hover:text-white transition-all hover:-translate-y-1">
                                    <Facebook size={20} />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-8 text-primary uppercase tracking-wider">Enlaces Rápidos</h4>
                        <ul className="space-y-4 text-white/70">
                            <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block">Inicio</a></li>
                            <li><a href="#menu" className="hover:text-white hover:translate-x-1 transition-all inline-block">Nuestro Menú</a></li>
                            <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block">Sobre Nosotros</a></li>
                            <li><a href="#contacto" className="hover:text-white hover:translate-x-1 transition-all inline-block">Reservas</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold mb-8 text-primary uppercase tracking-wider">Contacto</h4>
                        <ul className="space-y-6 text-white/70">
                            <li className="flex items-start gap-4 group">
                                <div className="bg-white/10 p-2 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                                    <MapPin size={20} />
                                </div>
                                <span className="group-hover:text-white transition-colors">{config.contacto.direccion}</span>
                            </li>
                            <li className="flex items-center gap-4 group">
                                <div className="bg-white/10 p-2 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                                    <Phone size={20} />
                                </div>
                                <span className="group-hover:text-white transition-colors">{config.contacto.telefono}</span>
                            </li>
                            <li className="flex items-center gap-4 group">
                                <div className="bg-white/10 p-2 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                                    <Mail size={20} />
                                </div>
                                <span className="group-hover:text-white transition-colors">{config.contacto.email}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter / CTA */}
                    <div>
                        <h4 className="text-lg font-bold mb-8 text-primary uppercase tracking-wider">Únete a la Familia</h4>
                        <p className="text-white/70 mb-6 text-sm">
                            Suscríbete para recibir ofertas especiales y novedades de Los Pollos Hermanos.
                        </p>
                        <form className="space-y-3" onSubmit={(e) => {
                            e.preventDefault();
                            alert('¡Gracias por suscribirte! Recibirás nuestras mejores ofertas pronto.');
                            e.target.reset();
                        }}>
                            <input
                                type="email"
                                required
                                placeholder="Tu correo electrónico"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            />
                            <button className="w-full bg-primary hover:bg-white hover:text-secondary text-white font-bold py-3 rounded-lg transition-colors uppercase text-sm tracking-wide">
                                Suscribirse
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/40 text-sm text-center md:text-left">
                        &copy; {new Date().getFullYear()} {config.nombre}. Todos los derechos reservados.
                    </p>

                    <button
                        onClick={scrollToTop}
                        className="flex items-center gap-2 text-white/40 hover:text-primary transition-colors text-sm font-medium"
                    >
                        Volver arriba <ArrowUp size={16} />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
