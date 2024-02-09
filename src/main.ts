import { AppComponent } from './app/app.component';
import { isDevMode, importProvidersFrom, APP_INITIALIZER } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import appRouting from '@app/app.routing';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatFormFieldDefaultOptionsConfig } from '@app/config/material/form-field.config';
import { NgxsModule } from '@ngxs/store';
import { ChatState } from '@pages/messages/store/chat.store';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { environment } from '@env/environment';
import { KEYCLOAK } from '@core/constants/keycloak.const';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: environment.httpKeycloak,
        realm: KEYCLOAK.REALM,
        clientId: KEYCLOAK.CLIENT_ID,
      },
      initOptions: {
        redirectUri: KEYCLOAK.REDIRECT_LOGIN,
      },
    });
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      RouterModule.forRoot(appRouting),
      KeycloakAngularModule,
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: !isDevMode(),
        // Register the ServiceWorker as soon as the application is stable
        // or after 30 seconds (whichever comes first).
        registrationStrategy: 'registerWhenStable:30000',
      }),
      NgxsModule.forRoot([ChatState])
    ),
    provideAnimations(),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: MatFormFieldDefaultOptionsConfig,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
}).catch((err) => console.error(err));
