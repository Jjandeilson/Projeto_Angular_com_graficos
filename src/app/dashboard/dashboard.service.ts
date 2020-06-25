import { Injectable } from '@angular/core';

import { MoneyHttp } from '../seguranca/money-http';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(
    private http: MoneyHttp
  ) { }

  lancamentosPorCategoria(): Promise<Array<any>> {
    return this.http.get<Array<any>>(`${this.lancamentosUrl}/estatistica/por-categoria`).toPromise()
      .then(response => response);
  }

  lancamentosPorDia(): Promise<Array<any>> {
    return this.http.get<Array<any>>(`${this.lancamentosUrl}/estatistica/por-dia`).toPromise()
      .then(response => {
        const dados = response;
        this.converteStringsParaDatas(dados);
        return dados;
      });
  }

  private converteStringsParaDatas(dados: Array<any>) {
    for (const dado of dados) {
      dado.dia = moment(dado.dia, 'YYYY-MM-MM').toDate();
    }
  }
}
