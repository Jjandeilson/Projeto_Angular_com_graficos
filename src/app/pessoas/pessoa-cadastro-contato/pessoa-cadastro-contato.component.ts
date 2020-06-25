import { Component, OnInit, Input } from '@angular/core';
import { Contato } from 'src/app/model/contato';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pessoa-cadastro-contato',
  templateUrl: './pessoa-cadastro-contato.component.html',
  styleUrls: ['./pessoa-cadastro-contato.component.css']
})
export class PessoaCadastroContatoComponent implements OnInit {

  @Input() contatos = [];
  contato = new Contato();
  exibindoFormularioContato = false;
  contatoIndex: number;

  constructor() { }

  ngOnInit(): void {
  }

  prepararNvoContato() {
    this.exibindoFormularioContato = true;
    this.contatoIndex = this.contatos.length;
  }

  prepararEdicaoContato(contato: Contato, index: number) {
    this.contato = this.clonarContato(contato);
    this.exibindoFormularioContato = true;
    this.contatoIndex = index;
  }

  removerContato(index: number) {
    this.contatos.splice(index, 1);
  }

  confirmaContato(form: FormControl) {
    this.contatos[this.contatoIndex] = this.contato;
    this.exibindoFormularioContato = false;
    this.contato = new Contato();
    form.reset();
  }

  clonarContato(contato: Contato): Contato {
    return new Contato(contato.codigo, contato.nome, contato.email, contato.telefone);
  }

  get editando() {
    return this.contato && this.contato.codigo != null;
  }
}
