import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Paper, Typography, TextField, Button, Box,
  FormControlLabel, Checkbox, Link, Grid, Avatar
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const Login = () => {
  const navigate = useNavigate();
  const [credenciales, setCredenciales] = useState({
    email: '',
    password: '',
    recordar: false
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setCredenciales({
      ...credenciales,
      [name]: name === 'recordar' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // En una aplicación real, aquí se validarían las credenciales
    // contra un backend y se obtendría un token de autenticación
    navigate('/');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh'
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%', borderRadius: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56 }}>
              <LocalHospitalIcon fontSize="large" />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ mt: 1 }}>
              Sistema de Triage y Diagnóstico
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Acceso para Personal Médico
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electrónico"
              name="email"
              autoComplete="email"
              autoFocus
              value={credenciales.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              value={credenciales.password}
              onChange={handleChange}
            />
            <FormControlLabel
              control={
                <Checkbox 
                  value="recordar" 
                  name="recordar"
                  color="primary" 
                  checked={credenciales.recordar}
                  onChange={handleChange}
                />
              }
              label="Recordar mis datos"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
            >
              Ingresar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  ¿Olvidaste tu contraseña?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  Contactar a soporte
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
        
        <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
          © {new Date().getFullYear()} Sistema de Triage Hospitalario. Todos los derechos reservados.
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;