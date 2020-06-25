import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Lancamento } from 'src/app/model/lancamento';

import { LancamentoService } from '../lancamento.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-lancamento-cadastrar',
  templateUrl: './lancamento-cadastrar.component.html',
  styleUrls: ['./lancamento-cadastrar.component.css']
})
export class LancamentoCadastrarComponent implements OnInit {

  tipos = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'}
  ];

  categorias = [];
  pessoas = [];
 // lancamento = new Lancamento();
  formulario: FormGroup;

  constructor(
    private lancamentoService: LancamentoService,
    private pessoaService: PessoaService,
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.title.setTitle('Novo lançamento');
    const codigo = this.route.snapshot.params.codigo;

    if (codigo) {
      this.buscar(codigo);
    }

    this.carregarCategorias();
    this.carregarPessoas();
    this.configurarFormulario();
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [],
      tipo: ['RECEITA', Validators.required],
      dataVencimento: [null, Validators.required],
      dataPagamento: [null],
      descricao: [null, [this.validarObrigatoriedade, this.validarTamanhoMinimo(5)]],
      valor: [null, Validators.required],
      pessoa: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: []
      }),
      categoria: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: []
      }),
      observacao: []
    });
  }

  validarObrigatoriedade(input: FormControl) {
    return (input.value ? null : { obrigatoriedade: true});
  }

  validarTamanhoMinimo(valor: number) {
    return (input: FormControl) => {
      return (!input.value || input.value.length >= valor ? null : { tamanhoMinimo: {tamanho: valor } });
    };
  }

  salvar() {
    if ( this.editando()) {
      this.atualizar();
    }
    else {
      this.adicionar();
    }
  }

  adicionar() {
    this.lancamentoService.adcionar(this.formulario.value)
      .then(lancamento => {
        this.router.navigate(['/lancamentos', lancamento.codigo]);
        this.messageService.add({severity: 'success', summary: 'Lançamento salvo com sucesso!'});
      })
      .catch(erro => this.errorHandler.handler(erro));
  }

  carregarCategorias() {
    this.categoriaService.listarTodas()
      .then(categorias => {
        this.categorias = categorias.map(c => {
          return { label: c.nome, value: c.codigo};
        });
      })
      .catch(erro => this.errorHandler.handler(erro));
  }

  carregarPessoas() {
    this.pessoaService.listarTodos()
      .then(pessoas => {
        this.pessoas = pessoas.content.map(p => {
          return {label: p.nome, value: p.codigo};
        });
      })
      .catch(erro => this.errorHandler.handler(erro));
  }

  buscar(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
      .then(lancamento => {
        this.formulario.patchValue(lancamento);
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handler(erro));
  }

  atualizar() {
    this.lancamentoService.atualizar(this.formulario.value)
      .then(lancamento => {
        // this.lancamento = lancamento;
        this.formulario.patchValue(lancamento);
        this.messageService.add({severity: 'success', summary: 'Lançamento alterado com sucesso!'});
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handler(erro));
  }

  editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  novo() {
    this.formulario.reset();
    setTimeout(function() {
      this.lancamento = new Lancamento();
    }.bind(this), 1);
    this.router.navigate(['lancamentos/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamento: ${this.formulario.get('descricao').value}`);
  }
}
