import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Login, Shirt } from '../models/models';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  // API 
  private baseUrl: string = 'http://localhost:8000';
  private tokenKey = 'auth_token'


  register(user: Login): Observable<Login>{
    return this.http.post<Login>(`${this.baseUrl}/users`, user);
  }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.post<any>(`${this.baseUrl}/token`, body.toString(), { headers }).pipe(
      tap(response => {
        if (response.access_token) {
          // Armazena o access_token no localStorage
          localStorage.setItem(this.tokenKey, response.access_token);
        }
      })
    );
  }

  createShirt(shirt: Shirt): Observable<Shirt>{
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<Shirt>(`${this.baseUrl}/products`, shirt, {headers});
  }

  logout() {
    // Remove o token do localStorage ao fazer logout
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    // Obtém o token do localStorage
    return localStorage.getItem(this.tokenKey);
  }
  

// Função para obter o ID do usuário a partir do token
getUserIdFromToken(): string | null {
  const token = localStorage.getItem('auth_token');
  if (token) {
    const decodedToken: any = jwtDecode(token);
    return decodedToken.sub;  // Retorna o ID do usuário do token
  }
  return null;
}

getShirts(): Observable<Shirt[]>{
  const token = this.getToken();
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });
  return this.http.get<Shirt[]>(`${this.baseUrl}/products/user`,{headers});
}

deleteShirt(shirtId: number): Observable<Shirt>{
  const token = this.getToken();
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });
  return this.http.delete<Shirt>(`${this.baseUrl}/products/${shirtId}`,{headers});
}

updateShirt(shirtId: number , shirt: Shirt): Observable<Shirt> {
  const token = this.getToken();
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });
  return this.http.put<Shirt>(`${this.baseUrl}/products/${shirtId}`, shirt, {headers});
}



}
