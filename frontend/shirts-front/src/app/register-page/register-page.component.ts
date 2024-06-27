import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Login } from '../models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent implements OnInit{
  constructor(private api: ServiceService, private router: Router){}
  
  user: Login = {
    username: '',
    password: ''
  };

  hasError: boolean = false;
  errorMsg?: string;

  registerForm : FormGroup = new FormGroup({
    user: new FormControl(['']),
    password: new FormControl(['']),
    confirmPassword: new FormControl([''])
  })

  ngOnInit(): void {
  }

  onSubmit(){
    this.errorMsg = undefined;
    this.hasError = false
    if(this.registerForm.value.confirmPassword! === this.registerForm.value.password){
      this.user = {
        username : this.registerForm.value.user!,
        password : this.registerForm.value.password!
      }
  
      this.api.register(this.user).subscribe(
        (response) => {
          console.log('Register successful:', response);
          this.router.navigate(['/login']);
          alert('Usuário cadastrado com sucesso');       
        },
        (error) => {
          console.log(error.error.detail);
          this.errorMsg = 'Usuário já cadastrado';
          
        }
      );


    }else{
      this.hasError = true
    }

  }

}
