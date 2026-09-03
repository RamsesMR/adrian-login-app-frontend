import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  mensajeError = '';

  formulario = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });

  constructor(
    private authService: AuthService
  ) {}

  login() {

    if (this.formulario.invalid) {

      this.formulario.markAllAsTouched();

      return;
    }

    const datos = {
      email: this.formulario.value.email || '',
      password: this.formulario.value.password || ''
    };

    this.authService.login(datos).subscribe({
      next: (respuesta) => {

        localStorage.setItem('token', respuesta.token);

        console.log('Login correcto', respuesta);

        this.mensajeError = '';
      },

      error: () => {

        this.mensajeError = 'Correo electrónico o contraseña incorrectos';
      }
    });
  }

  iniciarSso() {

    this.authService.iniciarSso();
  }

}