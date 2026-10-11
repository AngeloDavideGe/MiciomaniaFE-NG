export interface IEnvironment {
  production: boolean;
  BE: {
    CS: string;
    PY: string;
    DB2: string;
  };
  LocalStorageKeys: {
    CURRENT_USER: string;
    ACCOUNTS_USER: string;
    CURRENT_LANG: string;
    CURRENT_CURSOR: string;
  };
}
