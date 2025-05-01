// src/app/services/config.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ConfigService {
    private config: any;

    constructor(private http: HttpClient) {}

    loadConfig(): Promise<any> {
        return this.http.get('/assets/config.json')
            .toPromise()
            .then(data => this.config = data);
    }

    get messageApiUrl(): string {
        return this.config?.messageApiUrl;
    }

    get profileApiUrl(): string {
        return this.config?.profileApiUrl;
    }
}
