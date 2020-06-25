import { NgModule } from '@angular/core';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { Routes, RouterModule } from '@angular/router';
import { AcessoNegadoComponent } from './core/acesso-negado.component';

const routes: Routes = [
  { path: 'lancamentos', loadChildren: () => import('./lancamentos/lancamentos.module').then(l => l.LancamentosModule)},
  { path: 'pessoas', loadChildren: () => import('./pessoas/pessoas.module').then(p => p.PessoasModule)},
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(d => d.DashboardModule) },
  { path: 'relatorios', loadChildren: () => import('./relatorios/relatorios.module').then(r => r.RelatoriosModule) },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: 'acesso-negado', component: AcessoNegadoComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
