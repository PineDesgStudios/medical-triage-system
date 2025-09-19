import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Componente que protege las rutas que requieren autenticación
 * Si el usuario no está autenticado, redirige a la página de login
 */
const ProtectedRoute = ({ children }) => {
  // En una aplicación real, verificaríamos si hay un token válido
  // o haríamos una petición al backend para verificar la sesión
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  // Para propósitos de desarrollo, puedes forzar isAuthenticated a true
  // const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;