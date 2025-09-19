import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Grid, Paper, Typography, Button, Box,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, IconButton, TextField, InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import SortIcon from '@mui/icons-material/Sort';
import NavigationBar from './NavigationBar';

const Dashboard = () => {
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  
  // Simulación de datos de pacientes
  useEffect(() => {
    // En una aplicación real, estos datos vendrían de una API
    setPacientes([
      {
        id: '1',
        nombre: 'María González',
        edad: 45,
        horaLlegada: '14:30',
        nivelTriage: 'Urgente',
        sintomas: 'Dolor torácico, disnea',
      },
      {
        id: '2',
        nombre: 'Carlos Rodríguez',
        edad: 67,
        horaLlegada: '14:15',
        nivelTriage: 'Emergencia',
        sintomas: 'Alteración de consciencia, fiebre alta',
      },
      {
        id: '3',
        nombre: 'Ana Martínez',
        edad: 32,
        horaLlegada: '14:45',
        nivelTriage: 'Estándar',
        sintomas: 'Dolor abdominal, náuseas',
      },
      {
        id: '4',
        nombre: 'Juan López',
        edad: 28,
        horaLlegada: '13:50',
        nivelTriage: 'No urgente',
        sintomas: 'Cefalea leve, malestar general',
      },
    ]);
  }, []);

  const pacientesFiltrados = pacientes.filter(paciente =>
    paciente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    paciente.sintomas.toLowerCase().includes(busqueda.toLowerCase())
  );

  const getNivelTriageColor = (nivel) => {
    switch (nivel) {
      case 'Emergencia': return 'error';
      case 'Urgente': return 'warning';
      case 'Estándar': return 'info';
      case 'No urgente': return 'success';
      default: return 'default';
    }
  };

  return (
    <>
      <NavigationBar title="Panel Principal" />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <TextField
                placeholder="Buscar pacientes..."
                variant="outlined"
                size="small"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                sx={{ width: { xs: '60%', sm: '40%' } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => navigate('/registro-paciente')}
              >
                Nuevo Paciente
              </Button>
            </Box>
          </Grid>
          
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Pacientes en Espera
              </Typography>
              
              <TableContainer>
                <Table size="medium">
                  <TableHead>
                    <TableRow>
                      <TableCell>Paciente</TableCell>
                      <TableCell>Edad</TableCell>
                      <TableCell>Hora de Llegada</TableCell>
                      <TableCell>Nivel de Triage</TableCell>
                      <TableCell>Síntomas Principales</TableCell>
                      <TableCell>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pacientesFiltrados.map((paciente) => (
                      <TableRow key={paciente.id} hover>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
                            {paciente.nombre}
                          </Box>
                        </TableCell>
                        <TableCell>{paciente.edad} años</TableCell>
                        <TableCell>{paciente.horaLlegada}</TableCell>
                        <TableCell>
                          <Chip 
                            label={paciente.nivelTriage} 
                            color={getNivelTriageColor(paciente.nivelTriage)} 
                            size="small" 
                          />
                        </TableCell>
                        <TableCell>{paciente.sintomas}</TableCell>
                        <TableCell>
                          <Button 
                            variant="outlined" 
                            size="small"
                            onClick={() => navigate(`/triage/${paciente.id}`)}
                          >
                            Ver Detalle
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;