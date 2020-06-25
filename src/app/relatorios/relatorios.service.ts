import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { MoneyHttp } from '../seguranca/money-http';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(
    private http: MoneyHttp
  ) { }

  relatorioLancamentosPorPessoa(inicio: Date, fim: Date): Promise<any> {
    let params = new HttpParams();

    params = params.append('inicio', moment(inicio).format('YYYY-MM-DD'));
    params = params.append('fim', moment(fim).format('YYYY-MM-DD'));

    return this.http.get(`${this.lancamentosUrl}/relatorios/por-pessoa`, { params , responseType: 'blob'}).toPromise()
      .then(response => response);
  }
}
