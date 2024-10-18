import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service'; // Asegúrate de que la ruta de ApiService sea correcta
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
  loginbtn: boolean;
  logoutbtn: boolean;

  constructor(private loginService: LoginService, private router: Router) {
    // Subscribirse a los cambios de estado de login
    this.loginService.getLoggedInName.subscribe(name => this.changeName(name));

    // Verificar si el usuario está logueado al inicializar
    if (this.loginService.isLoggedIn()) {
      this.loginbtn = false;
      this.logoutbtn = true;
    } else {
      this.loginbtn = true;
      this.logoutbtn = false;
    }
  }

  private changeName(name: boolean): void {
    this.logoutbtn = name;
    this.loginbtn = !name;
  }

  logout() {
    this.loginService.deleteToken();
    this.router.navigate(['/login']);  // Redirigir al login tras logout
  }
}
