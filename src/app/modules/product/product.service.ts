import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from 'src/app/shared/model/page';
import { Product } from './model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(page : number, size : number): Observable<Page<Product>> {
    return this.http.get<Page<Product>>(`/api/products?page=${page}&size=${size}`);
  }
}
