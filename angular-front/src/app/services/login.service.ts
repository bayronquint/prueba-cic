import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl: string = "http://localhost:8080/prueba-cic/api/auth"; 
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  constructor(private httpClient: HttpClient) {}

  public userlogin(email: string, password: string): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/login.php`, { email, password })
      .pipe(map(user => {
        this.setToken(user.name);  // Ajustar según la estructura de tu respuesta
        this.getLoggedInName.emit(true);
        return user;
      }));
  }

  public logout() {
    this.deleteToken();
    this.getLoggedInName.emit(false); // Emitir el evento de cierre de sesión
  }

  // Registro del usuario
  // Registro del usuario
public userregistration(name: string, email: string, password: string): Observable<any> {
  // Enviar los parámetros con los nombres correctos
  return this.httpClient.post<any>(`${this.baseUrl}/register.php`, { nombre: name, email, pwd: password })
    .pipe(map(user => {
      return user;
    }));
}


  // Métodos para manejar el token
  setToken(token: string) {
    try {
      if (this.isBrowser()) {
        localStorage.setItem('token', token);
        console.log('Token guardado correctamente:', token);
      }
    } catch (error) {
      console.error('Error al guardar el token en localStorage:', error);
    }
  }
  

  getToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem('token');
    }
    return null;
  }

  deleteToken() {
    if (this.isBrowser()) {
      localStorage.removeItem('token');
    }
  }

  isLoggedIn(): boolean {
    const userToken = this.getToken();
    return userToken !== null;
  }

  // Método para verificar si estamos en el navegador
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
