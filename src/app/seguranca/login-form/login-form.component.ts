import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  login: string;
  senha: string;

  constructor(
    public authService: AuthService,
    private erroHandler: ErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logar(){
    this.authService.login(this.login, this.senha)
    .then(() => {
      this.router.navigate(['/dashboard']);
    })
    .catch(erro => {
      this.senha = '';
      this.erroHandler.handler(erro);
    });

  }

}
