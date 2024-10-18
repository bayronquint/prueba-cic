import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  angForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dataService: LoginService,
    private router: Router
  ) {
    this.angForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      nombre: ['', Validators.required],
      mobile: ['', Validators.required]
    });
  }

  ngOnInit() {}

  postdata() {
    if (this.angForm.valid) {
      this.dataService.userregistration(
        this.angForm.value.nombre,
        this.angForm.value.email,
        this.angForm.value.password
      )
        .pipe(first())
        .subscribe(
          data => {
            this.router.navigate(['login']); // Redirigir al login tras registrarse
          },
          error => {
            console.error('Error en el registro', error); // Manejar errores
          }
        );
    }
  }

  // Getters para los campos del formulario
  get email() { return this.angForm.get('email'); }
  get password() { return this.angForm.get('password'); }
  get nombre() { return this.angForm.get('nombre'); }
}
