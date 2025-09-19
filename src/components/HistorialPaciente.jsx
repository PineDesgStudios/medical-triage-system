import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Paper, Typography, Box, Chip, Divider,
  List, ListItem, ListItemText, ListItemIcon,
  Accordion, AccordionSummary, AccordionDetails,
  Button, Grid, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Tab, Tabs
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ReceiptIcon from '@mui/icons-material/Receipt';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import NavigationBar from './NavigationBar';

const HistorialPaciente = () => {
  const { pacienteId } = useParams();
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  // Simulación de carga de datos del paciente
  useEffect(() => {
    // En una aplicación real, estos datos vendrían de una API
    setPaciente({
      id: pacienteId,
      nombre: 'María González',
      edad: 45,
      fechaNacimiento: '1978-05-15',
      genero: 'Femenino',
      numeroIdentificacion: '23456789',
      alergias: 'Penicilina, Aspirina',
      visitas: [
        {
          id: 1,
          fecha: '2023-05-10',
          nivelTriage: 'Urgente',
          motivoConsulta: 'Dolor torácico',
          diagnostico: 'Síndrome Coronario Agudo',
          medico: 'Dr. Rodríguez',
          signos: {
            presionArterial: '150/90',
            frecuenciaCardiaca: '95',
            temperatura: '37.2',
            saturacionOxigeno: '94'
          },
          sintomas: ['Dolor torácico', 'Disnea', 'Sudoración'],
          resultadosLab: [
            { prueba: 'Troponina I', valor: '0.08', unidad: 'ng/mL', referencia: '< 0.04' },
            { prueba: 'CK-MB', valor: '14', unidad: 'U/L', referencia: '5-25' }
          ],
          tratamiento: 'Aspirina 100mg, Clopidogrel 75mg, Atorvastatina 40mg'
        },
        {
          id: 2,
          fecha: '2023-01-23',
          nivelTriage: 'Estándar',
          motivoConsulta: 'Fiebre y dolor abdominal',
          diagnostico: 'Gastroenteritis aguda',
          medico: 'Dra. Gómez',
          signos: {
            presionArterial: '120/80',
            frecuenciaCardiaca: '88',
            temperatura: '38.5',
            saturacionOxigeno: '98'
          },
          sintomas: ['Fiebre', 'Dolor abdominal', 'Náuseas', 'Vómitos'],
          resultadosLab: [
            { prueba: 'Leucocitos', valor: '12.3', unidad: 'K/μL', referencia: '4.5-11.0' }
          ],
          tratamiento: 'Paracetamol 500mg, Hidratación oral, Dieta blanda'
        }
      ],
      medicacionActual: 'Aspirina 100mg diario, Atorvastatina 20mg diario',
      antecedentes: 'Hipertensión arterial, Dislipidemia'
    });
  }, [pacienteId]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (!paciente) {
    return <Typography>Cargando...</Typography>;
  }

  return (
    <>
      <NavigationBar title="Historial del Paciente" backPath={`/triage/${pacienteId}`} />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              {paciente.nombre}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {paciente.edad} años | {paciente.genero} | Nacimiento: {new Date(paciente.fechaNacimiento).toLocaleDateString('es-ES')}
            </Typography>
            
            {paciente.alergias && (
              <Box sx={{ mt: 1 }}>
                <Chip 
                  label={`Alergias: ${paciente.alergias}`} 
                  color="error" 
                  variant="outlined"
                  size="small"
                />
              </Box>
            )}
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Box sx={{ width: '100%' }}>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange} 
              variant="fullWidth" 
              sx={{ mb: 3 }}
            >
              <Tab label="Visitas Anteriores" />
              <Tab label="Información Médica" />
            </Tabs>
          </Box>

          {activeTab === 0 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Historial de Visitas
              </Typography>
              
              {paciente.visitas.map((visita) => (
                <Accordion key={visita.id} sx={{ mb: 2 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <EventNoteIcon sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography>{new Date(visita.fecha).toLocaleDateString('es-ES')}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ mr: 1 }}>
                          {visita.diagnostico}
                        </Typography>
                        <Chip 
                          label={visita.nivelTriage} 
                          color={
                            visita.nivelTriage === 'Emergencia' ? 'error' : 
                            visita.nivelTriage === 'Urgente' ? 'warning' : 
                            visita.nivelTriage === 'Estándar' ? 'info' : 'success'
                          }
                          size="small"
                        />
                      </Box>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2">Motivo de Consulta:</Typography>
                        <Typography variant="body2" gutterBottom>
                          {visita.motivoConsulta}
                        </Typography>
                        
                        <Typography variant="subtitle2" sx={{ mt: 1 }}>Diagnóstico:</Typography>
                        <Typography variant="body2" gutterBottom>
                          {visita.diagnostico}
                        </Typography>
                        
                        <Typography variant="subtitle2" sx={{ mt: 1 }}>Médico Tratante:</Typography>
                        <Typography variant="body2" gutterBottom>
                          {visita.medico}
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2">Signos Vitales:</Typography>
                        <List dense>
                          <ListItem>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <MonitorHeartIcon fontSize="small" color="primary" />
                            </ListItemIcon>
                            <ListItemText 
                              primary={`Presión arterial: ${visita.signos.presionArterial} mmHg`} 
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <MonitorHeartIcon fontSize="small" color="primary" />
                            </ListItemIcon>
                            <ListItemText 
                              primary={`Frecuencia cardíaca: ${visita.signos.frecuenciaCardiaca} lpm`} 
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <MonitorHeartIcon fontSize="small" color="primary" />
                            </ListItemIcon>
                            <ListItemText 
                              primary={`Temperatura: ${visita.signos.temperatura} °C`} 
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <MonitorHeartIcon fontSize="small" color="primary" />
                            </ListItemIcon>
                            <ListItemText 
                              primary={`Saturación O₂: ${visita.signos.saturacionOxigeno} %`} 
                            />
                          </ListItem>
                        </List>
                      </Grid>
                      
                      <Grid item xs={12}>
                        <Divider sx={{ my: 1 }} />
                        
                        <Typography variant="subtitle2">Síntomas:</Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, my: 1 }}>
                          {visita.sintomas.map((sintoma, index) => (
                            <Chip 
                              key={index}
                              label={sintoma}
                              size="small"
                              variant="outlined"
                            />
                          ))}
                        </Box>
                        
                        {visita.resultadosLab && visita.resultadosLab.length > 0 && (
                          <>
                            <Typography variant="subtitle2" sx={{ mt: 2 }}>Resultados de Laboratorio:</Typography>
                            <TableContainer sx={{ mt: 1 }}>
                              <Table size="small">
                                <TableHead>
                                  <TableRow>
                                    <TableCell>Prueba</TableCell>
                                    <TableCell>Valor</TableCell>
                                    <TableCell>Unidad</TableCell>
                                    <TableCell>Referencia</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {visita.resultadosLab.map((resultado, index) => (
                                    <TableRow key={index}>
                                      <TableCell>{resultado.prueba}</TableCell>
                                      <TableCell>{resultado.valor}</TableCell>
                                      <TableCell>{resultado.unidad}</TableCell>
                                      <TableCell>{resultado.referencia}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </>
                        )}
                        
                        <Typography variant="subtitle2" sx={{ mt: 2 }}>Tratamiento:</Typography>
                        <Typography variant="body2">
                          {visita.tratamiento}
                        </Typography>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          )}

          {activeTab === 1 && (
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Información Personal
                  </Typography>
                  
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <MedicalInformationIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Nombre completo" 
                        secondary={paciente.nombre} 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <MedicalInformationIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Fecha de nacimiento" 
                        secondary={new Date(paciente.fechaNacimiento).toLocaleDateString('es-ES')} 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <MedicalInformationIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Género" 
                        secondary={paciente.genero} 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <MedicalInformationIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Identificación" 
                        secondary={paciente.numeroIdentificacion} 
                      />
                    </ListItem>
                  </List>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Información Médica
                  </Typography>
                  
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <ReceiptIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Medicación actual" 
                        secondary={paciente.medicacionActual || "No registrada"} 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <ReceiptIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Alergias" 
                        secondary={paciente.alergias || "No registradas"} 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <ReceiptIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Antecedentes" 
                        secondary={paciente.antecedentes || "No registrados"} 
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Box>
          )}

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
              onClick={() => navigate('/')}
            >
              Ir al Dashboard
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default HistorialPaciente;