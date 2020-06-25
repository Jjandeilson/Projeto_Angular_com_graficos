import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NavbarComponent } from './navbar/navbar.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';

import { AuthService } from '../seguranca/auth.service';

import { JwtModule } from '@auth0/angular-jwt';
import { AcessoNegadoComponent } from './acesso-negado.component';
import { MoneyHttp } from '../seguranca/money-http';
import { RelatoriosService } from '../relatorios/relatorios.service';

import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    AcessoNegadoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
        whitelistedDomains: ['localhost:8080'],
        blacklistedRoutes: ['http://localhost:8080/oauth/token']
      }
    })
  ],
  exports: [
    NavbarComponent
  ],
  providers: [
    AuthService,
    MoneyHttp,
    MessageService,
    RelatoriosService
  ]
})
export class CoreModule { }
