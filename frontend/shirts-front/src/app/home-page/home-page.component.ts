import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { Shirt } from '../models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements AfterViewInit, OnInit{

  shirts! : Shirt [];
  constructor(private api: ServiceService, private router: Router){}
  ngAfterViewInit(): void {
    this.fetchShirts();
  }
  

  ngOnInit(): void {
    this.fetchShirts();
  }

  getColorClass(color: string): string {
    return `card-${color}`;
  }
  delete(shirtId: number){
    this.api.deleteShirt(shirtId).subscribe((value) => {
      this.shirts = this.shirts.filter(shirt => shirt.id !== shirtId);
    });
    
    
  }
  edit(shirt: Shirt): void {
    this.router.navigate(['/edit', shirt.id], { state: { shirt } });
  }

  fetchShirts(){
    this.api.getShirts().subscribe((values) => {
      this.shirts = values
      
    })


  }


}
