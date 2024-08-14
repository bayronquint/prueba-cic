import requests
import tabulate

URL = "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/all-vehicles-model/records?select=make%2C%20model%2C%20year%2C%20comb08%2C%20city08%2C%20highway08"

# Funciones
def obtenerCarro(marca, modelo, cantidad):
    response = requests.get(URL + f"&where=make=%27{marca}%27%20OR%20model%3D%27{modelo}%27&limit={cantidad}")
    if response.status_code == 200:
        print('Solicitud exitosa')
        data = response.json()
        return data
    else:
        print(f"Error {response.status_code}: No se pudo obtener los datos de los vehículos.")
        return None  

def procesarDatos(data):
    if data and 'results' in data:
        vehiculos = [
            {
            'Marca': result.get('make'),
            'Modelo': result.get('model'),
            'Año': result.get('year'),
            'Eficiencia Comb. Mixta': result.get('comb08'),
            'Eficiencia Comb. Ciudad': result.get('city08'),
            'Eficiencia Comb. Pista': result.get('highway08')
            }
            for result in data['results']
        ]
        return vehiculos
    return []

def mejorEficienciaCombinada(vehiculos, criterio='Eficiencia Comb. Mixta'):
    mejor_vehiculo = None
    mejor_eficiencia = -float('inf') 
    
    for vehiculo in vehiculos:
        eficiencia = vehiculo.get(criterio, 0)
        if eficiencia > mejor_eficiencia:
            mejor_eficiencia = eficiencia
            mejor_vehiculo = vehiculo
    
    return mejor_vehiculo

def mejorEficienciaCiudad(vehiculos, criterio='Eficiencia Comb. Ciudad'):
    mejor_vehiculo = None
    mejor_eficiencia = -float('inf') 
    
    for vehiculo in vehiculos:
        eficiencia = vehiculo.get(criterio, 0)
        if eficiencia > mejor_eficiencia:
            mejor_eficiencia = eficiencia
            mejor_vehiculo = vehiculo
    
    return mejor_vehiculo

def mejorEficienciaPista(vehiculos, criterio='Eficiencia Comb. Pista'):
    mejor_vehiculo = None
    mejor_eficiencia = -float('inf') 
    
    for vehiculo in vehiculos:
        eficiencia = vehiculo.get(criterio, 0)
        if eficiencia > mejor_eficiencia:
            mejor_eficiencia = eficiencia
            mejor_vehiculo = vehiculo
    
    return mejor_vehiculo

def exec():
    recomendados = []  # Lista para guardar vehículos recomendados

    while True:
        cantidad = input('Ingrese cuantos vehículos desea: ')
        marca = input('Ingrese la marca del vehículo que desea: ')
        modelo = input('Ingrese el modelo que desea (Pulse ENTER si no desea ningún modelo): ') 

        data = obtenerCarro(marca, modelo, cantidad)
        vehiculos_lista = procesarDatos(data)

        if vehiculos_lista:
            print("\nLista de vehículos:")
            print(tabulate.tabulate(vehiculos_lista, headers="keys", tablefmt="grid"))

            num = int(input('Elija su opción:\n1. El más eficiente en pista \n2. El más eficiente en ciudad \n3. El más equilibrado \n'))
            match num:
                case 1:
                    mejor_vehiculo = mejorEficienciaPista(vehiculos_lista)
                    print("Vehículo con mejor eficiencia de combustible en pista: \nMarca:", mejor_vehiculo.get('Marca'), '\nModelo:', mejor_vehiculo.get('Modelo'), '\nAño:', mejor_vehiculo.get('Año'), '\nEficiencia de combustible en pista:', mejor_vehiculo.get('Eficiencia Comb. Pista'))
                    recomendados.append(mejor_vehiculo)
                case 2:
                    mejor_vehiculo = mejorEficienciaCiudad(vehiculos_lista)
                    print("Vehículo con mejor eficiencia de combustible en ciudad: \nMarca:", mejor_vehiculo.get('Marca'), '\nModelo:', mejor_vehiculo.get('Modelo'), '\nAño:', mejor_vehiculo.get('Año'), '\nEficiencia de combustible en ciudad:', mejor_vehiculo.get('Eficiencia Comb. Ciudad'))
                    recomendados.append(mejor_vehiculo)
                case 3:
                    mejor_vehiculo = mejorEficienciaCombinada(vehiculos_lista)
                    print("Vehículo con mejor eficiencia de combustible combinada: \nMarca:", mejor_vehiculo.get('Marca'), '\nModelo:', mejor_vehiculo.get('Modelo'), '\nAño:', mejor_vehiculo.get('Año'), '\nEficiencia de combustible combinada:', mejor_vehiculo.get('Eficiencia Comb. Mixta'))
                    recomendados.append(mejor_vehiculo)
                case _:
                    print("Opción inválida.")

        else:
            print("No se encontraron vehículos para mostrar.")

        continuar = input('¿Desea continuar? (1 para sí, 0 para no): ')
        if continuar == '0':
            print("\nVehículos recomendados:")
            print(tabulate.tabulate(recomendados, headers="keys", tablefmt="grid"))
            break

# Ejecución
exec()
