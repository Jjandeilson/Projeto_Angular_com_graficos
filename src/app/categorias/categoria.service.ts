import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { MoneyHttp } from '../seguranca/money-http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriasUrl = 'http://localhost:8080/categorias';

  constructor(private http: MoneyHttp) { }

  listarTodas(): Promise<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(`${this.categoriasUrl}`, { headers }).toPromise()
      .then(categorias => categorias);
  }
}
