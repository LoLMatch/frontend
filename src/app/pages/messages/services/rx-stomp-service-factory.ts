import { myRxStompConfig } from '@app/config/websockets/rx-stomp.config';
import { RxStompService } from '@pages/messages/services/rx-stomp.service';

export function rxStompServiceFactory() {
  const rxStomp = new RxStompService();
  rxStomp.configure(myRxStompConfig);
  rxStomp.activate();
  return rxStomp;
}
