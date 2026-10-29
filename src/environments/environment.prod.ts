import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
  production: true,
  appConfigUrl: 'assets/data/appConfig.json',
  BE: {
    CS: 'http://localhost:5019/api/',
    PY: 'http://localhost:5000/api/',
    DB2: 'https://qxstdfesxeseopikjayt.supabase.co/rest/v1/',
  },
  LocalStorageKeys: {
    CURRENT_USER: 'currentUtente',
    ACCOUNTS_USER: 'accountsUtente',
    CURRENT_LANG: 'currentLingua',
    CURRENT_CURSOR: 'currentCursor',
  },
};
