import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import {
  handlerFunc,
  handlerFuncAsync,
} from '../../../library/functions/handler.function';
import { IAppConfig } from '../interfaces/appConfig.interface';
import { ILang } from '../interfaces/lang.interface';
import { getLocalStorage } from '../../../library/functions/storage.function';
import { LOADING_CONTEXT } from '../../../library/interceptors/loading.interceptor';
import { environment } from '../../../environments/environment';
import { IEnvironment } from '../../../environments/environment.interface';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private readonly http = inject(HttpClient);

  private readonly url: string = environment.appConfigUrl;
  private readonly keys: IEnvironment['LocalStorageKeys'] =
    environment.LocalStorageKeys;

  public currentLang = signal<LangEnum>(
    getLocalStorage<LangEnum>(this.keys.CURRENT_LANG, LangEnum.it),
  );
  public currentCursor = signal<string>(
    getLocalStorage<string>(this.keys.CURRENT_CURSOR, ''),
  );

  public config!: IAppConfig;
  public lang!: ILang;

  public async loadConfig(): Promise<void> {
    return handlerFuncAsync<IConfigService>({
      callHttp: () =>
        forkJoin({
          config: this.http.get<IAppConfig>(this.url),
          lang: this.http.get<ILang>(
            `assets/lang/lang.${this.currentLang()}.json`,
          ),
        }),
      nextCall: (data: IConfigService) => {
        this.config = data.config;
        this.lang = data.lang;
      },
    });
  }

  public changeLang(lingua: LangEnum): void {
    handlerFunc<ILang>({
      callHttp: () =>
        this.http.get<ILang>(`assets/lang/lang.${lingua}.json`, {
          context: new HttpContext().set(LOADING_CONTEXT, true),
        }),
      nextCall: (data: ILang) => {
        this.lang = data;
        this.currentLang.set(lingua);
      },
    });
  }
}

interface IConfigService {
  config: IAppConfig;
  lang: ILang;
}

export enum LangEnum {
  it = 'it',
  en = 'en',
}
