import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

// Componentes principales
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import RegistroPaciente from './components/RegistroPaciente';
import Triage from './components/Triage';
import EntradaSintomas from './components/EntradaSintomas';
import ResultadosLaboratorio from './components/ResultadosLaboratorio';
import DiagnosticoSugerido from './components/DiagnosticoSugerido';
import HistorialPaciente from './components/HistorialPaciente';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router basename="/medical-triage-system">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/registro-paciente" 
            element={
              <ProtectedRoute>
                <RegistroPaciente />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/triage/:pacienteId" 
            element={
              <ProtectedRoute>
                <Triage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/sintomas/:pacienteId" 
            element={
              <ProtectedRoute>
                <EntradaSintomas />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/laboratorio/:pacienteId" 
            element={
              <ProtectedRoute>
                <ResultadosLaboratorio />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/diagnostico/:pacienteId" 
            element={
              <ProtectedRoute>
                <DiagnosticoSugerido />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/historial/:pacienteId" 
            element={
              <ProtectedRoute>
                <HistorialPaciente />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;