export interface Environment {
  production: boolean,
  httpBackend: string;
  httpChat: string,
  httpWebsockets: string,
}

export type Profile = 'dev' | 'local' | 'prod' | 'test';
