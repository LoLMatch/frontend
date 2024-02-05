import { ApiChatRoutes } from '@core/constants/api.chat.const';
import { RxStompConfig } from '@stomp/rx-stomp';

export const myRxStompConfig: RxStompConfig = {
  // Which server?
  brokerURL: ApiChatRoutes.WEBSOCKETS,

  // Headers
  // Typical keys: login, passcode, host
  connectHeaders: {
    lohin: 'bob',
    passcode: '1234',
    Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJscE0yWVV5RjF0N1RqM1c4NmV2SlRxRjRPYllpWk9vXzFPcDJteDBCLUEwIn0.eyJleHAiOjE3MDcwODkzMTYsImlhdCI6MTcwNzA4NzUxNiwianRpIjoiNmViNjRiMTAtYzI1ZS00YzVmLTg3YTgtNTFhZWI0YzAxZmY3IiwiaXNzIjoiaHR0cDovL2tleWNsb2FrOjg0NDMvcmVhbG1zL2xvbG1hdGNoIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjNkZjUyOGEyLThlNTktNDQ5NS1iZjA2LWIzZTgwOTZiMDliOSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImZyb250ZW5kIiwic2Vzc2lvbl9zdGF0ZSI6ImQ4Y2I2Yjk3LTNjYTUtNDQ5NS1hMTQ4LWM4ZjhmOWY2YmQ4MiIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImRlZmF1bHQtcm9sZXMtbG9sLW1hdGNoIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiZDhjYjZiOTctM2NhNS00NDk1LWExNDgtYzhmOGY5ZjZiZDgyIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhbm5hIn0.l1ERDb__8M5Rrh8pPq0KJdertDNzV7YH7tAVDb2qNHPFSnXnF_E1CzDU0xgcsMi5Y5dfZlv7zgBjaiObG3O_CloIvKsUBcyA1_hHSby3Tbngg5DplTM4q1xMtOZbU2Gl6V3pnZBZxHAataIHWTFc6aC9Jl00ZnxKbWAIdvPoo-gSR1xl99I138_eYiDIwKGZEMEPh3UI0AEHrSpRL4f_c2lG5qH1USAU9uHv1-QOEx3AiDqHCuFw6LGnzDWmd1UuWE_TQbEZzRthm4MnHYP6WRmzQvaYXseOQf16PcarqNzeIxISfyCgusgjFjNidoobSQ_42OU-3Xxd-HlaJXIiyw'
  },

  // How often to heartbeat?
  // Interval in milliseconds, set to 0 to disable
//   heartbeatIncoming: 0, // Typical value 0 - disabled
//   heartbeatOutgoing: 20000, // Typical value 20000 - every 20 seconds

//   // Wait in milliseconds before attempting auto reconnect
//   // Set to 0 to disable
//   // Typical value 500 (500 milli seconds)
//   reconnectDelay: 200,

  // Will log diagnostics on console
  // It can be quite verbose, not recommended in production
  // Skip this key to stop logging to console
  debug: (msg: string): void => {
    console.log(new Date(), msg);
  },
};
