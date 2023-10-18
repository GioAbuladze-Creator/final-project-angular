import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule

  ],
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit{
  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
  ) { }
  category: string = '';
  categories: string[] = [];
  searchQuery: string = '';
  searchForm = this.fb.group({
    search: [''],
    category: ['']
  });

  onSearch(){
    this.searchQuery = this.searchForm.value.search as string;
    this.category = this.searchForm.value.category as string;
    if(this.searchQuery.length > 0){
      if(this.category.length > 0){
        this.apiService.searchProducts(this.searchQuery, this.category).subscribe({
          next: data => {
            console.log(data);
          }
        });
      }else{
        this.apiService.searchProducts(this.searchQuery).subscribe({
          next: data => {
            console.log(data);
          }
        });
      }
    }else{
      if(this.category.length > 0){
        this.apiService.fetchProdOfCat(this.category).subscribe({
          next: data => {
            console.log(data);
          }
        })
      }
    }

  }

  ngOnInit():void {
    this.apiService.fetchCategories().subscribe({
      next: data => {
        this.categories = data;
      }
    });
  }

}
