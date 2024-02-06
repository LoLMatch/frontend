import { AppComponent } from './app/app.component';
import { isDevMode, importProvidersFrom } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import appRouting from '@app/app.routing';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatFormFieldDefaultOptionsConfig } from '@app/config/material/form-field.config';
import { NgxsModule } from '@ngxs/store';
import { ChatState } from '@pages/messages/store/chat.store';

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, RouterModule.forRoot(appRouting), ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: !isDevMode(),
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        }),
            NgxsModule.forRoot([ChatState]),
        ),
        provideAnimations(),
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: MatFormFieldDefaultOptionsConfig,
        }
    ]
})
    .catch(err => console.error(err));
