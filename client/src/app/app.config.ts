import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
<<<<<<< HEAD
import { provideHttpClient } from '@angular/common/http';
=======
import { HttpClient, provideHttpClient } from '@angular/common/http';
>>>>>>> login/register

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
<<<<<<< HEAD
    provideRouter(routes, withComponentInputBinding()),
=======
    provideRouter(routes),
>>>>>>> login/register
    provideHttpClient(),
  ],
};
