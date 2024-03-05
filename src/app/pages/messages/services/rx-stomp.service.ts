import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { RxStomp } from '@stomp/rx-stomp';

@Injectable({
  providedIn: 'root',
})
export class RxStompService {
  rxStomp: RxStomp;

  config = {
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

  init(token: string) {
    this.config.connectHeaders = {
      Authorization: 'Bearer ' + token
    };

    this.rxStomp = new RxStomp();
    this.rxStomp.configure(this.config);
    this.rxStomp.activate();
    return this.rxStomp;
  }
}
