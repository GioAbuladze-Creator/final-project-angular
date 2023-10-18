import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', loadComponent:(() => import('./features/main-products/main-products.component').then(m => m.MainProductsComponent)),pathMatch: 'full'},
    {path:'product/:id',loadComponent:(() => import('./features/single-product/single-product.component').then(m => m.SingleProductComponent))},
    {path: 'main', redirectTo: ''},
    {path:'**', loadComponent:(() => import('./features/error/error.component').then(m => m.ErrorComponent))}
];
