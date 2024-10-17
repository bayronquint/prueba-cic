from flask import Flask, jsonify, request
from flask_cors import CORS  # Importa CORS
import requests

app = Flask(__name__)
CORS(app)  # Habilita CORS para todas las rutas

URL = "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/all-vehicles-model/records"

def obtenerCarro(marca, modelo, cantidad):
    params = {
        "select": "make, model, year, comb08, city08, highway08",
        "where": f"make='{marca}' OR model='{modelo}'" if modelo else f"make='{marca}'",
        "limit": cantidad
    }

    response = requests.get(URL, params=params)
    
    if response.status_code == 200:
        return response.json()
    else:
        return None

@app.route('/')
def home():
    return "Bienvenido a la API de Vehículos. Visita /vehiculos para obtener datos."

@app.route('/vehiculos', methods=['GET'])
def obtener_vehiculos():
    marca = request.args.get('marca')
    modelo = request.args.get('modelo', '')  # Modelo es opcional
    cantidad = request.args.get('cantidad', 5)  # Valor por defecto

    if not marca:
        return jsonify({"error": "El parámetro 'marca' es obligatorio"}), 400

    data = obtenerCarro(marca, modelo, cantidad)

    if data and 'results' in data:
        return jsonify(data['results'])
    else:
        return jsonify([]), 404  # Devolviendo un array vacío si no hay resultados

if __name__ == '__main__':
    app.run(debug=True)
