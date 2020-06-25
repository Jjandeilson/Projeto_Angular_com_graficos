import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { MoneyHttp } from './money-http';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  tokensRevokeURl = 'http://localhost:8080/tokens/revoke';

  constructor(
    private http: MoneyHttp,
    private auth: AuthService
  ) { }

  logout(): Promise<void> {
    return this.http.delete(this.tokensRevokeURl, {  withCredentials: true }).toPromise()
      .then(() => {
        this.auth.limparAccessToken();
      })
      .catch(erro => {
        console.log(erro);
      });
  }
}
