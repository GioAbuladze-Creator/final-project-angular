import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product';
import { catchError, map } from 'rxjs';
import { Response } from '../interfaces/response';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get url() {
    return 'https://dummyjson.com/products';
  }
  fetchProducts(limit=24) {
    return this.http.get<Response>(`${this.url}?limit=${limit}`).pipe(
      map(data => data.products)
    );
  }
  fetchProduct(id: string) {
    return this.http.get<Product>(`${this.url}/${id}`).pipe(
      catchError(err => {
        console.error(err);
        throw new Error(err);
      })
    );
  }
  fetchCategories() {
    return this.http.get<string[]>(`${this.url}/categories`).pipe(
      catchError(err => {
        console.error(err);
        throw new Error(err);
      })
    );
  }
  fetchProdOfCat(category: string) {
    return this.http.get<Response>(`${this.url}/category/${category}`).pipe(
      map(data => data.products),
      catchError(err => {
        console.error(err);
        throw new Error(err);
      })
    );
  }
  searchProducts(query: string, category?: string) {
    if (category) {
      return this.http.get<Response>
        (`${this.url}/search?q=${query}&limit=0`).pipe(
          map(data => data.products.filter(product => product.category === category)),
          catchError(err => {
            console.error(err);
            throw new Error(err);
          })
        )
    } else {
      return this.http.get<Response>
        (`${this.url}/search?q=${query}&limit=0`).pipe(
          map(data => data.products),
          catchError(err => {
            console.error(err);
            throw new Error(err);
          })
        )
    }
  }
}
