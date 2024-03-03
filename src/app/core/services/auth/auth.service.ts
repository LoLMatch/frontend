import { resolve } from '@angular/compiler-cli';
import { Injectable } from '@angular/core';
import { KEYCLOAK } from '@core/constants/keycloak.const';
import { KeycloakService } from 'keycloak-angular';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private keycloak: KeycloakService) {}

  login() {
    void this.keycloak.login();
  }

  register() {
    void this.keycloak.register();
  }

  logout() {
    void this.keycloak.logout(KEYCLOAK.REDIRECT_LOGOUT);
  }

  loadProfile(): Observable<any> {
    return from(new Promise<any>((resolve, reject) => {
      if (this.keycloak.isLoggedIn()) {
        this.keycloak
          .loadUserProfile()
          .then((data) => resolve(data))
          .catch((error) => console.log(error));
      } else {
        console.log('User is not logged in');
      }
    }));
  }

  getToken(): Observable<any> {
    return from(new Promise<any>((resolve, reject) => {
      if (this.keycloak.isLoggedIn()) {
        this.keycloak
          .getToken()
          .then((data) => resolve(data))
          .catch((error) => console.log(error));
      } else {
        console.log('User is not logged in');
      }
    }));
  }
}
