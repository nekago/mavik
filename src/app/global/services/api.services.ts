import {Injectable} from "@angular/core";
import {HttpClient, HttpContext, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class ApiService {



  constructor(private http: HttpClient) {}

  public get<T>(
    url: string,
    params?:
      | HttpParams
      | {
      [param: string]:
        | string
        | number
        | boolean
        | ReadonlyArray<string | number | boolean>;
    }
  ): Observable<T> {
    return this.http.get<T>(`${environment.apiUrl}${url}`, {
      params: { ...params },
    });
  }

  public post<T>(
    url: string,
    body: any,
    options?: {
      headers?: HttpHeaders | {
        [header: string]: string | string[];
      };
      context?: HttpContext;
      observe?: 'body';
      params?: HttpParams | {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
      };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    }): Observable<T> {
    return this.http.post<T>(`${environment.apiUrl}${url}`, body, options);
  }

}
