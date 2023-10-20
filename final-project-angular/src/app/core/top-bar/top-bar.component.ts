import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';


import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SignOutComponent } from '../sign-out/sign-out.component';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule

  ],
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog,
  ) { }
  category: string = '';
  categories$ = this.apiService.fetchCategories();
  searchQuery: string = '';
  searchForm = this.fb.group({
    search: [''],
    category: ['']
  });

  onSearch() {
    this.searchQuery = this.searchForm.value.search as string;
    this.category = this.searchForm.value.category as string;
    if (this.searchQuery.length > 0) {
      if (this.category.length > 0) {
        this.router.navigate(['/products'], { queryParams: { category: this.category, search: this.searchQuery } });
      } else {
        this.router.navigate(['/products'], { queryParams: { search: this.searchQuery } });
      }
    } else {
      if (this.category.length > 0) {
        this.router.navigate(['/products'], { queryParams: { category: this.category } });
      }
    }

  }
  onLogin() {
    if (!this.authService.isAuthorized) {
      this.router.navigate(['/login']);
    } else {
      this.openDialog('0.2s', '0.2s');
    }
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(SignOutComponent, {
      width: '200px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  ngOnInit(): void {

  }

}
