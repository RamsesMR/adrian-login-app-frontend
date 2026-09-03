import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { SsoCallbackComponent } from './pages/sso-callback/sso-callback.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    }, {
        path: 'sso/callback',
        component: SsoCallbackComponent
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }
];