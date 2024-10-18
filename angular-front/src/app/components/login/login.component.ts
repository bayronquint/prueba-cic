import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import {  } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  angForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.angForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}

  postdata() {
    this.loginService.userlogin(this.angForm.value.email, this.angForm.value.password)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/listar-clientes']); // Redirigir al listado de clientes si el login es exitoso
        },
        error => {
          alert('Nombre de usuario o contraseña incorrectos');
        }
      );
  }

  get email() { return this.angForm.get('email'); }
  get password() { return this.angForm.get('password'); }
}
