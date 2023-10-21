import { Routes } from '@angular/router';
import { isUserLoggedOutGuard } from './core/guards/isLoggedOut.guard';
import { isUserLoggedInGuard } from './core/guards/isLoggedIn.guard';

export const routes: Routes = [
    { path: '', loadComponent: (() => import('./features/main-products/main-products.component').then(m => m.MainProductsComponent)), pathMatch: 'full' },
    { path: 'product/:id', loadComponent: (() => import('./features/single-product/single-product.component').then(m => m.SingleProductComponent)) },
    { path: 'products', loadComponent: (() => import('./features/main-products/main-products.component').then(m => m.MainProductsComponent)) },
    { path: 'deals', loadComponent: (() => import('./features/main-products/main-products.component').then(m => m.MainProductsComponent)) },
    { path: 'login', loadComponent: (() => import('./features/sign-in/sign-in.component').then(m => m.SignInComponent)), canActivate: [isUserLoggedOutGuard] },
    { path: 'cart', loadComponent: (() => import('./features/cart/cart.component').then(m => m.CartComponent)), canActivate: [isUserLoggedInGuard] },
    { path: '**', loadComponent: (() => import('./features/error/error.component').then(m => m.ErrorComponent)) }
];
