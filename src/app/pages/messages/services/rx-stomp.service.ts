import { Injectable } from '@angular/core';
import { AuthService } from '@core/services/auth/auth.service';
import { environment } from '@env/environment';
import { RxStomp } from '@stomp/rx-stomp';
import { Observable, Subject, async, from, switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RxStompService {

  constructor(
    private authService: AuthService
  ){
    this.init();
  }

  rxStomp: RxStomp;

  config ={
    brokerURL: environment.httpWebsockets,
    connectHeaders: {
      Authorization: 'Bearer '
    },
    heartbeatIncoming: 0,
    heartbeatOutgoing: 20000,
    reconnectDelay: 200,
    debug: (msg: string): void => {
      console.log(new Date(), msg);
    }
  };

  private rxStompSubject = new Subject<RxStomp>();

  async init() {
    const token = await this.authService.getToken();

    this.config.connectHeaders = {
      Authorization: 'Bearer ' + token
    };

    this.rxStomp = new RxStomp();
    this.rxStomp.configure(this.config);
    this.rxStomp.activate();
  }
    // this.authService.getToken().subscribe((token: string) => {
    //   this.config.connectHeaders = {
    //     Authorization: 'Bearer '+ token
    //   };
    //   this.rxStomp = new RxStomp();
    //   this.rxStomp.configure(this.config);
    //   this.rxStomp.activate();
    // });
    //---------------------------------------------------------------
    // this.authService.getToken()
    //   .pipe(
    //     switchMap((token: string) => {
    //       this.config.connectHeaders = {
    //         Authorization: 'Bearer ' + token
    //       };
    //       this.rxStomp = new RxStomp();
    //       this.rxStomp.configure(this.config);
    //       this.rxStomp.activate();
    //       return from(this.rxStomp.connected$.pipe(take(1))); // Czekaj na połączenie RxStomp
    //     })
    //   )
    //   .subscribe(() => {
    //     this.rxStompSubject.next(this.rxStomp);
    //   });


  stomp() {
    return this.rxStomp;
  }
}
