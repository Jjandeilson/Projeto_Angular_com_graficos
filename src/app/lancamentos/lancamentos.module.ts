import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LancamentosRoutingModule } from './lancamentos-routing.module';
import { SharedModule } from '../shared/shared.module';

import { LancamentoPesquisaComponent } from './lancamento-pesquisa/lancamento-pesquisa.component';
import { LancamentoCadastrarComponent } from './lancamento-cadastrar/lancamento-cadastrar.component';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { CurrencyMaskModule } from 'ng2-currency-mask';

import { AuthGuard } from '../seguranca/auth.guard';

@NgModule({
  declarations: [
    LancamentoCadastrarComponent,
    LancamentoPesquisaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    LancamentosRoutingModule,
    SharedModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    CurrencyMaskModule,
    ToastModule
  ],
  exports: [],
  providers: [
    MessageService,
    AuthGuard
  ]
})
export class LancamentosModule { }
