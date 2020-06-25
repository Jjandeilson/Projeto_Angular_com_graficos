import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token';
  jwtPayload: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {
    this.carregarToken();
  }

  login(usuario: string, senha: string): Promise<void> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(`${this.oauthTokenUrl}`, body, { headers, withCredentials: true }).toPromise()
      .then(response => {
        this.armazenarToken(response);
      })
      .catch(response => {
       const msg = this.errorDeValidacao(response);
       if (msg === 'invalid_grant') {
         return Promise.reject('Usuário ou Senha inválida');
       }
       return Promise.reject(response);
      });
  }

  private armazenarToken(token: any) {
    this.jwtPayload = this.jwtHelper.decodeToken(token.access_token);
    localStorage.setItem('token', token.access_token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }

  obterNovoAccessToken(): Promise<void> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const body = 'grant_type=refresh_token';

    return this.http.post<void>(`${this.oauthTokenUrl}`, body, { headers, withCredentials: true }).toPromise()
      .then(response => {
        this.armazenarToken(response);
        console.log('novo access tokoen criado');
        return Promise.resolve(null);
      })
      .catch(response => {
        console.error('Erro ao renovar token', response);
        return Promise.resolve(null);
      });
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');

    return !token || this.jwtHelper.isTokenExpired(token);
  }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  temQualquerPermissao(roles) {
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }
    return false;
  }

  limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  errorDeValidacao(error: any) {
    const msg = error.error.error;
    return msg;
  }
}
