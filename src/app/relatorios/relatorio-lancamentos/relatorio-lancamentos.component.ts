import { Component, OnInit } from '@angular/core';
import { RelatoriosService } from '../relatorios.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-relatorio-lancamentos',
  templateUrl: './relatorio-lancamentos.component.html',
  styleUrls: ['./relatorio-lancamentos.component.css']
})
export class RelatorioLancamentosComponent implements OnInit {

  periodoInicio: Date;
  periodoFim: Date;

  constructor(
    private relatorioService: RelatoriosService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
  }

  gerar() {
    this.relatorioService.relatorioLancamentosPorPessoa(this.periodoInicio, this.periodoFim)
      .then(relatorio => {
        console.log('gerar');
        const url = window.URL.createObjectURL(relatorio);
        window.open(url);
      })
      .catch(erro => this.errorHandler.handler(erro));
  }

}
