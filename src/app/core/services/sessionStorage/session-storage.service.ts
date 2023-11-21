import { Injectable } from '@angular/core';
import { KeyStorage } from '@core/enums/key-storage.enum';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  public setItem<T>(key: KeyStorage, value: T): void {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }

  public getItem<T>(key: KeyStorage): T {
    const retrievedObject = window.sessionStorage.getItem(key);

    if (retrievedObject === null) {
      return {} as T;
    }

    return JSON.parse(retrievedObject) as T;
  }

  public removeItem(key: KeyStorage): void {
    window.sessionStorage.removeItem(key);
  }

  public clear(): void {
    window.sessionStorage.clear();
  }

  public key(index: number): string {
    return window.sessionStorage.key(index);
  }

}
