import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  params?: Record<string, string | number | boolean>;
  body?: unknown;
  headers?: HttpHeaders;
}

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  constructor(private http: HttpClient) {}

  request<T>(endpoint: string, options: ApiRequestOptions = {}): Observable<T> {
    const url = this.buildUrl(endpoint);
    const params = new HttpParams({ fromObject: this.normalizeParams(options.params) });

    return this.http.request<T>(options.method ?? 'GET', url, {
      body: options.body,
      params,
      headers: options.headers,
    });
  }

  private buildUrl(endpoint: string): string {
    const root = environment.apiBaseUrl.replace(/\/$/, '');
    const path = endpoint.replace(/^\//, '');
    return `${root}/${path}`;
  }

  private normalizeParams(params?: Record<string, string | number | boolean>): Record<string, string> {
    if (!params) {
      return {};
    }
    return Object.entries(params).reduce<Record<string, string>>((acc, [key, value]) => {
      acc[key] = String(value);
      return acc;
    }, {});
  }
}
