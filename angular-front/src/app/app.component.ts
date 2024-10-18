import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loginbtn: boolean = true;
  logoutbtn: boolean = false;

  constructor(private loginService: LoginService, private router: Router) {
    // Escuchar cambios en el estado de autenticación
    this.loginService.getLoggedInName.subscribe(isLoggedIn => {
      this.updateLoginState(isLoggedIn);
    });

    // Inicializar el estado del login
    this.updateLoginState(this.loginService.isLoggedIn());
  }

  private updateLoginState(isLoggedIn: boolean): void {
    this.loginbtn = !isLoggedIn;
    this.logoutbtn = isLoggedIn;
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']); // Redirigir al login tras logout
  }
}
