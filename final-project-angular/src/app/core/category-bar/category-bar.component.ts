import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-bar.component.html',
  styleUrls: ['./category-bar.component.scss']
})
export class CategoryBarComponent{
  categories:string[] = [];
  constructor(
    private router:Router
  ) { }

  onNavigate(){
    this.router.navigate(['/deals'])
  }

}
