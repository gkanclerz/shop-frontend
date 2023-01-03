import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PasswordChangeDto } from './model/passwordChangeDto';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {

  constructor(private http: HttpClient) { }

  changePassword(passwordChangeDto: PasswordChangeDto) : Observable<void>{
    return this.http.put<void>("/api/passwordReminder", passwordChangeDto)
  }
}
