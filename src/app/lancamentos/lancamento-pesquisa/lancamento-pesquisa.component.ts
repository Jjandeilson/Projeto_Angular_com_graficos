import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { LancamentoService, LancamentoFilter } from '../lancamento.service';

import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AuthService } from 'src/app/seguranca/auth.service';



@Component({
  selector: 'app-lancamento-pesquisa',
  templateUrl: './lancamento-pesquisa.component.html',
  styleUrls: ['./lancamento-pesquisa.component.css']
})
export class LancamentoPesquisaComponent implements OnInit {

  totalDeElementos: number;
  filtro = new LancamentoFilter();
  lancamentos = [];
  @ViewChild('tabela') tabela;

  constructor(
    public auth: AuthService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private errorHanlder: ErrorHandlerService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de lançamentos');
  }

  pesquisar(pagina = 0) {
    this.filtro.page = pagina;
    this.lancamentoService.pesquisar(this.filtro)
      .then(lancamentos => {
        this.lancamentos = lancamentos.content,
        this.totalDeElementos = lancamentos.totalElements;
      })
      .catch(erro => this.errorHanlder.handler(erro));
  }

  confirmaExclusao(codigo: number) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => this.excluir(codigo)
    });
  }

  excluir(codigo: number) {
    this.lancamentoService.excluir(codigo)
      .then(() => {
          this.pesquisar();
          this.tabela.first = 0;
          this.messageService.add({severity: 'success', detail: 'Pessoa excluída com sucesso!'});
      })
      .catch(erro => this.errorHanlder.handler(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

}
