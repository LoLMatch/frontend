import { Environment } from '@env/environment.interface';

export const environment: Environment = {
  production: false,
  httpBackend: "http://localhost:3000",
  httpChat: "http://localhost:8081",
  httpWebsockets: "ws://localhost:8081/websocket",
  httpKeycloak: "http://localhost:8443",
  httpBackendPython: "http://localhost:5000",
};
