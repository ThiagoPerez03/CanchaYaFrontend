import React, { useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const dias = ['LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO', 'DOMINGO'];
const horas = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];

function CalendarioTurnos({ turnosDisponibles, onConfirmarReserva }) {
  const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);
  const [reservaConfirmada, setReservaConfirmada] = useState(false);

  const handleSelectTurno = (dia, hora, precio) => {
    const turnoActual = { dia, hora, precio };
    if (turnoSeleccionado?.dia === dia && turnoSeleccionado?.hora === hora) {
      setTurnoSeleccionado(null);
    } else {
      setTurnoSeleccionado(turnoActual);
      setReservaConfirmada(false);
    }
  };

  const handleConfirmarClick = () => {
    const exito = onConfirmarReserva(turnoSeleccionado);
    if (exito) {
      setReservaConfirmada(true);
      setTimeout(() => {
        setReservaConfirmada(false);
        setTurnoSeleccionado(null);
      }, 5000);
    }
  };

  const getTurno = (dia, hora) => {
    return turnosDisponibles.find(t => t.dia.toUpperCase() === dia && t.hora === hora);
  };
  
  return (
    <div className='mt-8'>
      <h2 className='text-2xl font-bold text-center text-primary mb-6'>Turnos Disponibles</h2>
      <div className="overflow-x-auto">
        <div className="grid grid-cols-8 gap-1 min-w-[800px]">
          <div className=""></div>
          {dias.map(dia => (
            <div key={dia} className="text-center font-bold text-primary py-2">{dia.substring(0, 3)}</div>
          ))}

          {horas.map(hora => (
            <React.Fragment key={hora}>
              <div className="font-bold text-primary text-center py-2">{hora}</div>
              {dias.map(dia => {
                const turno = getTurno(dia, hora);
                const isSelected = turnoSeleccionado?.dia === dia && turnoSeleccionado?.hora === hora;
                return (
                  <div key={`${dia}-${hora}`} className="text-center py-1">
                    {turno ? (
                      <button
                        // --- MODIFICACIÓN CLAVE: Se deshabilita el botón si el turno está reservado ---
                        disabled={turno.estado === 'reservado'}
                        onClick={() => handleSelectTurno(dia, hora, turno.precio)}
                        className={`w-full h-10 rounded-md text-sm font-semibold transition-all ${
                          // --- MODIFICACIÓN CLAVE: Lógica de clases para los colores ---
                          turno.estado === 'reservado' 
                            ? 'bg-red-200 cursor-not-allowed' // Color para turnos reservados
                            : isSelected 
                              ? 'bg-secondary text-light scale-110 shadow-lg' // Color para el turno seleccionado
                              : 'bg-accent text-secondary hover:bg-secondary hover:text-light' // Color para turnos disponibles
                        }`}
                      >
                        {isSelected ? '✓' : `$${(turno.precio / 1000).toFixed(0)}k`}
                      </button>
                    ) : (
                      <div className="w-full h-10 rounded-md bg-gray-100"></div>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="text-center mt-8 min-h-[100px] flex flex-col justify-center items-center">
        {reservaConfirmada ? (
          <div className="bg-accent border-l-4 border-secondary text-primary p-4 rounded-md shadow-lg w-full max-w-lg" role="alert">
            <div className="flex items-center">
              <CheckCircleIcon className="w-8 h-8 mr-3"/>
              <div>
                <p className="font-bold text-lg">¡Reserva Pendiente!</p>
                <p>Tu turno para el <strong>{turnoSeleccionado?.dia} a las {turnoSeleccionado?.hora}</strong> está pendiente de confirmación.</p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {turnoSeleccionado && (
                <div className="mb-4 text-lg text-primary animate-fade-in">
                    <p>Turno seleccionado: <strong>{turnoSeleccionado.dia} a las {turnoSeleccionado.hora} hs</strong></p>
                    <p className="font-bold text-2xl text-secondary mt-1">
                        Precio: ${turnoSeleccionado.precio.toLocaleString('es-AR')}
                    </p>
                </div>
            )}
            <button 
                onClick={handleConfirmarClick}
                className="bg-secondary text-light font-bold py-3 px-16 rounded-lg hover:bg-primary transition-all duration-300 disabled:bg-accent disabled:cursor-not-allowed"
                disabled={!turnoSeleccionado} 
            >
              Confirmar Reserva
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default CalendarioTurnos;