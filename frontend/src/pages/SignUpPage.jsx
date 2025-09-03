import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaUser, FaBuilding } from "react-icons/fa";

function SignUpPage() {
  // --- ESTADOS PARA EL FLUJO DE REGISTRO ---
  const [step, setStep] = useState('selection'); // 'selection', 'form', 'confirmation'
  const [userType, setUserType] = useState(null); // 'cliente' o 'complejo'

  // --- ESTADOS PARA LOS DATOS DEL FORMULARIO (los que ya tenías) ---
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [complexName, setComplexName] = useState('');
  const [complexAddress, setComplexAddress] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const navigate = useNavigate();

  // Función para manejar la selección del tipo de usuario
  const handleUserTypeSelect = (type) => {
    setUserType(type);
    setStep('form'); // Avanza al siguiente paso (el formulario)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Tu lógica de validación se mantiene igual
    if (!email || !phone || !password || !firstName || !lastName || password !== confirmPassword) {
      setError('Por favor, completa todos los campos y verifica que las contraseñas coincidan.');
      return;
    }
    if (userType === 'complejo' && (!complexName || !complexAddress)) {
      setError('Por favor, completa los datos del complejo.');
      return;
    }
    
    console.log('Usuario a registrar:', { firstName, lastName, email, phone, userType, complexName, complexAddress });
    setError('');

    // --- LÓGICA DE PASOS ---
    if (userType === 'complejo') {
      setStep('confirmation'); // Si es un complejo, va a la pantalla de confirmación
    } else {
      // Si es un cliente normal, podrías redirigirlo al login
      alert('¡Registro de jugador exitoso!');
      navigate('/login');
    }
  };
  
  // Tu lógica para validar contraseñas se mantiene igual
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordMatch(e.target.value === confirmPassword);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(password === e.target.value);
  };

  // --- PANTALLA DE CONFIRMACIÓN PARA COMPLEJOS ---
  if (step === 'confirmation') {
    return (
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-gray-900">¡Solicitud Enviada!</h2>
        <p className="mt-4 text-gray-600">
          Gracias por registrar tu complejo. Nuestro equipo revisará tu solicitud y te notificaremos por mail en las próximas 48hs hábiles cuando sea aprobada.
        </p>
        <Link 
          to="/" 
          className="mt-6 inline-block w-full bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-primary-dark transition-colors"
        >
          Volver al Inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      
      {/* --- PASO 1: SELECCIÓN DE TIPO DE USUARIO --- */}
      {step === 'selection' && (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Crear una cuenta</h2>
          <p className="mt-2 text-sm text-gray-600">¿Cómo vas a usar CanchaYa?</p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => handleUserTypeSelect('cliente')}
              className="w-full text-lg font-semibold py-4 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-100 transition-colors flex flex-col items-center gap-2"
            >
              <FaUser className="h-8 w-8 text-primary"/>
              Soy Jugador
            </button>
            <button
              onClick={() => handleUserTypeSelect('complejo')}
              className="w-full text-lg font-semibold py-4 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-100 transition-colors flex flex-col items-center gap-2"
            >
              <FaBuilding className="h-8 w-8 text-primary"/>
              Soy Dueño
            </button>
          </div>
        </div>
      )}

      {/* --- PASO 2: FORMULARIO DE REGISTRO --- */}
      {step === 'form' && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold text-center">
            Registro de {userType === 'cliente' ? 'Jugador' : 'Dueño de Complejo'}
          </h2>
          {error && <p className="text-red-500 text-center text-sm">{error}</p>}
          
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Nombre" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full px-4 py-2 border rounded-md" required/>
            <input type="text" placeholder="Apellido" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full px-4 py-2 border rounded-md" required/>
          </div>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-md" required/>
          <input type="tel" placeholder="Teléfono" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-2 border rounded-md" />
          <div className="relative">
            <input type={passwordVisible ? "text" : "password"} placeholder="Contraseña" value={password} onChange={handlePasswordChange} className="w-full px-4 py-2 border rounded-md" required/>
            <span onClick={() => setPasswordVisible(!passwordVisible)} className="absolute right-3 top-3 cursor-pointer text-gray-400">
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div>
            <input type="password" placeholder="Confirmar Contraseña" value={confirmPassword} onChange={handleConfirmPasswordChange} className={`w-full px-4 py-2 border rounded-md ${passwordMatch ? '' : 'border-red-500'}`} required/>
            {!passwordMatch && <p className="text-red-500 text-xs mt-1">Las contraseñas no coinciden.</p>}
          </div>

          {/* Campos adicionales para Dueño de Complejo */}
          {userType === 'complejo' && (
            <div className="animate-fade-in border-t pt-4 mt-4 space-y-4">
              <input type="text" value={complexName} onChange={(e) => setComplexName(e.target.value)} placeholder="Nombre del complejo" className="w-full px-4 py-2 border border-gray-300 rounded-md" required/>
              <input type="text" value={complexAddress} onChange={(e) => setComplexAddress(e.target.value)} placeholder="Dirección del complejo" className="w-full px-4 py-2 border border-gray-300 rounded-md" required/>
            </div>
          )}
          
          <button type="submit" className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition">
            Crear cuenta
          </button>
        </form>
      )}
      
      {/* Link para volver a la pantalla de Login */}
      <div className="mt-4 text-center">
        <p className="text-sm">
          ¿Ya tienes cuenta? <Link to="/login" className="text-blue-500">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;