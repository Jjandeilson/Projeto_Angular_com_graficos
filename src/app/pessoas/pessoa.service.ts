import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';

import { Pessoa } from '../model/pessoa';
import { MoneyHttp } from '../seguranca/money-http';
import { Estado } from '../model/estado';
import { Cidade } from '../model/cidade';

export class PessoaFilter {
  nome: string;
  page: number;
  size = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoaUrl = 'http://localhost:8080/pessoas';
  cidadesUrl = 'http://localhost:8080/cidades';
  estadosUrl = 'http://localhost:8080/estados';

  constructor(private http: MoneyHttp) { }

  pesquisar(filtro: PessoaFilter): Promise<any> {
    let params = new HttpParams();
    params = params.set('page', filtro.page.toString());
    params = params.set('size', filtro.size.toString());

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoaUrl}`,  { params }).toPromise()
      .then(pessoas => pessoas);

  }

  listarTodos(): Promise<any> {
    return this.http.get(`${this.pessoaUrl}`).toPromise()
      .then(pessoas => pessoas);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.pessoaUrl}/${codigo}`).toPromise()
      .then(() => null);
  }

  alterarPropriedadeAtivo(codigo: number, ativo: boolean): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');
    return this.http.put(`${this.pessoaUrl}/${codigo}/ativo`, ativo, { headers }).toPromise()
      .then(() => null);
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.post<Pessoa>(`${this.pessoaUrl}`, pessoa).toPromise()
      .then(pessoaAd => pessoaAd);
  }

  buscarPeloCodigo(codigo: number): Promise<Pessoa> {
    return this.http.get<Pessoa>(`${this.pessoaUrl}/${codigo}`).toPromise()
      .then(pessoa => pessoa);
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.put<Pessoa>(`${this.pessoaUrl}/${pessoa.codigo}`, pessoa).toPromise()
      .then(pessoaAd => pessoaAd);
  }

  listarEstados(): Promise<Estado[]> {
    return this.http.get<Estado[]>(this.estadosUrl).toPromise()
      .then(response => response);
  }

  pesquisarCidades(estado: number): Promise<Cidade[]> {
    let params = new HttpParams();
    params = params.set('estado', estado.toString());

    return this.http.get<Cidade[]>(`${this.cidadesUrl}`, { params }).toPromise()
      .then(response => response);
  }
}
