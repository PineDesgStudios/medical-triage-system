import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Paper, Typography, TextField, Button, Box,
  Grid, FormControl, InputLabel, Select, MenuItem,
  FormControlLabel, Checkbox, Divider, Alert
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import es from 'date-fns/locale/es';
import NavigationBar from './NavigationBar';

const RegistroPaciente = () => {
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState({
    nombre: '',
    apellidos: '',
    fechaNacimiento: null,
    genero: '',
    numeroIdentificacion: '',
    direccion: '',
    telefono: '',
    contactoEmergencia: '',
    telefonoEmergencia: '',
    alergias: '',
    medicacionActual: '',
    antecedentes: '',
    esEmbarazada: false,
    motivoConsulta: '',
    horaLlegada: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPaciente({
      ...paciente,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleDateChange = (date) => {
    setPaciente({
      ...paciente,
      fechaNacimiento: date
    });
  };

  const calcularEdad = (fechaNacimiento) => {
    if (!fechaNacimiento) return '';
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const m = hoy.getMonth() - nacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return `${edad} años`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Verificar campos obligatorios
    if (!paciente.nombre || !paciente.apellidos || !paciente.fechaNacimiento || !paciente.genero || !paciente.motivoConsulta) {
      return;
    }
    
    // Simulación de guardado - en una aplicación real, enviaríamos datos a una API
    // y obtendríamos un ID de paciente
    const nuevoId = Math.floor(Math.random() * 1000) + 1;
    
    // Redirigir al flujo de triage con el ID del nuevo paciente
    navigate(`/triage/${nuevoId}`);
  };

  return (
    <>
      <NavigationBar title="Registro de Paciente" backPath="/" />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Nuevo Paciente
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Complete la información del paciente. Los campos marcados con * son obligatorios.
          </Typography>

          {submitted && (!paciente.nombre || !paciente.apellidos || !paciente.fechaNacimiento || !paciente.genero || !paciente.motivoConsulta) && (
            <Alert severity="error" sx={{ mb: 3 }}>
              Por favor, complete todos los campos obligatorios.
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Información Personal
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="nombre"
                  label="Nombre(s) *"
                  fullWidth
                  value={paciente.nombre}
                  onChange={handleChange}
                  error={submitted && !paciente.nombre}
                  helperText={submitted && !paciente.nombre ? "Campo obligatorio" : ""}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="apellidos"
                  label="Apellidos *"
                  fullWidth
                  value={paciente.apellidos}
                  onChange={handleChange}
                  error={submitted && !paciente.apellidos}
                  helperText={submitted && !paciente.apellidos ? "Campo obligatorio" : ""}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
                  <DatePicker
                    label="Fecha de Nacimiento *"
                    value={paciente.fechaNacimiento}
                    onChange={handleDateChange}
                    renderInput={(params) => (
                      <TextField 
                        {...params} 
                        fullWidth
                        error={submitted && !paciente.fechaNacimiento}
                        helperText={submitted && !paciente.fechaNacimiento ? "Campo obligatorio" : ""}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={submitted && !paciente.genero}>
                  <InputLabel>Género *</InputLabel>
                  <Select
                    name="genero"
                    value={paciente.genero}
                    onChange={handleChange}
                    label="Género *"
                  >
                    <MenuItem value="Masculino">Masculino</MenuItem>
                    <MenuItem value="Femenino">Femenino</MenuItem>
                    <MenuItem value="Otro">Otro</MenuItem>
                  </Select>
                  {submitted && !paciente.genero && (
                    <Typography variant="caption" color="error">
                      Campo obligatorio
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  name="numeroIdentificacion"
                  label="Número de Identificación"
                  fullWidth
                  value={paciente.numeroIdentificacion}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Información de Contacto
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="direccion"
                  label="Dirección"
                  fullWidth
                  value={paciente.direccion}
                  onChange={handleChange}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="telefono"
                  label="Teléfono"
                  fullWidth
                  value={paciente.telefono}
                  onChange={handleChange}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="contactoEmergencia"
                  label="Contacto de Emergencia"
                  fullWidth
                  value={paciente.contactoEmergencia}
                  onChange={handleChange}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="telefonoEmergencia"
                  label="Teléfono de Emergencia"
                  fullWidth
                  value={paciente.telefonoEmergencia}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Información Médica
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="alergias"
                  label="Alergias"
                  fullWidth
                  multiline
                  rows={2}
                  value={paciente.alergias}
                  onChange={handleChange}
                  placeholder="Medicamentos, alimentos u otras alergias"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  name="medicacionActual"
                  label="Medicación Actual"
                  fullWidth
                  multiline
                  rows={2}
                  value={paciente.medicacionActual}
                  onChange={handleChange}
                  placeholder="Medicamentos que toma actualmente"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  name="antecedentes"
                  label="Antecedentes Médicos"
                  fullWidth
                  multiline
                  rows={2}
                  value={paciente.antecedentes}
                  onChange={handleChange}
                  placeholder="Enfermedades crónicas, cirugías previas, etc."
                />
              </Grid>
              
              {paciente.genero === 'Femenino' && (
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="esEmbarazada"
                        checked={paciente.esEmbarazada}
                        onChange={handleChange}
                      />
                    }
                    label="Embarazada"
                  />
                </Grid>
              )}
            </Grid>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Motivo de Consulta
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="motivoConsulta"
                  label="Motivo de Consulta *"
                  fullWidth
                  multiline
                  rows={3}
                  value={paciente.motivoConsulta}
                  onChange={handleChange}
                  error={submitted && !paciente.motivoConsulta}
                  helperText={submitted && !paciente.motivoConsulta ? "Campo obligatorio" : ""}
                  placeholder="Describa brevemente el motivo de consulta del paciente"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  name="horaLlegada"
                  label="Hora de Llegada"
                  fullWidth
                  value={paciente.horaLlegada}
                  onChange={handleChange}
                  disabled
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button 
                variant="outlined" 
                onClick={() => navigate('/')}
              >
                Cancelar
              </Button>
              <Button 
                type="submit"
                variant="contained" 
                color="primary"
              >
                Registrar y Continuar
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default RegistroPaciente;