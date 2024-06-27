import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Shirt } from '../models/models';
import { ServiceService } from '../service/service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-shirt',
  templateUrl: './create-shirt.component.html',
  styleUrl: './create-shirt.component.scss'
})
export class CreateShirtComponent implements OnInit{

  teamForm: FormGroup;

  shirt!: Shirt;
  isEditMode: boolean = false;
  colors: string[] = [
    'Vermelho',
    'Azul',
    'Verde',
    'Amarelo',
    'Preto',
    'Branco',
    'Roxo',
    'Laranja',
    'Rosa',
    'Outro'
    ];

  constructor(private fb: FormBuilder, private api: ServiceService, private router: Router, private route: ActivatedRoute) {
    this.teamForm = this.fb.group({
      team: ['', Validators.required],
      year: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      type: ['', Validators.required],
      size: ['', Validators.required],
      color: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    const state = window.history.state;
    if (state && state.shirt) {
      this.shirt = state.shirt;
      this.isEditMode = true;
      this.fillForm(state.shirt);
      
    }
  }
  fillForm(shirt: Shirt): void {
    this.teamForm.patchValue({
      team: shirt.team,
      year: shirt.year,
      type: shirt.type,
      size: shirt.size,
      color: shirt.color
    });
  }

  onSubmit() {
    if (this.teamForm.valid) {
      if(this.isEditMode){
        this.updateShirt(this.shirt.id!, this.teamForm.value)
      }else{
        this.createShirt();
        
    }
    this.router.navigate(['/home']);
    alert('Camisa cadastrada com sucesso')


      
      // Aqui você pode adicionar a lógica para enviar os dados para o backend
    } else {
      console.log('Formulário inválido');
    }
  }

  updateShirt(shirtId: number, shirt: Shirt){
    this.api.updateShirt(shirtId, shirt ).subscribe();
  }

  createShirt(){
    this.shirt = {
  
      team : this.teamForm.value.team,
      year : this.teamForm.value.year,
      type : this.teamForm.value.type,
      size : this.teamForm.value.size,
      color : this.teamForm.value.color,

    }
    this.api.createShirt(this.shirt).subscribe(()=>{
      
    }
  );

  }
  
}
