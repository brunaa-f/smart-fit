import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GymMember } from '../model/GymMember';

@Injectable({
  providedIn: 'root',
})
export class GymmemberService {
  private apiUrl = `${environment.ApiUri}`;

  constructor(private http: HttpClient) {}

  GetMembers(): Observable<GymMember[]> {
    return this.http.get<GymMember[]>(this.apiUrl);
  }
}
