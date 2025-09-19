import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Paper, Typography, Box, TextField, Button,
  Chip, Grid, Autocomplete, FormControl, InputLabel, 
  Select, MenuItem, Divider, IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import NavigationBar from './NavigationBar';

const EntradaSintomas = () => {
  const { pacienteId } = useParams();
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState(null);
  const [sintomasPrincipales, setSintomasPrincipales] = useState(['']);
  const [sintomasAsociados, setSintomasAsociados] = useState(['']);
  const [duracion, setDuracion] = useState('');
  const [unidadTiempo, setUnidadTiempo] = useState('horas');
  const [evolucion, setEvolucion] = useState('');
  const [factoresAgravantes, setFactoresAgravantes] = useState('');
  const [factoresAliviantes, setFactoresAliviantes] = useState('');
  const [notas, setNotas] = useState('');

  // Lista predefinida de síntomas comunes para autocompletado
  const sintomas = [
    'Dolor de cabeza', 'Fiebre', 'Náuseas', 'Vómitos', 'Diarrea',
    'Dolor abdominal', 'Dolor torácico', 'Disnea', 'Tos', 'Fatiga',
    'Debilidad', 'Mareo', 'Síncope', 'Sudoración', 'Palpitaciones',
    'Temblor', 'Rigidez', 'Confusión', 'Visión borrosa', 'Dolor lumbar',
    'Dolor articular', 'Edema', 'Prurito', 'Erupción cutánea', 'Hemoptisis',
    'Melena', 'Hematuria', 'Disuria', 'Poliuria', 'Hiporexia'
  ];

  // Simulación de carga de datos del paciente
  useEffect(() => {
    // En una aplicación real, estos datos vendrían de una API
    setPaciente({
      id: pacienteId,
      nombre: 'María González',
      edad: 45,
      nivelTriage: 'Urgente'
    });
  }, [pacienteId]);

  const handleSintomaPrincipalChange = (index, value) => {
    const nuevosSintomas = [...sintomasPrincipales];
    nuevosSintomas[index] = value;
    setSintomasPrincipales(nuevosSintomas);
  };

  const handleSintomaAsociadoChange = (index, value) => {
    const nuevosSintomas = [...sintomasAsociados];
    nuevosSintomas[index] = value;
    setSintomasAsociados(nuevosSintomas);
  };

  const agregarSintomaPrincipal = () => {
    setSintomasPrincipales([...sintomasPrincipales, '']);
  };

  const eliminarSintomaPrincipal = (index) => {
    if (sintomasPrincipales.length > 1) {
      const nuevosSintomas = sintomasPrincipales.filter((_, i) => i !== index);
      setSintomasPrincipales(nuevosSintomas);
    }
  };

  const agregarSintomaAsociado = () => {
    setSintomasAsociados([...sintomasAsociados, '']);
  };

  const eliminarSintomaAsociado = (index) => {
    if (sintomasAsociados.length > 1) {
      const nuevosSintomas = sintomasAsociados.filter((_, i) => i !== index);
      setSintomasAsociados(nuevosSintomas);
    }
  };

  const handleContinuar = () => {
    // Aquí se guardarían los datos antes de continuar
    navigate(`/laboratorio/${pacienteId}`);
  };

  if (!paciente) {
    return <Typography>Cargando...</Typography>;
  }

  return (
    <>
      <NavigationBar title="Entrada de Síntomas" backPath={`/triage/${pacienteId}`} />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              {paciente.nombre}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {paciente.edad} años | Triage: 
              <Chip 
                label={paciente.nivelTriage} 
                color={
                  paciente.nivelTriage === 'Emergencia' ? 'error' : 
                  paciente.nivelTriage === 'Urgente' ? 'warning' : 
                  paciente.nivelTriage === 'Estándar' ? 'info' : 'success'
                }
                size="small"
                sx={{ ml: 1 }}
              />
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Typography variant="h6" gutterBottom>
            Síntomas Principales
          </Typography>
          
          {sintomasPrincipales.map((sintoma, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Autocomplete
                value={sintoma}
                onChange={(event, newValue) => handleSintomaPrincipalChange(index, newValue)}
                options={sintomas}
                freeSolo
                fullWidth
                renderInput={(params) => (
                  <TextField {...params} label={`Síntoma principal ${index + 1}`} />
                )}
              />
              <IconButton 
                color="error" 
                onClick={() => eliminarSintomaPrincipal(index)}
                disabled={sintomasPrincipales.length === 1}
                sx={{ ml: 1 }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          
          <Button 
            startIcon={<AddIcon />} 
            onClick={agregarSintomaPrincipal}
            sx={{ mb: 3 }}
          >
            Agregar síntoma principal
          </Button>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Síntomas Asociados
          </Typography>
          
          {sintomasAsociados.map((sintoma, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Autocomplete
                value={sintoma}
                onChange={(event, newValue) => handleSintomaAsociadoChange(index, newValue)}
                options={sintomas}
                freeSolo
                fullWidth
                renderInput={(params) => (
                  <TextField {...params} label={`Síntoma asociado ${index + 1}`} />
                )}
              />
              <IconButton 
                color="error" 
                onClick={() => eliminarSintomaAsociado(index)}
                disabled={sintomasAsociados.length === 1}
                sx={{ ml: 1 }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          
          <Button 
            startIcon={<AddIcon />} 
            onClick={agregarSintomaAsociado}
            sx={{ mb: 3 }}
          >
            Agregar síntoma asociado
          </Button>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Características de los Síntomas
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <TextField
                label="Tiempo de evolución"
                type="number"
                fullWidth
                value={duracion}
                onChange={(e) => setDuracion(e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Unidad</InputLabel>
                <Select
                  value={unidadTiempo}
                  onChange={(e) => setUnidadTiempo(e.target.value)}
                  label="Unidad"
                >
                  <MenuItem value="minutos">Minutos</MenuItem>
                  <MenuItem value="horas">Horas</MenuItem>
                  <MenuItem value="dias">Días</MenuItem>
                  <MenuItem value="semanas">Semanas</MenuItem>
                  <MenuItem value="meses">Meses</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="Evolución del cuadro"
                fullWidth
                multiline
                rows={2}
                value={evolucion}
                onChange={(e) => setEvolucion(e.target.value)}
                margin="normal"
                placeholder="Describa cómo han evolucionado los síntomas (progresivo, intermitente, etc.)"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                label="Factores agravantes"
                fullWidth
                multiline
                rows={2}
                value={factoresAgravantes}
                onChange={(e) => setFactoresAgravantes(e.target.value)}
                margin="normal"
                placeholder="¿Qué empeora los síntomas?"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                label="Factores aliviantes"
                fullWidth
                multiline
                rows={2}
                value={factoresAliviantes}
                onChange={(e) => setFactoresAliviantes(e.target.value)}
                margin="normal"
                placeholder="¿Qué mejora los síntomas?"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="Notas adicionales"
                fullWidth
                multiline
                rows={3}
                value={notas}
                onChange={(e) => setNotas(e.target.value)}
                margin="normal"
                placeholder="Información adicional relevante sobre los síntomas"
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
            <Button 
              variant="outlined" 
              onClick={() => navigate(`/triage/${pacienteId}`)}
            >
              Volver
            </Button>
            <Button 
              variant="contained" 
              color="primary"
              onClick={handleContinuar}
            >
              Continuar a Resultados de Laboratorio
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default EntradaSintomas;