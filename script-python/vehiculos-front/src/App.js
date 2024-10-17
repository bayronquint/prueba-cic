import React, { useState } from 'react';
import axios from 'axios';
import DataTable from './components/DataTable'; // Importa el componente DataTable
import { TextField, Button, Typography, Alert, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Circles } from 'react-loader-spinner';

function App() {
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [cantidad, setCantidad] = useState(5);
  const [vehiculos, setVehiculos] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [tipoEficiencia, setTipoEficiencia] = useState('Eficiencia Comb. Ciudad');
  const [vehiculoMasEficiente, setVehiculoMasEficiente] = useState(null);

  const obtenerVehiculos = async () => {
    setLoading(true);
    setVehiculoMasEficiente(null);
    try {
      const response = await axios.get('http://127.0.0.1:5000/vehiculos', {
        params: {
          marca,
          modelo,
          cantidad,
        },
      });
      setVehiculos(response.data);
      setError('');
      calcularMasEficiente(response.data);
    } catch (err) {
      setError('Error al obtener los vehículos');
      setVehiculos([]);
    }
    setLoading(false);
  };

  const calcularMasEficiente = (datosVehiculos) => {
    if (datosVehiculos.length === 0) {
      setVehiculoMasEficiente(null);
      return;
    }

    let mejorVehiculo = null;
    let mejorValor = -Infinity;

    datosVehiculos.forEach((vehiculo) => {
      let valorActual = 0;
      switch (tipoEficiencia) {
        case 'Eficiencia Comb. Ciudad':
          valorActual = vehiculo.city08 || 0;
          break;
        case 'Eficiencia Comb. Mixta':
          valorActual = vehiculo.comb08 || 0;
          break;
        case 'Eficiencia Comb. Carretera':
          valorActual = vehiculo.highway08 || 0;
          break;
        default:
          break;
      }
      if (valorActual > mejorValor) {
        mejorValor = valorActual;
        mejorVehiculo = vehiculo;
      }
    });

    setVehiculoMasEficiente(mejorVehiculo);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <Typography variant="h4" gutterBottom className="text-purple-600 mb-8 text-center">
        Consulta de Vehículos
      </Typography>

      {/* Fila 1: Formulario y Vehículo más eficiente */}
      <div className="flex flex-col md:flex-row w-full max-w-6xl gap-8 justify-center mb-10">
        {/* Columna Izquierda: Formulario */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2 flex flex-col">
          <div className="mb-4 w-full">
            <TextField
              label="Marca"
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              variant="outlined"
              className="w-full"
            />
          </div>
          <div className="mb-4 w-full">
            <TextField
              label="Modelo"
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
              variant="outlined"
              className="w-full"
            />
          </div>
          <div className="mb-4 w-full">
            <TextField
              label="Cantidad"
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              variant="outlined"
              className="w-full"
            />
          </div>
          <button
            onClick={obtenerVehiculos}
            variant="contained"
            className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
          >
            Buscar Vehículos
          </button>
        </div>

        {/* Columna Derecha: Vehículo más eficiente */}
        <div className="bg-green-100 p-6 rounded-lg w-full md:w-1/2 flex flex-col shadow-md">
          <div className="mb-4 w-full">
            <FormControl variant="outlined" className="w-full">
              <InputLabel>Tipo de Eficiencia</InputLabel>
              <Select
                value={tipoEficiencia}
                onChange={(e) => {
                  setTipoEficiencia(e.target.value);
                  if (vehiculos.length > 0) {
                    calcularMasEficiente(vehiculos);
                  }
                }}
                label="Tipo de Eficiencia"
              >
                <MenuItem value="Eficiencia Comb. Ciudad">Eficiencia en Ciudad</MenuItem>
                <MenuItem value="Eficiencia Comb. Mixta">Eficiencia Combinada</MenuItem>
                <MenuItem value="Eficiencia Comb. Carretera">Eficiencia en Carretera</MenuItem>
              </Select>
            </FormControl>
          </div>
          {vehiculoMasEficiente ? (
            <>
              <Typography variant="h6" gutterBottom className="text-green-800">
                Vehículo Más Eficiente ({tipoEficiencia}):
              </Typography>
              <Typography variant="body1" className='text-left p-1'>
                Marca: {vehiculoMasEficiente.make} <br />
                Modelo: {vehiculoMasEficiente.model} <br />
                Año: {vehiculoMasEficiente.year} <br />
                {tipoEficiencia}: {
                  tipoEficiencia === 'Eficiencia Comb. Ciudad' ? vehiculoMasEficiente.city08 :
                  tipoEficiencia === 'Eficiencia Comb. Mixta' ? vehiculoMasEficiente.comb08 :
                  vehiculoMasEficiente.highway08
                }
              </Typography>
            </>
          ) : (
            <Typography variant="body1" className="text-gray-600 text-center">
              No se ha calculado el vehículo más eficiente aún.
            </Typography>
          )}
        </div>
      </div>

      {/* Fila 2: Tabla de Resultados */}
      <div className="w-full max-w-6xl">
  {error ? (
    <Alert severity="error" className="mb-10">
      {error}
    </Alert>
  ) : loading ? (
    <div className="flex justify-center items-center mt-20">
      <Circles height="80" width="80" color="purple" />
    </div>
  ) : (
    vehiculos.length > 0 && (
      <div className="mt-6">
        <DataTable data={vehiculos} />
      </div>
    )
  )}
</div>

    </div>
  );
}

export default App;
