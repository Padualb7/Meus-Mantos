import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Login } from '../models/models';
import { ServiceService } from '../service/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  isAuthenticated: boolean = false;
  loginError: boolean = false;
  
  constructor(private api: ServiceService, private router: Router){

    this.isAuthenticated = this.api.getToken() !== null;
  }

  loginForm : FormGroup = new FormGroup({
    username: new FormControl(['']),
    password: new FormControl([''])
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;
      console.log('Sending credentials:', { username, password }); // Adicione um log para verificar as credenciais
      this.api.login(username, password).subscribe(
        (response) => {
          console.log('Login successful:', response);
          this.isAuthenticated = true; 
          this.router.navigate(['/home']);
          // Define como autenticado
          // Aqui você pode redirecionar para a página principal, por exemplo
        },
        (error) => {
          console.error('Login error:', error);
          if (error.error && error.error.message) {
            alert(error.error.message); // Exibe mensagem de erro do backend
          } else {
            this.loginError = true
          }
        }
      );
    } else {
      console.log('Formulário inválido');
    }
  }

  logout() {
    this.api.logout(); // Chama o método de logout do serviço ApiService
    this.isAuthenticated = false; // Define como não autenticado
    
  }
  
}
