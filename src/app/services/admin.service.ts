import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  api: string = 'http://localhost:8001/admin';
  constructor(private http: HttpClient) {}

  // post admin login method
  adminLogin(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.api}/login`, data, this.httpOptions());
  }

  // fetch all users
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.api}/users`, this.httpOptions());
  }

  // add new user method
  addUser(data: any): Observable<any> {
    return this.http.post(`${this.api}/users`, data, this.httpOptions());
  }

  // edit user details method
  editUser(data: any, id: string): Observable<any> {
    return this.http.put(
      `${this.api}/updateUser/${id}`,
      data,
      this.httpOptions()
    );
  }

  // delete user
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.api}/deleteUser/${id}`, this.httpOptions());
  }

  // setup http headers
  httpOptions() {
    const token: string = localStorage.getItem('adminToken') ?? '';
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      }),
    };
  }
}
