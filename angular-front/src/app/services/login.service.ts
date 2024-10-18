import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl: string = "http://localhost:8080/prueba-cic/api/auth"; // Cambia por tu URL correcta
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  constructor(private httpClient: HttpClient) {}

  // Login del usuario
  public userlogin(email: string, password: string): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/login.php`, { email, password })
      .pipe(map(user => {
        // Guardar el token en localStorage
        this.setToken(user[0].name); // O el campo que corresponda al token
        this.getLoggedInName.emit(true);
        return user;
      }));
  }

  // Registro del usuario
  public userregistration(name: string, email: string, password: string): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/register.php`, { name, email, password })
      .pipe(map(user => {
        return user;
      }));
  }

  // Métodos para manejar el token
  setToken(token: string) {
    if (this.isBrowser()) {
      localStorage.setItem('token', token);
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
