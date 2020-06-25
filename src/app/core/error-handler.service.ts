import { Injectable } from '@angular/core';

import { MessageService } from 'primeng/api';
import { NotAuthenticationError } from '../seguranca/money-http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private messageService: MessageService,
    private router: Router
  ) { }

  handler(errorResposonse: any) {
   let msg: string;

   if (typeof errorResposonse === 'string') {
     msg = errorResposonse;
   } else if (errorResposonse instanceof NotAuthenticationError) {
    msg = 'Sua sessão expirou!';
    this.router.navigate(['/login']);
   } else if (errorResposonse.status <= 400 || errorResposonse >= 499) {
     msg = errorResposonse.error.mensagemUsu;

     if (errorResposonse.status === 401) {
       msg = 'Você não tem permissão para executar esta ação';
     }
   }
   else {
     msg = 'Erro ao processar serviço remoto, Tente novamente.';
     console.log('Ocorreu um erro', errorResposonse);
   }

   this.messageService.add({severity: 'error', summary: msg});
  }
}
