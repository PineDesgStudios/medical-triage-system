import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Grid, Paper, Typography, Box, Button,
  FormControl, FormLabel, RadioGroup, FormControlLabel, Radio,
  TextField, Divider, Chip, Alert
} from '@mui/material';
import NavigationBar from './NavigationBar';

const Triage = () => {
  const { pacienteId } = useParams();
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState(null);
  const [signos, setSignos] = useState({
    presionArterial: '',
    frecuenciaCardiaca: '',
    frecuenciaRespiratoria: '',
    temperatura: '',
    saturacionOxigeno: '',
    nivelDolor: '0'
  });
  const [nivelTriage, setNivelTriage] = useState('');

  // Simulación de carga de datos del paciente
  useEffect(() => {
    // En una aplicación real, estos datos vendrían de una API
    setPaciente({
      id: pacienteId,
      nombre: 'María González',
      edad: 45,
      genero: 'Femenino',
      horaLlegada: '14:30',
      motivoConsulta: 'Dolor torácico de inicio súbito hace 2 horas'
    });
  }, [pacienteId]);

  const handleSignosChange = (e) => {
    setSignos({
      ...signos,
      [e.target.name]: e.target.value
    });
  };

  const calcularNivelTriage = () => {
    // Lógica simplificada para determinar nivel de triage
    // En un sistema real, esto sería un algoritmo más complejo
    const fc = parseInt(signos.frecuenciaCardiaca);
    const fr = parseInt(signos.frecuenciaRespiratoria);
    const sat = parseInt(signos.saturacionOxigeno);
    const temp = parseFloat(signos.temperatura);
    const dolor = parseInt(signos.nivelDolor);
    
    if ((fc > 130 || fc < 40) || 
        (fr > 30 || fr < 8) || 
        (sat < 90) || 
        (temp > 40 || temp < 35) ||
        dolor === 10) {
      setNivelTriage('Emergencia');
    } else if ((fc > 120 || fc < 50) || 
              (fr > 25 || fr < 10) || 
              (sat < 92) || 
              (temp > 39 || temp < 35.5) ||
              dolor >= 8) {
      setNivelTriage('Urgente');
    } else if ((fc > 100 || fc < 60) || 
              (fr > 20 || fr < 12) || 
              (sat < 95) || 
              (temp > 38 || temp < 36) ||
              dolor >= 5) {
      setNivelTriage('Estándar');
    } else {
      setNivelTriage('No urgente');
    }
  };

  const getNivelTriageColor = () => {
    switch (nivelTriage) {
      case 'Emergencia': return 'error';
      case 'Urgente': return 'warning';
      case 'Estándar': return 'info';
      case 'No urgente': return 'success';
      default: return 'default';
    }
  };

  const handleContinuar = () => {
    navigate(`/sintomas/${pacienteId}`);
  };

  if (!paciente) {
    return <Typography>Cargando...</Typography>;
  }

  return (
    <>
      <NavigationBar title="Evaluación de Triage" backPath="/" />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              {paciente.nombre}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {paciente.edad} años | {paciente.genero} | Llegada: {paciente.horaLlegada}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              <strong>Motivo de consulta:</strong> {paciente.motivoConsulta}
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Typography variant="h6" gutterBottom>
            Signos Vitales
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="presionArterial"
                label="Presión Arterial (mmHg)"
                placeholder="120/80"
                fullWidth
                margin="normal"
                value={signos.presionArterial}
                onChange={handleSignosChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="frecuenciaCardiaca"
                label="Frecuencia Cardíaca (lpm)"
                type="number"
                fullWidth
                margin="normal"
                value={signos.frecuenciaCardiaca}
                onChange={handleSignosChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="frecuenciaRespiratoria"
                label="Frecuencia Respiratoria (rpm)"
                type="number"
                fullWidth
                margin="normal"
                value={signos.frecuenciaRespiratoria}
                onChange={handleSignosChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="temperatura"
                label="Temperatura (°C)"
                type="number"
                fullWidth
                margin="normal"
                value={signos.temperatura}
                onChange={handleSignosChange}
                inputProps={{ step: "0.1" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="saturacionOxigeno"
                label="Saturación de Oxígeno (%)"
                type="number"
                fullWidth
                margin="normal"
                value={signos.saturacionOxigeno}
                onChange={handleSignosChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl component="fieldset" fullWidth margin="normal">
                <FormLabel component="legend">Nivel de Dolor (0-10)</FormLabel>
                <RadioGroup
                  row
                  name="nivelDolor"
                  value={signos.nivelDolor}
                  onChange={handleSignosChange}
                >
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((valor) => (
                    <FormControlLabel
                      key={valor}
                      value={valor.toString()}
                      control={<Radio size="small" />}
                      label={valor.toString()}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, mb: 3, display: 'flex', justifyContent: 'center' }}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={calcularNivelTriage}
              size="large"
            >
              Calcular Nivel de Triage
            </Button>
          </Box>

          {nivelTriage && (
            <Box sx={{ mt: 2, mb: 3, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Resultado de Triage:
              </Typography>
              <Chip 
                label={nivelTriage} 
                color={getNivelTriageColor()} 
                sx={{ fontSize: '1rem', py: 2, px: 3 }}
              />
              
              {nivelTriage === 'Emergencia' && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  ¡Atención inmediata requerida! Notifique al médico de guardia.
                </Alert>
              )}
              
              {nivelTriage === 'Urgente' && (
                <Alert severity="warning" sx={{ mt: 2 }}>
                  Paciente debe ser atendido en menos de 15 minutos.
                </Alert>
              )}
            </Box>
          )}

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
            <Button 
              variant="outlined" 
              onClick={() => navigate('/')}
            >
              Volver
            </Button>
            <Button 
              variant="contained" 
              color="primary"
              onClick={handleContinuar}
              disabled={!nivelTriage}
            >
              Continuar a Síntomas
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Triage;