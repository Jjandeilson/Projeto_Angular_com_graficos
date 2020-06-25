import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { PessoaFilter, PessoaService } from '../pessoa.service';

import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-pessoa-pesquisa',
  templateUrl: './pessoa-pesquisa.component.html',
  styleUrls: ['./pessoa-pesquisa.component.css']
})
export class PessoaPesquisaComponent implements OnInit {

  totalDeElementos: number;
  filtro = new PessoaFilter();
  @ViewChild('tabela') tabela;
  pessoas = [];

  constructor(
    private pessoaService: PessoaService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de pessoas');
  }

  pesquisar(pagina = 0) {
    this.filtro.page = pagina;
    this.pessoaService.pesquisar(this.filtro)
      .then(pessoas => {
        this.pessoas = pessoas.content;
        this.totalDeElementos = pessoas.totalElements;
      });
  }

  confirmaExclussao(codigo: number) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => this.excluir(codigo)
    });
  }

  excluir(codigo: number) {
    this.pessoaService.excluir(codigo)
      .then(() => {
        this.pesquisar();
        this.tabela.first = 0;
        this.messageService.add({severity: 'success', summary: 'Pessoa excluída com sucesso!'});
      })
      .catch(erro => this.errorHandler.handler(erro));
  }

  alterarAtivo(codigo: number, ativo: boolean) {
    const prop = !ativo;
    this.pessoaService.alterarPropriedadeAtivo(codigo, prop)
      .then(() => {
        this.pesquisar();
        this.messageService.add({severity: 'success',
              summary: `Pessoa ${prop === true ? 'ativada' : 'desativada'} com sucesso!`});
      })
      .catch(erro => this.errorHandler.handler(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }
}
