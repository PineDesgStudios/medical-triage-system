import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Paper, Typography, Box, TextField, Button,
  Chip, Grid, Divider, FormControlLabel, Switch,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Autocomplete
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import NavigationBar from './NavigationBar';

const ResultadosLaboratorio = () => {
  const { pacienteId } = useParams();
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState(null);
  const [tieneResultados, setTieneResultados] = useState(false);
  const [resultados, setResultados] = useState([
    { prueba: '', valor: '', unidad: '', referencia: '' }
  ]);

  // Lista predefinida de pruebas de laboratorio para autocompletado
  const pruebasLaboratorio = [
    { prueba: 'Hemoglobina', unidad: 'g/dL', referencia: '12-16' },
    { prueba: 'Hematocrito', unidad: '%', referencia: '37-47' },
    { prueba: 'Leucocitos', unidad: 'K/μL', referencia: '4.5-11.0' },
    { prueba: 'Plaquetas', unidad: 'K/μL', referencia: '150-450' },
    { prueba: 'Glucosa', unidad: 'mg/dL', referencia: '70-100' },
    { prueba: 'Creatinina', unidad: 'mg/dL', referencia: '0.6-1.2' },
    { prueba: 'Urea', unidad: 'mg/dL', referencia: '15-40' },
    { prueba: 'Sodio', unidad: 'mEq/L', referencia: '135-145' },
    { prueba: 'Potasio', unidad: 'mEq/L', referencia: '3.5-5.0' },
    { prueba: 'Cloro', unidad: 'mEq/L', referencia: '98-107' },
    { prueba: 'AST/TGO', unidad: 'U/L', referencia: '5-40' },
    { prueba: 'ALT/TGP', unidad: 'U/L', referencia: '7-56' },
    { prueba: 'Bilirrubina Total', unidad: 'mg/dL', referencia: '0.3-1.0' },
    { prueba: 'Proteína C Reactiva', unidad: 'mg/L', referencia: '< 5' },
    { prueba: 'Troponina I', unidad: 'ng/mL', referencia: '< 0.04' }
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

  const handleResultadoChange = (index, campo, valor) => {
    const nuevosResultados = [...resultados];
    nuevosResultados[index] = { ...nuevosResultados[index], [campo]: valor };
    setResultados(nuevosResultados);
  };

  const handlePruebaChange = (index, nuevaPrueba) => {
    const nuevosResultados = [...resultados];
    const pruebaEncontrada = pruebasLaboratorio.find(p => p.prueba === nuevaPrueba);
    
    if (pruebaEncontrada) {
      nuevosResultados[index] = { 
        ...nuevosResultados[index], 
        prueba: pruebaEncontrada.prueba,
        unidad: pruebaEncontrada.unidad,
        referencia: pruebaEncontrada.referencia
      };
    } else {
      nuevosResultados[index] = { 
        ...nuevosResultados[index], 
        prueba: nuevaPrueba,
        unidad: '',
        referencia: ''
      };
    }
    
    setResultados(nuevosResultados);
  };

  const agregarResultado = () => {
    setResultados([...resultados, { prueba: '', valor: '', unidad: '', referencia: '' }]);
  };

  const eliminarResultado = (index) => {
    if (resultados.length > 1) {
      const nuevosResultados = resultados.filter((_, i) => i !== index);
      setResultados(nuevosResultados);
    }
  };

  const estaFueraDeRango = (valor, referencia) => {
    if (!valor || !referencia || valor === '' || referencia === '') return false;
    
    // Analizar diferentes formatos de rangos de referencia
    if (referencia.includes('-')) {
      const [min, max] = referencia.split('-').map(parseFloat);
      const valNum = parseFloat(valor);
      return valNum < min || valNum > max;
    } else if (referencia.includes('<')) {
      const max = parseFloat(referencia.replace('<', '').trim());
      return parseFloat(valor) >= max;
    } else if (referencia.includes('>')) {
      const min = parseFloat(referencia.replace('>', '').trim());
      return parseFloat(valor) <= min;
    }
    
    return false;
  };

  const handleContinuar = () => {
    navigate(`/diagnostico/${pacienteId}`);
  };

  if (!paciente) {
    return <Typography>Cargando...</Typography>;
  }

  return (
    <>
      <NavigationBar title="Resultados de Laboratorio" backPath={`/sintomas/${pacienteId}`} />
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

          <FormControlLabel
            control={
              <Switch 
                checked={tieneResultados} 
                onChange={(e) => setTieneResultados(e.target.checked)} 
              />
            }
            label="Incluir resultados de laboratorio"
            sx={{ mb: 2 }}
          />

          {tieneResultados && (
            <>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Prueba</TableCell>
                      <TableCell>Valor</TableCell>
                      <TableCell>Unidad</TableCell>
                      <TableCell>Referencia</TableCell>
                      <TableCell width="50px"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {resultados.map((resultado, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Autocomplete
                            value={resultado.prueba}
                            onChange={(event, newValue) => handlePruebaChange(index, newValue)}
                            options={pruebasLaboratorio.map(p => p.prueba)}
                            freeSolo
                            size="small"
                            sx={{ width: 200 }}
                            renderInput={(params) => (
                              <TextField {...params} variant="standard" />
                            )}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            value={resultado.valor}
                            onChange={(e) => handleResultadoChange(index, 'valor', e.target.value)}
                            variant="standard"
                            size="small"
                            error={estaFueraDeRango(resultado.valor, resultado.referencia)}
                            sx={{ width: 80 }}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            value={resultado.unidad}
                            onChange={(e) => handleResultadoChange(index, 'unidad', e.target.value)}
                            variant="standard"
                            size="small"
                            sx={{ width: 80 }}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            value={resultado.referencia}
                            onChange={(e) => handleResultadoChange(index, 'referencia', e.target.value)}
                            variant="standard"
                            size="small"
                            sx={{ width: 100 }}
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton 
                            size="small" 
                            color="error" 
                            onClick={() => eliminarResultado(index)}
                            disabled={resultados.length === 1}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Button 
                startIcon={<AddIcon />} 
                onClick={agregarResultado}
                sx={{ mt: 2, mb: 2 }}
              >
                Agregar resultado
              </Button>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
                Nota: Los valores fuera del rango de referencia se marcarán en rojo.
              </Typography>
            </>
          )}

          {!tieneResultados && (
            <Typography variant="body1" sx={{ my: 4, textAlign: 'center', color: 'text.secondary' }}>
              No se han incluido resultados de laboratorio. Puede continuar al siguiente paso.
            </Typography>
          )}

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
            <Button 
              variant="outlined" 
              onClick={() => navigate(`/sintomas/${pacienteId}`)}
            >
              Volver
            </Button>
            <Button 
              variant="contained" 
              color="primary"
              onClick={handleContinuar}
            >
              Continuar a Diagnóstico
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default ResultadosLaboratorio;