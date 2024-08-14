# Prueba técnica para Creative Innovation Company - Brandon Quintero Tobón
Este proyecto consta de tres componentes principales:

Front-end: Aplicación en Angular

Back-end: API en PHP

Script de Python: Análisis y procesamiento de datos

## Requisitos Previos
Antes de comenzar, asegúrate de tener instalados los siguientes programas:

Node.js (incluye npm)

PHP

Python

MySQL (para la base de datos)

## Configuración del Proyecto
### 1. Configuración del Front-end (Angular)
#### 1. Instalar dependencias de Angular:
1. Navega al directorio de
bash
Copiar código
npm install
Iniciar la aplicación Angular:

Para iniciar la aplicación en modo de desarrollo, ejecuta:

bash
Copiar código
ng serve
La aplicación estará disponible en http://localhost:4200/.

2. Configuración del Back-end (PHP)
Importar base de datos:

Importa el archivo de base de datos proporcionado (database.sql) a tu servidor MySQL usando herramientas como phpMyAdmin o mediante línea de comandos:

bash
Copiar código
mysql -u [usuario] -p [nombre_base_de_datos] < database.sql
Colocar el directorio en htdocs:

Copia el directorio del proyecto PHP a la carpeta htdocs de tu servidor Apache (en sistemas basados en XAMPP/WAMP, esta carpeta se encuentra en el directorio de instalación del servidor).

Configurar la conexión a la base de datos:

Edita el archivo de configuración en PHP para asegurarte de que los detalles de la conexión a la base de datos (localhost, usuario, contraseña, nombre_base_de_datos) sean correctos.

Iniciar el servidor Apache:

Asegúrate de que el servidor Apache esté corriendo para que el API en PHP esté disponible.

3. Configuración del Script de Python
Instalar dependencias de Python:

Si aún no lo has hecho, instala la biblioteca requests y tabulate para Python usando:

bash
Copiar código
pip install requests tabulate
Ejecutar el script de Python:

Asegúrate de tener el script de Python guardado en un archivo, por ejemplo, vehiculos.py. Luego, ejecuta el script con:

bash
Copiar código
python vehiculos.py
Sigue las instrucciones en la consola para ingresar los datos y obtener los resultados.

Instrucciones para el Calificador
Base de Datos: Importar la base de datos en MySQL.
Front-end: Navegar al directorio del proyecto Angular, ejecutar npm install, y luego iniciar el servidor Angular con ng serve.
Back-end: Copiar el directorio del proyecto PHP a htdocs, configurar la conexión a la base de datos y asegurarse de que el servidor Apache esté corriendo.
Python: Instalar las dependencias necesarias (requests, tabulate), y ejecutar el script de Python.
Notas Adicionales
Configuración del entorno: Asegúrate de que todos los servicios (Apache, MySQL, Node.js) estén corriendo correctamente y que las rutas y configuraciones sean correctas.
Verificación: Para el front-end y el back-end, asegúrate de que las URLs y rutas estén correctamente configuradas para la comunicación entre Angular y PHP.
Si encuentras algún problema, revisa los logs del servidor y la consola para obtener detalles adicionales.
