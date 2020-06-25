import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { Pessoa } from 'src/app/model/pessoa';

import { PessoaService } from '../pessoa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { MessageService } from 'primeng/api';
import { FormControl } from '@angular/forms';
import { Contato } from 'src/app/model/contato';

@Component({
  selector: 'app-pessoa-cadastrar',
  templateUrl: './pessoa-cadastrar.component.html',
  styleUrls: ['./pessoa-cadastrar.component.css']
})
export class PessoaCadastrarComponent implements OnInit {

  pessoa = new Pessoa();
  estados = [];
  cidades = [];
  estadoSelecionado: number;

  constructor(
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private title: Title,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.title.setTitle('Nova pessoa');
    const codigo = this.route.snapshot.params.codigo;

    if (codigo) {
      this.buscar(codigo);
    }

    this.carregarEstados();
  }

  salvar(form: FormControl) {
    if (this.editando()) {
      this.atualiarPessoa(form);
    } else {
      this.adicionar(form);
    }
  }

  adicionar(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa)
      .then(pessoa => {
        this.router.navigate(['/pessoas', pessoa.codigo]);
        this.messageService.add({severity: 'success', summary: 'Pessoa salva com sucesso!'});
      })
      .catch(erro => this.errorHandler.handler(erro));
  }

  buscar(codigo: number) {
    this.pessoaService.buscarPeloCodigo(codigo)
      .then(pessoa => {
        this.pessoa = pessoa;
        this.estadoSelecionado = (this.pessoa.endereco.cidade) ? this.pessoa.endereco.cidade.estado.codigo : null;
        if (this.estadoSelecionado) {
          this.carregarCidades();
        }
        this.title.setTitle(`Pessoa: ${this.atualizacaoDePessoa()}`);
      })
      .catch(erro => this.errorHandler.handler(erro));
  }

  atualiarPessoa(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
      .then(pessoa => {
        this.pessoa = pessoa;
        this.messageService.add({severity: 'success',
                summary: 'Pessoa atualizada com sucesso!'});
        this.title.setTitle(`Pessoa: ${this.atualizacaoDePessoa()}`);
      })
      .catch(erro => this.errorHandler.handler(erro));
  }

  editando() {
    return Boolean(this.pessoa.codigo);
  }

  novo(form: FormControl) {
    this.router.navigate(['/pessoas/nova']);
    form.reset();
    this.pessoa = new Pessoa();
  }

  atualizacaoDePessoa(): string {
    return this.pessoa.nome;
  }

  carregarEstados() {
    this.pessoaService.listarEstados()
      .then(estados => {
        this.estados = estados.map(estado => {
          return { label: estado.nome, value: estado.codigo };
        });
      })
      .catch(erro => this.errorHandler.handler(erro));
  }
  carregarCidades() {
    this.pessoaService.pesquisarCidades(this.estadoSelecionado)
      .then(cidades => {
        this.cidades = cidades.map(cidade => {
          return { label: cidade.nome, value: cidade.codigo };
        });
      })
      .catch(erro => this.errorHandler.handler(erro));
  }
}
