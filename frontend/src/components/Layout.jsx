import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import Footer from './Footer.jsx';
import { PiCourtBasketball } from "react-icons/pi";

function Layout() {
  const location = useLocation();
  // Corregido para que coincida con tu ruta de registro
  const isAuthPage = location.pathname === '/login' || location.pathname === '/registro';

  const containerClasses = `flex flex-col min-h-screen ${!isAuthPage ? 'bg-light' : ''}`;
  const containerStyles = isAuthPage 
    ? { backgroundImage: `url('/fondoVerde.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' } 
    : {};

  return (
    <div className={containerClasses} style={containerStyles}>
      <header className="bg-primary text-light shadow-lg sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center p-4">
          <Link to="/" className="flex items-center gap-3 text-2xl font-bold font-lora hover:text-accent transition-colors">
            <PiCourtBasketball className="h-9 w-8" />
            <span>CanchaYa</span>
          </Link>
          <nav>
            {!isAuthPage && (
              <a href="/mis-reservas" className="flex items-center space-x-2 hover:text-accent">
                <UserCircleIcon className="h-8 w-8" />
                <span className="font-semibold">Mi Perfil</span>
              </a>
            )}
          </nav>
        </div>
      </header>

      {/* --- ESTA ES LA LÍNEA CORREGIDA --- */}
      <main className={`flex-grow w-full ${isAuthPage ? 'flex items-center justify-center p-4' : ''}`}>
        <Outlet />
      </main>

      {!isAuthPage && <Footer />}
    </div>
  );
}

export default Layout;