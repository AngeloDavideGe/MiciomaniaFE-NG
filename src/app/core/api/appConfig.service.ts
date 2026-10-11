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

interface IConfigService {
  config: IAppConfig;
  lang: ILang;
}

export enum LangEnum {
  it = 'it',
  en = 'en',
}

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private http = inject(HttpClient);
  private readonly keys = environment.LocalStorageKeys;

  public currentLang = signal<LangEnum>(
    getLocalStorage<LangEnum>(this.keys.CURRENT_LANG, LangEnum.it),
  );
  public currentCursor = signal<string>(
    getLocalStorage<string>(this.keys.CURRENT_CURSOR, ''),
  );

  public config!: IAppConfig;
  public lang!: ILang;

  public loadConfig(): Promise<void> {
    return handlerFuncAsync<IConfigService>({
      callHttp: () =>
        forkJoin({
          config: this.http.get<IAppConfig>('assets/data/appConfig.json'),
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
