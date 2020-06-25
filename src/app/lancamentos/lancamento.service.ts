import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import * as moment from 'moment';
import { Lancamento } from '../model/lancamento';
import { MoneyHttp } from '../seguranca/money-http';

export class LancamentoFilter {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  page = 0;
  size = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: MoneyHttp) { }

  pesquisar(filtro: LancamentoFilter): Promise<any> {
    let params = new HttpParams();

    params = params.set('page', filtro.page.toString());
    params = params.set('size', filtro.size.toString());

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoDe', moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoFim) {
      params = params.set('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }

    return this.http.get(`${this.lancamentosUrl}?resumo`, { params }).toPromise()
      .then(lancamentos => lancamentos);

  }

  excluir(codigo: number): Promise<any> {
    return this.http.delete(`${this.lancamentosUrl}/${codigo}`).toPromise()
      .then(() => null);
  }

  adcionar(lancamento: Lancamento): Promise<Lancamento> {
    return this.http.post<Lancamento>(`${this.lancamentosUrl}`, lancamento).toPromise()
      .then(lancamentoAd => lancamentoAd);
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    return this.http.put<Lancamento>(`${this.lancamentosUrl}/${lancamento.codigo}`, lancamento)
      .toPromise()
      .then(lan => {
        this.converteStrgingsParaDatas(lan);
        return lan;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Lancamento> {
    return this.http.get<Lancamento>(`${this.lancamentosUrl}/${codigo}`).toPromise()
      .then(lancamento => {
        this.converteStrgingsParaDatas(lancamento);
        return lancamento;
      });
  }

  private converteStrgingsParaDatas(lancamento: Lancamento) {
    if (lancamento.dataVencimento != null) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento).toDate();
    }

    if (lancamento.dataPagamento != null) {
      lancamento.dataPagamento = moment(lancamento.dataPagamento).toDate();
    }
  }
}
