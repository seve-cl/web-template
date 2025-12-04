import React, { useState, useEffect } from 'react';
import { Menu, X, UtensilsCrossed, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header = ({ config, onOpenReservation }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { toggleCart, cartCount } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Inicio', href: '#' },
        { name: 'Menú', href: '#menu' },
        { name: 'Nosotros', href: '#about' },
        { name: 'Reseñas', href: '#reviews' },
        { name: 'Contacto', href: '#contact' },
    ];

    const handleNavClick = (e, href) => {
        e.preventDefault();
        const element = document.querySelector(href === '#' ? 'body' : href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <header
            className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
                }`}
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                {/* Logo */}
                <a href="#" className="flex items-center gap-3 group">
                    {config?.logo ? (
                        <img
                            src={config.logo}
                            alt={config.nombre}
                            className="h-12 w-auto object-contain transition-transform group-hover:scale-105"
                        />
                    ) : (
                        <div className={`p-2 rounded-full transition-colors ${isScrolled ? 'bg-primary/10' : 'bg-white/10'}`}>
                            <UtensilsCrossed className={`w-6 h-6 ${isScrolled ? 'text-primary' : 'text-white'}`} />
                        </div>
                    )}
                    <span className={`text-xl font-bold tracking-tight ${isScrolled ? 'text-secondary' : 'text-white'}`}>
                        {config?.nombre || 'Restaurante'}
                    </span>
                </a>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className={`font-medium transition-colors hover:text-primary ${isScrolled ? 'text-gray-600' : 'text-white/90'
                                }`}
                        >
                            {link.name}
                        </a>
                    ))}

                    <button
                        onClick={toggleCart}
                        className={`relative p-2 rounded-full transition-colors ${isScrolled ? 'hover:bg-gray-100 text-gray-600' : 'hover:bg-white/10 text-white'
                            }`}
                    >
                        <ShoppingBag size={24} />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-scale-up">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    <button
                        onClick={onOpenReservation}
                        className="bg-primary hover:bg-opacity-90 text-white px-6 py-2.5 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg shadow-primary/30"
                    >
                        Reservar Mesa
                    </button>
                </nav>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-4 md:hidden">
                    <button
                        onClick={toggleCart}
                        className={`relative p-2 ${isScrolled ? 'text-gray-600' : 'text-white'}`}
                    >
                        <ShoppingBag size={24} />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    <button
                        className={`p-2 ${isScrolled ? 'text-secondary' : 'text-white'}`}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 md:hidden animate-fade-in">
                    <div className="flex flex-col p-4 gap-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className="text-gray-600 font-medium py-2 border-b border-gray-50 hover:text-primary transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                        <button
                            onClick={() => {
                                onOpenReservation();
                                setIsMobileMenuOpen(false);
                            }}
                            className="bg-primary text-white py-3 rounded-xl font-bold shadow-lg shadow-primary/20 mt-2"
                        >
                            Reservar Mesa
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
