import React, { useState } from 'react';
import { FaPlus, FaPencilAlt, FaTrash, FaFutbol, FaHockeyPuck } from 'react-icons/fa';
import { GiTennisRacket } from "react-icons/gi";

const deportesMock = [
  { id: 1, nombre: 'Fútbol', icon: <FaFutbol size={32}/> },
  { id: 2, nombre: 'Pádel', icon: <GiTennisRacket size={32}/> },
  { id: 3, nombre: 'Hockey', icon: <FaHockeyPuck size={32}/> },
];

function GestionDeportes() {
  const [deportes, setDeportes] = useState(deportesMock);

  const handleAdd = () => {
    const nuevoDeporte = prompt("Ingrese el nombre del nuevo deporte:");
    if (nuevoDeporte) {
      setDeportes([...deportes, { id: Date.now(), nombre: nuevoDeporte, icon: <FaFutbol size={32}/> }]);
    }
  };

  const handleEdit = (deporte) => {
    const nombreActualizado = prompt(`Editar nombre para ${deporte.nombre}:`, deporte.nombre);
    if (nombreActualizado) {
      setDeportes(deportes.map(d => d.id === deporte.id ? { ...d, nombre: nombreActualizado } : d));
    }
  };

  const handleDelete = (deporte) => {
    if (window.confirm(`¿Estás seguro que quieres borrar ${deporte.nombre}? Si lo haces, se inhabilitará este deporte para todas las canchas.`)) {
      setDeportes(deportes.filter(d => d.id !== deporte.id));
    }
  };

  return (
    // --- MODIFICACIÓN: Contenedor y título corregidos ---
    <div className="p-8">
      <h2 className="text-2xl font-bold text-secondary mb-6">Gestión de Deportes</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {/* Globo para agregar nuevo deporte */}
          <button 
              onClick={handleAdd}
              className="group aspect-square border-2 border-dashed rounded-full flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-primary transition-colors duration-300"
          >
              <FaPlus className="h-12 w-12" />
              <span className="mt-2 font-semibold">Agregar Deporte</span>
          </button>
          
          {/* Globos de deportes existentes */}
          {deportes.map(deporte => (
              <div key={deporte.id} className="group relative aspect-square bg-white shadow-lg rounded-full flex flex-col items-center justify-center cursor-pointer overflow-hidden">
                  {/* Contenido del globo */}
                  <div className="text-primary">{deporte.icon}</div>
                  <span className="mt-2 text-xl font-bold text-gray-800 transition-transform duration-300 group-hover:scale-110">{deporte.nombre}</span>
                  
                  {/* Overlay de acciones que aparece al hacer hover */}
                  <div className="absolute inset-0 bg-black bg-opacity-70 rounded-full flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button onClick={() => handleEdit(deporte)} className="text-white p-3 rounded-full hover:bg-yellow-500 transition-colors" title="Editar">
                          <FaPencilAlt size={22} />
                      </button>
                      <button onClick={() => handleDelete(deporte)} className="text-white p-3 rounded-full hover:bg-red-600 transition-colors" title="Eliminar">
                          <FaTrash size={22} />
                      </button>
                  </div>
              </div>
          ))}
      </div>
    </div>
  );
}

export default GestionDeportes;