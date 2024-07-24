import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, shareReplay, switchMap, throwError } from 'rxjs';
import { ProductsDTO,Product } from '../models/products.models';
import { ValidatationServiceI } from 'src/app/utils/validators';

const URL = 'http://localhost:3002/bp';

@Injectable({
  providedIn: 'root'
})
export class ProductsService implements ValidatationServiceI {
  elementXpage=5;
  pagesNum$?:Observable<number>;

  productListSubject = new BehaviorSubject('');

  productList: Observable<Product[]> = this.productListSubject.pipe(
    switchMap(() => this.loadProducts()), shareReplay(1)
  );

  constructor(private http: HttpClient) { }

  loadProducts(){
    return this.http.get<ProductsDTO>(`${URL}/products`).pipe(
      map(response => response.data));
  }

  refresh(){
    this.productListSubject.next('');
  }

  getProducts(elementsXpage:number=5){
    return this.productList?.pipe(map(prodtList => prodtList.slice(0,elementsXpage) ));
  }

  searchProduct(term:string,elementsXpage:number=5){
    this.elementXpage =elementsXpage;
    term = term.toLocaleLowerCase();
    return this.productList?.pipe(map(products=> 
          products.filter(product =>product.description.toLocaleLowerCase().includes(term) || product.name.toLocaleLowerCase().includes(term) )
          .slice(0,this.elementXpage)
        ));
  }

  searchProductById(term:string){
    return this.productList?.pipe(
      map(products=> products.find(product =>product.id === term ) || <Product>{}
    ));

  }
  
  checkId(value:string):Observable<boolean>{
    return this.http.get<boolean>(`${URL}/products/verification/${value}`)
  }

  saveProduct(product:Product){
  
    return this.http.post(`${URL}/products`,product).pipe(
        catchError(error => {
          console.error('Error saving product:', error);
          return throwError(() => new Error('Error saving product.'));
    }))
  }

  updateProduct(product:Product){    
    const productToSend:Partial<Product> = {...product};
    delete productToSend.id;
    return this.http.put(`${URL}/products/${product.id}`,productToSend);
  }

  deleteProduct(id:string){
    return this.http.delete(`${URL}/products/${id}`);
  }


}
