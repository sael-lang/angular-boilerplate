import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiClientService } from './api-client.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private apiClient: ApiClientService) {}

  fetchSummary(): Observable<{ message: string }> {
    // Placeholder for future API integration
    return of({ message: 'Summary data will appear here.' });
  }
}
