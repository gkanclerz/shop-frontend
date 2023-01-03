import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordLostService {

  constructor(private http: HttpClient) { }

  submit(username: string): Observable<void>{
    return this.http.post<void>("/api/passwordReminder",username);
  }
}
