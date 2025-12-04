import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedDishes from './components/FeaturedDishes';
import MenuGrid from './components/MenuGrid';
import AboutSection from './components/AboutSection';
import ReviewsSection from './components/ReviewsSection';
import LocationSection from './components/LocationSection';
import Footer from './components/Footer';
import DishModal from './components/DishModal';
import ReservationModal from './components/ReservationModal';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import CartSidebar from './components/CartSidebar';
import CartBottomBar from './components/CartBottomBar';
import { CartProvider } from './context/CartContext';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDish, setSelectedDish] = useState(null);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home');

  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin') {
        setCurrentView('admin-login');
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', checkHash);
    checkHash();

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/info');
        if (!response.ok) throw new Error('Error al conectar con el servidor');
        const result = await response.json();
        setData(result.data);

        if (result.data.configuracionRestaurante?.colores) {
          const { primario, secundario, fondo, texto } = result.data.configuracionRestaurante.colores;
          const root = document.documentElement;
          root.style.setProperty('--color-primary', primario);
          root.style.setProperty('--color-secondary', secundario);
          root.style.setProperty('--color-background', fondo);
          root.style.setProperty('--color-text', texto);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const handleAdminLogin = () => setCurrentView('admin-dashboard');
  const handleAdminLogout = () => {
    window.location.hash = '';
    setCurrentView('home');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  if (currentView === 'admin-login') return <AdminLogin onLogin={handleAdminLogin} />;
  if (currentView === 'admin-dashboard') return <AdminDashboard onLogout={handleAdminLogout} />;

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-gray-50">
        <Header
          config={data.configuracionRestaurante}
          onOpenReservation={() => setIsReservationOpen(true)}
        />

        <main className="flex-grow">
          <Hero
            config={data.configuracionRestaurante}
            onOpenReservation={() => setIsReservationOpen(true)}
          />
          <FeaturedDishes menu={data.menu} onDishClick={setSelectedDish} />
          <AboutSection />
          <MenuGrid menu={data.menu} onDishClick={setSelectedDish} />
          <ReviewsSection />
          <LocationSection config={data.configuracionRestaurante} />
        </main>

        <Footer config={data.configuracionRestaurante} />

        {selectedDish && (
          <DishModal
            dish={selectedDish}
            isOpen={!!selectedDish}
            onClose={() => setSelectedDish(null)}
          />
        )}

        <ReservationModal
          isOpen={isReservationOpen}
          onClose={() => setIsReservationOpen(false)}
        />

        <CartSidebar />
        <CartBottomBar />
      </div>
    </CartProvider>
  );
}

export default App;
