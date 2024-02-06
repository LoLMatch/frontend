import { ApiChatRoutes } from '@core/constants/api.chat.const';
import { RxStompConfig } from '@stomp/rx-stomp';

export const myRxStompConfig: RxStompConfig = {
  brokerURL: ApiChatRoutes.WEBSOCKETS,
  connectHeaders: {
    Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJscE0yWVV5RjF0N1RqM1c4NmV2SlRxRjRPYllpWk9vXzFPcDJteDBCLUEwIn0.eyJleHAiOjE3MDcyMzQ0NzQsImlhdCI6MTcwNzIzNDE3NCwianRpIjoiNDhmNWIyYjktMTIwYi00MGM2LWI0ZTUtMTk2NzY2ODA5NWFhIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4NDQzL3JlYWxtcy9sb2xtYXRjaCIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJmZDBhNjdjYS0xZmU3LTQ3NTktODU0Yi00YmEwYTFhYzgxOGUiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJmcm9udGVuZCIsInNlc3Npb25fc3RhdGUiOiI0YzY1NDM4My1lNGU4LTQyNGItOWNkMy05M2RmMDlhZjkwYTUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJkZWZhdWx0LXJvbGVzLWxvbC1tYXRjaCJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6IjRjNjU0MzgzLWU0ZTgtNDI0Yi05Y2QzLTkzZGYwOWFmOTBhNSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoiYm9iIn0.XHAMKBtKMwmgwm477Qa49_8zpuW15Oe-10_J-dU0qnvIR5XcFgGxUUuQllfFKxFqnEQEnROcFo9-NLM4QxlWxMSCGuk2PCEn0TAq9VWO-af6v6oY5kFOpXhl-NEgudaGx4k9BfYRvfVGSyELgUuOi6c3EBQCb2qgFTyuwV6xXS2cGVQBjRHgPKKfkjJDneuMoHlPsYf02ayCxefSBKc6A9sx1qKa76OXQpCOaoC5cB7qd6ZP3HG_M4jj_mDXA5Q9pp4japTQ3e85ksCiMw4CDV_SycGRdCFWgGrtPR0aMZmnh2BQ3JiBf7lBQcWbLc0ZPk_tPvg3wupc1gTHKEeSCg'
  },
  heartbeatIncoming: 0,
  heartbeatOutgoing: 20000,
  reconnectDelay: 200,
  debug: (msg: string): void => {
    console.log(new Date(), msg);
  },
};
