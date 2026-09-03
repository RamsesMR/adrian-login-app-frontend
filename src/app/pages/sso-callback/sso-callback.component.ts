import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sso-callback',
  standalone: true,
  imports: [],
  templateUrl: './sso-callback.component.html',
  styleUrls: ['./sso-callback.component.scss']
})
export class SsoCallbackComponent implements OnInit {

  mensaje = 'Procesando autenticación SSO...';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {

    const codigo = this.route.snapshot.queryParamMap.get('code');

    if (!codigo) {

      this.mensaje = 'Código SSO no recibido';

      return;
    }

    this.authService.callbackSso(codigo).subscribe({
      next: (respuesta) => {

        localStorage.setItem('token', respuesta.token);

        this.mensaje = 'Autenticación SSO correcta';

        console.log('SSO correcto', respuesta);
      },

      error: () => {

        this.mensaje = 'Error en la autenticación SSO';
      }
    });
  }

}