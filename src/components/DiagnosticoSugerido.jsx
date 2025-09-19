import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Paper, Typography, Box, Button, Chip, Grid,
  Divider, List, ListItem, ListItemText, ListItemIcon,
  TextField, Autocomplete, Card, CardContent, Rating
} from '@mui/material';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import DescriptionIcon from '@mui/icons-material/Description';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import NavigationBar from './NavigationBar';

const DiagnosticoSugerido = () => {
  const { pacienteId } = useParams();
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState(null);
  const [diagnosticosSeleccionados, setDiagnosticosSeleccionados] = useState([]);
  const [diagnosticoInput, setDiagnosticoInput] = useState('');
  const [observaciones, setObservaciones] = useState('');

  // Simulación de datos del paciente y diagnósticos
  useEffect(() => {
    // En una aplicación real, estos datos vendrían de una API
    setPaciente({
      id: pacienteId,
      nombre: 'María González',
      edad: 45,
      nivelTriage: 'Urgente',
      sintomas: ['Dolor torácico', 'Disnea', 'Sudoración'],
      resultadosLab: [
        { prueba: 'Troponina I', valor: '0.08', unidad: 'ng/mL', referencia: '< 0.04' },
        { prueba: 'CK-MB', valor: '14', unidad: 'U/L', referencia: '5-25' }
      ],
      diagnosticosSugeridos: [
        { 
          nombre: 'Síndrome Coronario Agudo', 
          probabilidad: 4, 
          urgencia: 'Alta',
          descripcion: 'Basado en dolor torácico, elevación de troponina y factores de riesgo.'
        },
        { 
          nombre: 'Angina Inestable', 
          probabilidad: 3, 
          urgencia: 'Alta',
          descripcion: 'Considerar por patrón de dolor y sintomatología, aunque marcadores cardíacos no muy elevados.'
        },
        { 
          nombre: 'Pericarditis Aguda', 
          probabilidad: 2, 
          urgencia: 'Media',
          descripcion: 'Posible aunque menos probable por ausencia de cambios ECG típicos.'
        }
      ]
    });
  }, [pacienteId]);

  // Lista de diagnósticos para autocompletado (en un sistema real sería mucho más extensa)
  const diagnosticos = [
    'Síndrome Coronario Agudo', 'Infarto Agudo de Miocardio', 'Angina Inestable',
    'Pericarditis Aguda', 'Miocarditis', 'Embolia Pulmonar', 'Neumonía',
    'Neumotórax', 'Disección Aórtica', 'Insuficiencia Cardíaca Aguda',
    'Crisis Hipertensiva', 'Reflujo Gastroesofágico', 'Espasmo Esofágico',
    'Síndrome de Hiperventilación', 'Ansiedad', 'Crisis de Pánico',
    'Dolor Musculoesquelético', 'Herpes Zoster', 'Costocondritis'
  ];

  const agregarDiagnostico = () => {
    if (diagnosticoInput && !diagnosticosSeleccionados.includes(diagnosticoInput)) {
      setDiagnosticosSeleccionados([...diagnosticosSeleccionados, diagnosticoInput]);
      setDiagnosticoInput('');
    }
  };

  const eliminarDiagnostico = (diagnostico) => {
    setDiagnosticosSeleccionados(
      diagnosticosSeleccionados.filter(d => d !== diagnostico)
    );
  };

  const handleGuardar = () => {
    // Aquí se guardarían los datos antes de finalizar
    // En una aplicación real, esto enviaría datos a una API
    alert('Diagnóstico guardado correctamente');
    navigate('/');
  };

  if (!paciente) {
    return <Typography>Cargando...</Typography>;
  }

  return (
    <>
      <NavigationBar title="Diagnóstico" backPath={`/laboratorio/${pacienteId}`} />
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
            Resumen del Caso
          </Typography>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2">Síntomas Principales:</Typography>
              <List dense>
                {paciente.sintomas.map((sintoma, index) => (
                  <ListItem key={index}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <ReportProblemIcon fontSize="small" color="warning" />
                    </ListItemIcon>
                    <ListItemText primary={sintoma} />
                  </ListItem>
                ))}
              </List>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2">Resultados Relevantes:</Typography>
              {paciente.resultadosLab && paciente.resultadosLab.length > 0 ? (
                <List dense>
                  {paciente.resultadosLab.map((resultado, index) => (
                    <ListItem key={index}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <DescriptionIcon fontSize="small" color="info" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={`${resultado.prueba}: ${resultado.valor} ${resultado.unidad}`} 
                        secondary={`Referencia: ${resultado.referencia}`}
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No se han registrado resultados de laboratorio.
                </Typography>
              )}
            </Grid>
          </Grid>

          <Typography variant="h6" gutterBottom>
            Diagnósticos Sugeridos
          </Typography>

          <Grid container spacing={2} sx={{ mb: 4 }}>
            {paciente.diagnosticosSugeridos.map((diagnostico, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" component="div" gutterBottom>
                      {diagnostico.nombre}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                        Probabilidad:
                      </Typography>
                      <Rating 
                        value={diagnostico.probabilidad} 
                        readOnly 
                        max={5}
                        size="small"
                      />
                    </Box>
                    
                    <Box sx={{ mb: 1.5 }}>
                      <Chip 
                        label={`Urgencia: ${diagnostico.urgencia}`}
                        color={
                          diagnostico.urgencia === 'Alta' ? 'error' : 
                          diagnostico.urgencia === 'Media' ? 'warning' : 'info'
                        }
                        size="small"
                      />
                    </Box>
                    
                    <Typography variant="body2">
                      {diagnostico.descripcion}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Typography variant="h6" gutterBottom>
            Diagnóstico del Médico
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', mb: 2 }}>
              <Autocomplete
                value={diagnosticoInput}
                onChange={(event, newValue) => setDiagnosticoInput(newValue)}
                options={diagnosticos}
                freeSolo
                fullWidth
                renderInput={(params) => (
                  <TextField {...params} label="Seleccione o escriba un diagnóstico" />
                )}
                sx={{ mr: 1 }}
              />
              <Button 
                variant="contained"
                onClick={agregarDiagnostico}
                disabled={!diagnosticoInput}
              >
                Agregar
              </Button>
            </Box>

            <Box sx={{ mb: 2 }}>
              {diagnosticosSeleccionados.map((diag, index) => (
                <Chip
                  key={index}
                  label={diag}
                  onDelete={() => eliminarDiagnostico(diag)}
                  color="primary"
                  icon={<LocalHospitalIcon />}
                  sx={{ m: 0.5 }}
                />
              ))}
            </Box>
          </Box>

          <TextField
            label="Observaciones y plan de tratamiento"
            multiline
            rows={4}
            fullWidth
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            margin="normal"
          />

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
            <Button 
              variant="outlined" 
              onClick={() => navigate(`/laboratorio/${pacienteId}`)}
            >
              Volver
            </Button>
            <Button 
              variant="contained" 
              color="primary"
              onClick={handleGuardar}
            >
              Guardar y Finalizar
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default DiagnosticoSugerido;