import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  url = 'http://localhost:8080/prueba-cic/api/clientes';
  constructor(private http: HttpClient) { }

  obtenerClientes(): Observable<any>{
    return this.http.get(`${this.url}/seleccionar.php`)
  }

  obtenerDonde(idCliente: number): Observable<any>{
    return this.http.get(`${this.url}/seleccionar.php/?idCliente=` + idCliente)
  }

  eliminarCliente(idCliente: number): Observable<any>{
    return this.http.delete(`${this.url}/eliminar.php/?idCliente=` + idCliente)
  }

  agregarCliente(cliente: any): Observable<any>{
    return this.http.post(`${this.url}/agregar.php`, JSON.stringify(cliente))
  }
  
  editarCliente(cliente: any): Observable<any>{
    return this.http.put(`${this.url}/actualizar.php`, JSON.stringify(cliente))
  }
}
